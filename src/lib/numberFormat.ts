const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
function abbreviateNumber(number: number): string {
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number.toString();
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  return scaled.toFixed(1) + suffix;
  return number.toString();
}

export { abbreviateNumber };
