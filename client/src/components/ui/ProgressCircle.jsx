const ProgressCircle = ({ percentage, width, radius, color }) => {
  const totalWidth = width * 2 + radius * 2;
  return (
    <div className="relative w-fit">
      <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${totalWidth} ${totalWidth}`}>     
        <circle
          cx={radius + width}
          cy={radius + width}
          r={radius}
          fill="transparent"
          stroke="#e0e0e0"
          strokeWidth={width}
        />
        <circle
          cx={radius - width}
          cy={radius + width}
          r={radius}
          fill="transparent"
          stroke={color || "#4CAF50"}
          strokeWidth={width}
          strokeLinecap="round"
          strokeDasharray={`${(Math.PI * radius * 2 * percentage) / 100} ${Math.PI * radius * 2}`}
          transform={`rotate(-90 ${radius} ${radius})`}
          style={{ transition: "stroke-dasharray 0.5s ease-in-out" }}
        />
      </svg>
    </div>
  );
};

export default ProgressCircle;
