

//Get the current users profile
export const getTopThree = photos => {
  const sorted = [...photos];
  sorted.sort(function (a, b) {
    return b.votes.length - a.votes.length;
  });
  const threes = sorted.slice(0, 3);

  const trim = threes.filter(three => three.votes.length > 0);

  return trim;
};
