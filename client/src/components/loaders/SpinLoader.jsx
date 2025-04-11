const SpinLoader = ({ width, height }) => {
  const borderWidth = Number(width.slice(0, -2)) / 12;
  return (
    <div
      style={{ width, height, borderWidth: `${borderWidth}px` }}
      className="rounded-full animate-spin border-gray-300/50 border-t-prim-yellow-200">
    </div>
  );
};

export default SpinLoader;
