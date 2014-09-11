#!/usr/bin/env node

var _ = require('lodash');
var pkg = require('../package.json');
var cmd = require('commander');
var table = require('text-table');
var emotes = require('../lib/emotes');
var copy = require('copy-paste').silent().copy;

cmd
.version(pkg.version)
.usage('[options] <tag>')
.option('-t, --tags', 'list available tags')
.option('-c, --count <n>', 'specify number to return', parseInt)
.option('-p, --clip', 'copy emoticon(s) to the clipboard')
.option('-v, --verbose', 'get verbose info about the selected emoticon(s)')
.parse(process.argv);

if (cmd.tags) {
  var tags = emotes.getTags();
  var tagList = [];
  var limit = 5;

  for (var i = 0; i < Math.ceil(tags.length / limit); i++) {
    var start = i * limit;
    var end = (i + 1) * limit;

    tagList.push(tags.slice(start, end));
  }
  console.log(table(tagList));
  return;
}

var tag = cmd.args.join(' ');
var count = cmd.count || 1;
var emoticons = [];

for (var i = 0; i < count; i++) {
  emoticons.push(emotes.select(tag));
}

if (!cmd.verbose) {
  emoticons = _.map(emoticons, 'string');
} else {
  emoticons = _.map(emoticons, JSON.stringify);
}

var output = emoticons.join("\n");

if(cmd.clip) {
  copy(output);
}

// output selection
console.log(output);