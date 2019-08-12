#!/usr/bin/env node

const yargs = require('yargs');
const newPackage = require('../lib/main/main').default();

newPackage(yargs.array('deps').argv);
