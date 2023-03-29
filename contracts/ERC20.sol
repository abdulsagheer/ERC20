// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ICO is ERC20, Ownable {
    constructor() ERC20("IneuronCoin", "INC") {
        _mint(msg.sender, 1000000);
    }

    function mint(
        address account,
        uint256 amount
    ) public onlyOwner returns (bool) {
        require(
            account != address(this) && amount != uint256(0),
            "ERC20: function mint invalid input"
        );
        _mint(account, amount);
        return true;
    }

    function burn(
        address account,
        uint256 amount
    ) public onlyOwner returns (bool) {
        require(
            account != address(this) && amount != uint256(0),
            "ERC20: function burn invalid input"
        );
        _burn(account, amount);
        return (true);
    }

    function withdraw(uint256 amount) public onlyOwner returns (bool) {
        require(
            amount <= address(this).balance,
            "ICO: function withdraw has invalid input"
        );
        payable(_msgSender()).transfer(amount);
        return (true);
    }
}
