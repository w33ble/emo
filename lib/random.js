module.exports = function random(from, to) {
  const min = to ? from : 0;
  const max = to || from;
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};
