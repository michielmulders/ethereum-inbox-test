const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Uppercase -> we are importing a constructor function
const web3 = new Web3(ganache.provider()); // Network you want to use

// Mocha functions
// it: assertion on one thing we want to test
// describe: group certain 'it' functions together that are testing the same thing
// beforeEach: Execute general setup code before 'it' function calls


class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

let car;
beforeEach(() => {
  car = new Car();
})

describe('Car Class', () => {
  it('can park', () => {
    assert.equal(car.park(), 'stopped');
  });

  it('can drive', () => {
    assert.equal(car.drive(), 'vroom');
  });
});


