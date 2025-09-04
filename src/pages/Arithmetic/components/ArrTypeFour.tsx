import { useMemo, useRef, useState } from "react";

type Connection = {
  dotIndex: number;
  lineNum: number;
  x: number;
  y: number;
};

const BRAND = "#ff6900";

type Props = {
  /** Numbers that appear in the boxes (one per dot). Example: [12, 50, 97, 3, 88] */
  presetBoxNumbers?: number[];
};

export default function ArrTypeFour({ presetBoxNumbers = [12, 50, 97, 3, 88] }: Props) {
  const lines = useMemo(() => Array.from({ length: 100 }, (_, i) => i + 1), []);
  const [activeDot, setActiveDot] = useState<number | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [results, setResults] =
    useState<Record<number, "correct" | "wrong" | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dot -> active
  const handleDotClick = (dotIndex: number) => {
    setActiveDot(dotIndex);
  };

  // Click a tick to connect it to the active dot
  const handleScaleClick = (lineNum: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (activeDot === null) return;

    const container = containerRef.current?.getBoundingClientRect();
    const tickRect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    if (!container) return;

    // bottom-center of the tick
    const x = tickRect.left - container.left + tickRect.width / 2;
    const y = tickRect.bottom - container.top;

    // Keep only one connection per dot: replace existing for this dotIndex
    setConnections((prev) => {
      const filtered = prev.filter((c) => c.dotIndex !== activeDot);
      return [...filtered, { dotIndex: activeDot, lineNum, x, y }];
    });

    setActiveDot(null);
  };

  // Validate: compare connection's lineNum with the preset number shown in the box
  const handleCheck = () => {
    const newResults: Record<number, "correct" | "wrong" | null> = {};
    presetBoxNumbers.forEach((targetNum, dotIndex) => {
      const conn = connections.find((c) => c.dotIndex === dotIndex);
      if (!conn) {
        newResults[dotIndex] = "wrong"; // no connection -> wrong
      } else {
        newResults[dotIndex] = conn.lineNum === targetNum ? "correct" : "wrong";
      }
    });
    setResults(newResults);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Scale */}
      <div className="relative h-24">
        <div className="w-full h-1 bg-black absolute bottom-6" />

        {lines.map((num) => {
          const isFirst = num === 1;
          const isLast = num === 100;
          const isMiddle = num === 50;
          const isLarge = num % 10 === 0 || isFirst || isLast;
          const isMedium = num % 5 === 0 && !isLarge;

          // color the line if it's connected
          const isConnectedLine = connections.some((c) => c.lineNum === num);

          return (
            <div
              key={num}
              onClick={(e) => handleScaleClick(num, e)}
              className="absolute bottom-6 cursor-pointer"
              style={{
                left: `${num * 17}px`,
                width: isLarge ? "3px" : isMedium ? "2px" : "1px",
                height: isLarge ? "40px" : isMedium ? "28px" : "20px",
                backgroundColor: isConnectedLine ? BRAND : "black",
              }}
            >
              {(isFirst || isMiddle || isLast) && (
                <span className="absolute top-full mt-1 font-semibold text-lg text-black">
                  {num}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Inputs with dots (numbers pre-filled; user cannot edit) */}
      <div className="mt-[100px] flex items-center gap-2 justify-center">
        {presetBoxNumbers.map((num, dotIndex) => {
          const isConnectedDot = connections.some((c) => c.dotIndex === dotIndex);
          const isActive = activeDot === dotIndex;

          return (
            <div key={dotIndex} className="flex flex-col items-center">
              {/* Dot */}
              <div
                id={`dot-${dotIndex}`}
                onClick={() => handleDotClick(dotIndex)}
                className="size-4 mb-3 rounded-full cursor-pointer"
                style={{ backgroundColor: isActive || isConnectedDot ? BRAND : "black" }}
              />
              {/* Read-only number box */}
              <input
                id={`input-${dotIndex}`}
                type="text"
                value={num.toString()}
                readOnly
                className={`border-2 size-15 text-3xl font-bold text-center appearance-none focus:outline-none
                  ${
                    results[dotIndex] === "correct"
                      ? "border-green-500"
                      : results[dotIndex] === "wrong"
                      ? "border-red-500"
                      : "border-primary"
                  }`}
              />
            </div>
          );
        })}
      </div>

      {/* Connection lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {connections.map((c, i) => {
          const dotRect = document.getElementById(`dot-${c.dotIndex}`)?.getBoundingClientRect();
          const containerRect = containerRef.current?.getBoundingClientRect();
          if (!dotRect || !containerRect) return null;

          const dotX = dotRect.left - containerRect.left + dotRect.width / 2;
          const dotY = dotRect.top - containerRect.top + dotRect.height / 2;

          return (
            <line
              key={i}
              x1={dotX}
              y1={dotY}
              x2={c.x}
              y2={c.y}
              stroke={BRAND}
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Check button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={handleCheck}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
        >
          Check Answers
        </button>
      </div>
    </div>
  );
}
