const ProfileLoader = ({ width, radius, color }) => {
  const totalWidth = radius * 2;
  const adjustedRadius = radius - width / 2;
  const circumference = Math.PI * adjustedRadius * 2;

  return (
    <div className="relative w-fit">
      <svg
        width={(radius) * 2}
        height={(radius) * 2}
        viewBox={`0 0 ${totalWidth} ${totalWidth}`}>
        <circle
          cx={radius}
          cy={radius}
          r={adjustedRadius}
          fill="transparent"
          strokeWidth={width}
          stroke={color || "#4CAF50"}
          strokeDasharray={`${circumference} ${circumference}`}
          className="loader -rotate-90"
        />
      </svg>
    </div>
  );
};

export default ProfileLoader;
