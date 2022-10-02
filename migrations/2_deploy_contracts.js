// like how database state is changed by changing schema with new columns etc. 
// this does the same thing 
// migration does states
// number before migrations tells truffle in what order to run them 

// Creates an artifact of todolist.json 
// just so it can understand the smart contract 
var TodoList = artifacts.require("./TodoList.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
