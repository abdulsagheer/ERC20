require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

module.exports = {
	solidity: "0.8.18",

	gasReporter: {
		enabled: true,
		currency: "INR",
		noColors: true,
		outputFile: "gasReport.txt",
		coinmarketcap: "<insert your api key from coinmarketcap here>",
		token: "matic",
	},
};
