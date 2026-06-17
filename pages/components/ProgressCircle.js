export default function ProgressCircle({ count, max }) {
  if (!count && count !== 0 || !max) {
    return null;
  }

  const percentage = (count / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10 flex flex-col items-center">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Círculo de fondo */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
          />
          {/* Círculo de progreso */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        {/* Texto central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white font-bold text-sm md:text-base">{count}</span>
          <span className="text-white/70 text-xs md:text-sm">/ {max}</span>
        </div>
      </div>
      <p className="text-white text-xs mt-3 font-runner">Registrados</p>
    </div>
  );
}
