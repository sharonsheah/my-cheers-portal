const main = async () => {
	const [owner, randoPerson] = await hre.ethers.getSigners();
	const cheersContractFactory = await hre.ethers.getContractFactory(
		"CheersPortal"
	);
	const cheersContract = await cheersContractFactory.deploy({
		value: hre.ethers.utils.parseEther("0.1"),
	});
	await cheersContract.deployed();

	console.log("Contract deployed to:", cheersContract.address);

	let contractBalance = await hre.ethers.provider.getBalance(
		cheersContract.address
	);
	console.log(
		"Contract balance:",
		hre.ethers.utils.formatEther(contractBalance)
	);

	let cheersCount;
	cheersCount = await cheersContract.getTotalCheers();

	cheersTxn = await cheersContract.cheers("Cheers #1");
	await cheersTxn.wait();

	cheersTxn = await cheersContract.cheers("Cheers #2");
	await cheersTxn.wait();

	contractBalance = await hre.ethers.provider.getBalance(
		cheersContract.address
	);
	console.log(
		"Contract balance:",
		hre.ethers.utils.formatEther(contractBalance)
	);

	let allCheers = await cheersContract.getAllCheers();
	console.log(allCheers);

	cheersCount = await cheersContract.getTotalCheers();
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
