const data = require('emoticon-data');
const table = require('text-table');
const random = require('./random');

const tagTitles = data.tags.map(t => t.title);

function getRandomItem(items) {
  const rand = random(items.length - 1);
  return items[rand];
}

function selectEmoticon(tag = getRandomItem(tagTitles)) {
  // invalid tag, throw error
  if (tagTitles.indexOf(tag) === -1) {
    console.error(`Invalid tag specified: '${tag}'`);
    return false;
  }

  // get emotes with matching tag
  const matches = data.emoticons.filter(e => e.tags.indexOf(tag) >= 0);
  return getRandomItem(matches);
}

function getTags() {
  return tagTitles.sort();
}

function getFormattedTags() {
  const tags = getTags();
  const tagList = [];
  const limit = 5; // number of columns to show

  for (let i = 0; i < Math.ceil(tags.length / limit); i += 1) {
    const start = i * limit;
    const end = (i + 1) * limit;

    tagList.push(tags.slice(start, end));
  }

  return table(tagList);
}

module.exports = {
  getTags,
  getFormattedTags,
  select: selectEmoticon,
};
