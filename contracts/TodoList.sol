// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.17;

contract TodoList {
    // Task count is getting written into storage, representing the state of the blockchain
    // This is a state variable, state variables in solidity are written to the blockchain
    // they are called state variables because they represent the state of the blockchain
    // the state of the blockchain is going to change anytime taskCount changes, they're kind of 
    // like class variables in OOP.
    // public lets you read task count?
    uint public taskCount = 0; 
    // data types
    struct Task {
        uint id; // ID of the task. unsigned int means it can't be negative
        string content;
        bool completed; // checkbox state of the to-do list
    }

    // Need a place to put the tasks from above, and we need to put them in storage on the blockchain
    // a new state variable is needed.
    // This acts as a database for Tasks
    // we want to use this to list return all the Tasks in the mapping
    // mapping is a dynamic size, you can't iterate over it or return it
    // you need to reference the items 1 by 1, that's why the task count is used to see the size of mapping
    // tasks is also a function? 
    mapping(uint => Task) public tasks; // gives a reader function from solidity to read what is inside 'tasks'

    // To add tasks to the list when the smart contract is deployed, you need to use the constructor function
    // Function called when smart contract is run for the first time (in this case it is upon deployment)
    // Currently there is a default task on deployment
    constructor() {
        createTask("Say hello to the world!");
    }

    // Function to put a task inside the tasks map
    // argument is the content of a Task 
    function createTask(string memory _content) public {
        taskCount++; // increase task count everytime a task is added to the mapping
        tasks[taskCount] = Task(taskCount, _content, false);
    }
}

// in order to connect to the blockchain, truffle.config file needs to be updated 
// solidity is a statically typed language