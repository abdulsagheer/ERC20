const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Erc20 smart contract testing", function () {
	let token;
	let accounts;
	const amount = ethers.utils.parseEther("1"); // this line will take input in str format
	//and convert to ether/wei format

	before(async () => {
		const contract = await ethers.getContractFactory("ICO");
		token = await contract.deploy();
		accounts = await ethers.getSigners();
		await token.deployed();
	});

	it("Assigns initial balance ", async function () {
		const totalSupply = await token.totalSupply();
		expect(await token.balanceOf(accounts[0].address)).to.equal(totalSupply);
	});

	it("Do not have permision to mint tokens", async function () {
		const wallet = token.connect(accounts[2]);
		await expect(wallet.mint(accounts[2].address, amount)).to.be.reverted;
	});

	it("Do not have permision to burn tokens", async function () {
		const wallet = token.connect(accounts[2]);
		await expect(wallet.burn(accounts[2].address, amount)).to.be.reverted;
	});

	it("buy token with ether", async function () {
		const wallet = token.connect(accounts[2]);
		const option = { value: amount };
		const calculate = option.value.mul(1000); //1000 is declared in smart contract
		//msg.value*1000
		await wallet.buy(option);
		expect(await wallet.balanceOf(accounts[2].address)).to.equal(calculate);
	});
});
