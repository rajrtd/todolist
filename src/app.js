// app that talks to the blockchain
// This is an object
App = {
    loading: false,
    contracts: {},
    // Load function
    load: async () => {
        await App.loadWeb3() // Want to load Web3 library in order to connect to the blockchain
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
        } else {
        window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */})
        } catch (error) {
            // User denied account access...
        }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
        console.log(App.account)
    },

    loadContract: async () => {
        const todoList = await $.getJSON('TodoList.json')
        //truffle contract is just a javascript representation of the smart contract
        // that allows us to call the functions on it 
        App.contracts.TodoList = TruffleContract(todoList) // create a wrapper around the json file we created by truffle
        App.contracts.TodoList.setProvider(App.web3Provider) // gives copy of smart contract in js and tells us where it is in the blockchain and use functions with it
        // we want to get a deployed copy of the smart contract like how it was done in the truffle console
        // puts values from the blockchain into the smartcontract 
        App.todoList = await App.contracts.TodoList.deployed()
        //console.log(todoList)
    },
    // Display contract in index.html in 'account' part
    render: async () => {
        // prevent double render
        if (App.loading) {
            return
        }
        //update app loading state
        App.setLoading(true)

        // render Account 
        $('#account').html(App.account)

        //render tasks
        await App.renderTasks()

        // Update loading state
        App.setLoading(false)
    },

    // task rendering
    renderTasks: async () => {
        // load tasks from blockchain
        // render out each task with task template
        // render out each task 1 by 1, then show task on page
        // loop thru mapping to figure out how many tasks there are
        const taskCount = await App.todoList.taskCount()
        // I think this refers to the html in index.html
        const $taskTemplate = $('.taskTemplate') //use this to render out each task on page - this one was fetched from DOM, and we clone it

        for (let index = 1; index <= taskCount; index++) {
            const task = await App.todoList.tasks(index) // fetch tasks, tasks is an array, and we have to reference the values by the items in the array, first value is taskID, task content is 1, task completed is task 2 
            const taskId = task[0].toNumber()
            const taskContent = task[1]
            const taskCompleted = task[2]

            //creating html for task

            const $newTaskTemplate = $taskTemplate.clone()
            // finds content for template and fill in content from task
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input') // checkbox
                            .prop('name', taskId)
                            .prop('checked', taskCompleted)
                            //.on('click', App.toggleCompleted)

            // put the task in correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskComplete) // if task is completed, put it in the completed tasks list
            } else {
                $('#taskList').append($newTaskTemplate)
            }
            // Show the task
            $newTaskTemplate.show()
        }


    },
    // set loading function
    // shows the loader in the index.html file 
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader') // show loading
        const content = $('#content') // hide content
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    }
}

// In order to load the app whenever the window loads   
$(() => {
    $(window). load(() => {
        App.load()
    })
})

// creating a way to talk to the blockchain
// metamask used to connect to our dapp with web3js