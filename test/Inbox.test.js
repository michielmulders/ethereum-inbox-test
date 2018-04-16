const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Uppercase -> constructor

const provider = ganache.provider();
const web3 = new Web3(provider); // Network you want to use
const { interface, bytecode } = require('../compile');

// Ganache CLI biedt 5 unlocked accounts aan die we kunnen gebruiken!
let accounts;
let inbox; 
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  // Get list of all accounts
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy the contract
  // constructor creating instance of
  // contract constructor needs a message -> so pass arguments
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' }) // account is deploying

  inbox.setProvider(provider);
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    // Check for 'address' value to exist with assert.ok
    assert.ok(inbox.options.address);
  })

  // as calling a function runs instantly we have to add async (free)
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  })

  it('can change the message', async () => {
    await inbox.methods.setMessage('hello')
      .send({ from: accounts[0] })

    const message = await inbox.methods.message().call();
    assert.equal(message, 'hello')
  })
})