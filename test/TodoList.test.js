const { assert } = require("chai")

const TodoList = artifacts.require('./TodoList.sol') // require todolist contract

// This callback function is where we write all the tests
// exposes all accounts in blockchain from ganache, they will be in the accounts variable
contract('TodoList', (accounts) => {
    // get deployed copy of the smart contract with a before hook
    //before each test runs, pass in a async function which lets you use await keyword
    // before each test runs we have a copy of the todolist that is deployed to the blockchain
    before(async () => {
        this.todoList = await TodoList.deployed()
    })

    it('deploys successfully', async () => {
        const address = await this.todoList.address
        //We want to make sure the address exists and not empty
        assert.notEqual(address, 0x0) // ensure smart contract is put on the blockchain and has an adress
        assert.notEqual(address, '') // don't want it to be an empty string
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    // list out the tasks in the test to make sure that it works
    it('lists tasks', async () => {
        // checking if the count is correct and that we can fetch task by the count
        const taskCount = await this.todoList.taskCount() // the task count
        const task = await this.todoList.tasks(taskCount) // fetch the task out of the mapping, making sure the task exists where the task count is
        // want to assert that the id is equal to the task count
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, 'Say hello to the world!')
        assert.equal(task.completed, false)
        assert.equal(taskCount.toNumber(), 1)
    })
})

