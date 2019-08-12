#!/usr/bin/env node

const yargs = require('yargs');
const newMonorepo = require('../lib/main/main').default();

newMonorepo(yargs.argv);
