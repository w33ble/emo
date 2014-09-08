#!/usr/bin/env node

var selector = require('../lib/selector');
var tag = process.argv[2];

// parse input params
var emoticon = selector(tag);

// output selection
console.log(emoticon.string);