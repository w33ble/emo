const data = require('emoticon-data');
const random = require('./random');

const tagTitles = data.tags.map(t => t.title);

function getRandomItem(items) {
  const rand = random(items.length - 1);
  return items[rand];
}

function selectEmoticon(tag = getRandomItem(tagTitles)) {
  // invalid tag, throw error
  if (tagTitles.indexOf(tag) === -1) {
    return console.error(`Invalid tag specified: '${tag}'`);
  }

  // get emotes with matching tag
  const matches = data.emoticons.filter(e => e.tags.indexOf(tag) >= 0);
  return getRandomItem(matches);
}

function getTags() {
  return tagTitles.sort();
}

module.exports = {
  getTags,
  select: selectEmoticon,
};
