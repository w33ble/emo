var data = require('emoticon-data');
var _ = require('lodash');

function selectEmoticon (tag) {
  var tags = _.pluck(data.tags, 'title');

  // no tag, choose one
  if (!tag) {
    var rand = _.random(0, tags.length - 1);
    tag = tags[rand];
  }

  // invalid tag, throw error
  if (tags.indexOf(tag) === -1) {
    throw new Error('Invalid tag specified: ' + tag);
  }

  var matches = _.where(data.emoticons, {tags: [tag]});
  return _.sample(matches);
}

function getTags() {
  return _.pluck(_.sortBy(data.tags, 'title'), 'title');
}

module.exports = {
  select: selectEmoticon,
  getTags: getTags
};