const SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];

export const abbreviateNumber = number => {
  // what tier? (determines SI symbol)
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return number;

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
};

export function parseYoutubeURL(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

export const secondsToTime = sec => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
};
export const copyToClipBoard = async data => {
  let copiedText = await navigator.clipboard.write(data);
  return copiedText;
};
