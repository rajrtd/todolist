// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.17;

contract TodoList {
    // This is a state variable, state variables in solidity are written to the blockchain
    // they are called state variables because they represent the state of the blockchain
    // the state of the blockchain is going to change anytime taskCount changes, they're kind of 
    // like class variables in OOP.
    // public lets you read task count?
    uint public taskCount = 0; 
}

// in order to connect to the blockchain, truffle.config file needs to be updated 