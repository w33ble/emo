#!/usr/bin/env node

const cmd = require('commander');
const table = require('text-table');
const { prompt } = require('inquirer');
const { writeSync } = require('clipboardy');
const pkg = require('../package.json');
const emotes = require('../lib/emotes');

cmd
.version(pkg.version)
.usage('[options] [tag]')
.option('-t, --tags', 'list available tags')
.option('-s, --select', 'select emoticon tag from a list')
.option('-c, --count <n>', 'specify number to return', parseInt)
.option('-p, --clip', 'copy emoticon(s) to the clipboard')
.option('-v, --verbose', 'get verbose info about the selected emoticon(s)')
.parse(process.argv);

// show tags it tags flag is set, do nothing else
if (cmd.tags) {
  const tags = emotes.getTags();
  const tagList = [];
  const limit = 5; // number of columns to show

  for (let i = 0; i < Math.ceil(tags.length / limit); i += 1) {
    const start = i * limit;
    const end = (i + 1) * limit;

    tagList.push(tags.slice(start, end));
  }

  console.log(table(tagList));
}

function getTag(cb) {
  // choose tag from list, or parse from args
  if (cmd.select) {
    const tags = emotes.getTags();
    prompt({
      type: 'list',
      name: 'tag',
      choices: tags,
      message: 'Select a tag',
    }, cb);
  } else {
    cb({ tag: cmd.args.join(' ') });
  }
}

getTag((answer) => {
  const tag = answer.tag || undefined;
  const count = cmd.count || 1;
  const emoticons = [];

  for (let i = 0; i < count; i += 1) {
    emoticons.push(emotes.select(tag));
  }

  const output = (!cmd.verbose)
    ? emoticons.map(e => e.string).join('\n')
    : emoticons.map(JSON.stringify).join('\n');

  if (cmd.clip) writeSync(output);

  // output selection
  console.log(output);
});
