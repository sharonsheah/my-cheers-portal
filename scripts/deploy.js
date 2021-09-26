const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contracts with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());
  
  const cheersContractFactory = await hre.ethers.getContractFactory('CheersPortal');
  const cheersContract = await cheersContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.5'),
  });

  await cheersContract.deployed();

  console.log('CheersPortal address: ', cheersContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch(error) {
    console.log.error(error);
    process.exit(1);
  }
};

runMain();