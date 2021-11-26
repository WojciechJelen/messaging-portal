const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const MessagePortalContract = await hre.ethers.getContractFactory(
    "MessagePortal"
  );
  const portal = await MessagePortalContract.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
    gasLimit: 3000000,
  });
  await portal.deployed();

  console.log("Message portal address: ", portal.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
