const SpinLoader = ({ width, height }) => {
  return (
    <div
      style={{ width, height }}
      className="rounded-full animate-spin border-3 border-gray-300 border-t-prim-yellow-200">
    </div>
  );
};

export default SpinLoader;
