const dreamtime = require('../dreamtime');
const program = require('./program.js');

const manager = dreamtime(program);
manager.buildReadme();
manager.updatePackage();
manager.buildIndex();
manager.buildModules();
