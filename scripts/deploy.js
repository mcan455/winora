const hre = require("hardhat");

async function main() {
  const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // Base Mainnet USDC
  const FEE_RECIPIENT = "0x237Fcad09aC0E8B0D72580a91D0b05cdb147c9CE";

  console.log("🚀 Deploy başlıyor...");

  const WinoraRaffle = await hre.ethers.getContractFactory("WinoraRaffle");
  const raffle = await WinoraRaffle.deploy(USDC, FEE_RECIPIENT);

  await raffle.waitForDeployment();

  console.log("✅ WinoraRaffle deployed to:", await raffle.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

