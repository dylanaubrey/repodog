#!/usr/bin/env node

const yargs = require('yargs');
const newRepo = require('../lib/main/main').default;

newRepo(yargs.argv);
