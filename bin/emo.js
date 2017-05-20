#!/usr/bin/env node

const parser = require('yargs-parser');
const { writeSync } = require('clipboardy');
const pkg = require('../package.json');
const emotes = require('../lib/emotes');

const argvOpts = {
  alias: {
    tags: ['t'],
    count: ['c'],
    clip: ['p'],
    version: ['v'],
  },
  number: ['count'],
  boolean: ['clip', 'help', 'verbose', 'version'],
};

const argv = parser(process.argv.slice(2), argvOpts);

function showHelp() {
  console.log(`
Usage: ${pkg.name} [options] [tag]

Options:
  -t, --tags        List available tags
  -c, --count <n>   Specify number to return
  -p, --clip        Copy emoticon(s) to the clipboard
  -v, --version     Show version
  --help            Display this help message
  --verbose         Get verbose info about the selected emoticon(s)
  `);
}

// // show tags it tags flag is set, do nothing else
if (argv.tags) console.log(emotes.getFormattedTags());
else if (argv.version) console.log(`v${pkg.version}`);
else {
  const tag = argv._[0];
  const count = argv.count || 1;
  const emoticons = [];

  if (argv.help) showHelp();
  else {
    for (let i = 0; i < count; i += 1) {
      emoticons.push(emotes.select(tag));
    }

    const output = (!argv.verbose)
      ? emoticons.map(e => e.string).join('\n')
      : emoticons.map(JSON.stringify).join('\n');

    if (argv.clip) writeSync(output);

    // output selection
    console.log(output);
  }
}
