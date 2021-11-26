const main = async () => {
  const messageContractFactory = await hre.ethers.getContractFactory(
    "MessagePortal"
  );
  const messageContract = await messageContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });

  await messageContract.deployed();
  console.log("Contract addy:", messageContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    messageContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  const messageTxn = await messageContract.sendMessage("This is message #1");
  await messageTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    messageContract.address
  );

  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allMessages = await messageContract.getAllMessages();
  console.log(allMessages);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
