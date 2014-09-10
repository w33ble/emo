#!/usr/bin/env node

var _ = require('lodash');
var pkg = require('../package.json');
var commander = require('commander');
var emotes = require('../lib/emotes');

commander
.version(pkg.version)
.option('-c, --count <n>', 'specify number to return', parseInt)
.option('-v, --verbose', 'get verbose info about the selected emoticon(s)')
.parse(process.argv);

var tag = commander.args.join(' ');
var count = commander.count || 1;
var emoticons = [];

for (var i = 0; i < count; i++) {
  emoticons.push(emotes.select(tag));
}

if (!commander.verbose) {
  emoticons = _.map(emoticons, 'string');
} else {
  emoticons = _.map(emoticons, JSON.stringify);
}

// output selection
console.log(emoticons.join("\n"));