const SpinLoader = ({ width, height, color = "#F0AD05" }) => {
  const borderWidth = Number(width.slice(0, -2)) / 12;
  return (
    <div
      style={{ width, height, borderWidth: `${borderWidth}px`, borderTopColor: color }}
      className="rounded-full animate-spin border-gray-300/50">
    </div>
  );
};

export default SpinLoader;
