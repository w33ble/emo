#!/usr/bin/env node

const cmd = require('commander');
const { writeSync } = require('clipboardy');
const pkg = require('../package.json');
const emotes = require('../lib/emotes');

cmd
.version(pkg.version)
.usage('[options] [tag]')
.option('-t, --tags', 'list available tags')
.option('-c, --count <n>', 'specify number to return', parseInt)
.option('-p, --clip', 'copy emoticon(s) to the clipboard')
.option('-v, --verbose', 'get verbose info about the selected emoticon(s)')
.parse(process.argv);

// show tags it tags flag is set, do nothing else
if (cmd.tags) console.log(emotes.getFormattedTags());
else {
  const tag = cmd.args.join(' ') || undefined;
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
}
