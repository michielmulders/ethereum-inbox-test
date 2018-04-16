// use to unlock an account and specify which node we want to use
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// 1) Account mnemonic
// 2) link/URL for node from network we want to use (see mail)
const provider = new HDWalletProvider(
  'cram hint man jewel thing average monkey renew case forest choose gauge',
  'https://rinkeby.infura.io/wMz9qhowrJcae4lK6fpu'
)

const web3 = new Web3(provider);

// get list of accounts and deploy
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello!'] })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address);
};
deploy();