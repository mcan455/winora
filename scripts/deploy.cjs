const { ethers } = require("hardhat");

async function main() {
  const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  const FEE_WALLET = "0x237Fcad09aC0E8B0D72580a91D0b05cdb147c9CE";

  const Winora = await ethers.getContractFactory("WinoraRaffle");
  const contract = await Winora.deploy(USDC_BASE, FEE_WALLET);
  await contract.waitForDeployment();

  console.log("✅ WinoraRaffle deployed to:", await contract.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

