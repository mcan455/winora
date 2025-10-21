// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address src, address dst, uint256 amount) external returns (bool);
}

contract WinoraRaffle {
    IERC20 public immutable USDC;
    address public owner;
    address public feeRecipient;

    uint256 public constant ENTRY_FEE = 1e6; // 1 USDC
    uint16 public feeBps = 1000; // 10%
    uint16 public constant MAX_FEE_BPS = 2000; // 20%

    struct Raffle {
        uint256 reward;
        uint64 endTime;
        uint16 minParticipants;
        uint16 maxParticipants;
        bool ended;
        address[] participants;
        address winner;
        uint256 collected;
    }

    uint256 public raffleCount;
    mapping(uint256 => Raffle) public raffles;
    mapping(uint256 => mapping(address => bool)) public hasEntered;

    event RaffleCreated(uint256 indexed id, uint256 reward, uint64 endTime);
    event Entered(uint256 indexed id, address indexed user);
    event WinnerSelected(uint256 indexed id, address winner, uint256 reward, uint256 fee);

    constructor(address _usdc, address _feeRecipient) {
        owner = msg.sender;
        USDC = IERC20(_usdc);
        feeRecipient = _feeRecipient;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    function setFeeBps(uint16 newFee) external onlyOwner {
        require(newFee <= MAX_FEE_BPS, "too high");
        feeBps = newFee;
    }

    function setFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "zero");
        feeRecipient = newRecipient;
    }

    function createRaffle(uint256 reward, uint64 duration, uint16 minP, uint16 maxP) external onlyOwner {
        require(reward > 0, "invalid");
        require(maxP >= minP && minP > 0, "min/max");

        // Transfer ödül escrow
        require(USDC.transferFrom(msg.sender, address(this), reward), "escrow fail");

        raffleCount++;
        Raffle storage r = raffles[raffleCount];
        r.reward = reward;
        r.endTime = uint64(block.timestamp + duration);
        r.minParticipants = minP;
        r.maxParticipants = maxP;

        emit RaffleCreated(raffleCount, reward, r.endTime);
    }

    function enter(uint256 raffleId) external {
        Raffle storage r = raffles[raffleId];
        require(block.timestamp < r.endTime, "ended");
        require(!hasEntered[raffleId][msg.sender], "already");
        require(r.participants.length < r.maxParticipants, "full");

        require(USDC.transferFrom(msg.sender, address(this), ENTRY_FEE), "transfer fail");

        hasEntered[raffleId][msg.sender] = true;
        r.participants.push(msg.sender);
        r.collected += ENTRY_FEE;

        emit Entered(raffleId, msg.sender);
    }

    function drawWinner(uint256 raffleId) external {
        Raffle storage r = raffles[raffleId];
        require(block.timestamp > r.endTime, "not yet");
        require(!r.ended, "done");
        require(r.participants.length >= r.minParticipants, "few participants");

        // mock randomness
        uint256 random = uint256(keccak256(abi.encode(block.timestamp, block.prevrandao, raffleId)));
        address winner = r.participants[random % r.participants.length];
        r.winner = winner;
        r.ended = true;

        // platform fee
        uint256 fee = (r.collected * feeBps) / 10_000;
        if (fee > 0) USDC.transfer(feeRecipient, fee);

        // pay winner
        USDC.transfer(winner, r.reward);

        emit WinnerSelected(raffleId, winner, r.reward, fee);
    }

    function getParticipants(uint256 id) external view returns (address[] memory) {
        return raffles[id].participants;
    }
}
