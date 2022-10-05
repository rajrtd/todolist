// like how database state is changed by changing schema with new columns etc. 
// this does the same thing 
// migration does states
// number before migrations tells truffle in what order to run them 

// Creates an artifact of todolist.json 
// just so it can understand the smart contract 
const TodoList = artifacts.require("./TodoList.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};

// interacting with blockchain in an asyncronous manner, you can use promises. 
// with truffle you can use the async await pattern. await is saying wait for the 
// todolist to be deployed, when finished store it in the todoList variable