const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8'); // Read sol source code

// Param '1': Number of different contracts we are attempting to compile.
// The contracts.:inbox property contains the ABI and bytecode
module.exports = solc.compile(source, 1).contracts[':Inbox']; 
