const darkenColor = (color) => {
  switch (color) {
    case "#FFADAD":
      return "#FF8585";
    case "#FFDB99":
      return "#FFBF00";
    case "#C5C2EA":
      return "#8C85D5";
    case "#98ECC7":
      return "#41DC99";
    case "#C2D6EB":
      return "#74A2D2";
    case "#E5C2FF":
      return "#CC85FF";
    case "#D6C2CB":
      return "#BFA6A1";
    case "#DFD6CE":
      return "#AE9884";
    case "#C6C6D2":
      return "#8D8DA5";
    default:
      return "#C89004"
  }
}

export default darkenColor;
