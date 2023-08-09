const express = require('express');
const Stack = require('./Stack');
const Queue = require('./Queue');


const app = express();
const PORT = process.env.PORT || 3001;
let pagerStack;
let pagerQueue;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.status(200).json("hello world")
})


//init our  stack of pager
app.post('/addpagers', async (req, res) => {
    pagerStack = new Stack(req.body)
    pagerQueue = new Queue()
//seeding the tables
    emptyTableStack = new Stack([1,2,3,4,5,6,7,8,9,10])
    seatedTableQueue = new Queue()

    res.status(200).json({ pagerStack, pagerQueue, emptyTableStack, seatedTableQueue })
})


app.post('/customerDoneEating', async (req, res) => {
  //customer left table

  //if there is a customer with a pager then give him the table

//remove seated table from the queue

//add empty table to the stack

//check the pager queue

//then add the customer to a table 

//remove the table from the stack

//add table back to queue
const freeTable = seatedTableQueue.removeFromQueue()
    emptyTableStack.addToStack(freeTable)


    if (pagerQueue.container.length > 0) {
        const pager = pagerQueue.removeFromQueue()
        pagerStack.addToStack(pager)

        const customerTable = emptyTableStack.removeFromStack()
        seatedTableQueue.addToQueue(customerTable)
    }

    
    res.status(200).json({ emptyTableStack , seatedTableQueue })
       

})


app.post('/handToCustomer', async (req, res) => {

  if (emptyTableStack.container.length === 0) {
      const pager = pagerStack.removeFromStack()
      pagerQueue.addToQueue(pager)
      res.status(200).json(pager)
  } else {
    const firstEmptyTable = emptyTableStack.container.removeFromStack()
    seatedTableQueue.addToQueue(firstEmptyTable)
    res.status(200).json(firstEmptyTable)
  }
})

app.get('/status', (req, res) => {

    res.status(200).json({ pagerStack, pagerQueue, emptyTableStack, seatedTableQueue})

})


app.listen(PORT, () => console.log('Now listening http://localhost:3001/'));