const ColorPalette = ({ colors, color, borderColor = "white", setColor }) => {
  return colors.map((c, i) => (
    <button
      key={i}
      onClick={() => setColor(c)}
      className={`w-6 h-6 rounded-full cursor-pointer ${ c === color && "border-2" }`}
      style={{ backgroundColor: c, borderColor: borderColor }}
    />
  ));
};

export default ColorPalette;
