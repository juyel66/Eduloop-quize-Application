import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "connectThenType" | "preConnected" | "preFilledBoxes";

type PresetPair = { dotIndex: number; lineNum: number };

type Props = {
  /** Behavior mode */
  mode: Mode;
  /** For preConnected mode: which dots are connected to which line numbers */
  presetLineNums?: PresetPair[];
  /** For preFilledBoxes mode: numbers shown in the boxes (index = dotIndex) */
  presetBoxNumbers?: number[];
  /** How many dots/boxes to render (default 5) */
  dotCount?: number;
};

type Connection = {
  dotIndex: number;
  lineNum: number;
  x: number; // tick bottom-center x relative to container
  y: number; // tick bottom y relative to container
};

const BRAND = "#ff6900";

export default function ArrScaleQuiz({
  mode,
  presetLineNums = [],
  presetBoxNumbers = [12, 50, 97, 3, 88],
  dotCount = 5,
}: Props) {
  const lines = useMemo(() => Array.from({ length: 100 }, (_, i) => i + 1), []);
  const [activeDot, setActiveDot] = useState<number | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [results, setResults] = useState<Record<number, "correct" | "wrong" | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // --------- Helpers ---------
  const connectDotToTick = (dotIndex: number, lineNum: number, tickEl: HTMLDivElement) => {
    const container = containerRef.current?.getBoundingClientRect();
    const tickRect = tickEl.getBoundingClientRect();
    if (!container) return;

    const x = tickRect.left - container.left + tickRect.width / 2;
    const y = tickRect.bottom - container.top; // bottom of tick

    // allow a single connection per dot (replace old one)
    setConnections((prev) => {
      const filtered = prev.filter((c) => c.dotIndex !== dotIndex);
      return [...filtered, { dotIndex, lineNum, x, y }];
    });
  };

  // --------- Click handlers (disabled where appropriate) ---------
  const handleDotClick = (dotIndex: number) => {
    if (mode === "preConnected") return; // in this mode, user only types
    setActiveDot(dotIndex);
  };

  const handleScaleClick = (lineNum: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === "preConnected") return; // no connecting in this mode
    if (activeDot === null) return;

    connectDotToTick(activeDot, lineNum, e.currentTarget as HTMLDivElement);
    setActiveDot(null);
  };

  // --------- Validation ---------
  const handleCheck = () => {
    const newResults: Record<number, "correct" | "wrong" | null> = {};

    if (mode === "preFilledBoxes") {
      // compare connection's lineNum with the preset number shown in the box
      presetBoxNumbers.slice(0, dotCount).forEach((targetNum, dotIndex) => {
        const conn = connections.find((c) => c.dotIndex === dotIndex);
        newResults[dotIndex] = conn && conn.lineNum === targetNum ? "correct" : "wrong";
      });
    } else {
      // connectThenType & preConnected: compare input value with connection lineNum
      for (let dotIndex = 0; dotIndex < dotCount; dotIndex++) {
        const conn = connections.find((c) => c.dotIndex === dotIndex);
        const input = document.getElementById(`input-${dotIndex}`) as HTMLInputElement | null;
        if (!conn || !input) {
          newResults[dotIndex] = "wrong";
          continue;
        }
        const userValue = parseInt(input.value, 10);
        newResults[dotIndex] = userValue === conn.lineNum ? "correct" : "wrong";
      }
    }

    setResults(newResults);
  };

  // --------- PRESET connections for "preConnected" mode ---------
  useEffect(() => {
    if (mode !== "preConnected" || !presetLineNums.length) {
      if (mode !== "preConnected") setConnections([]); // reset if switching modes
      return;
    }

    const compute = () => {
      const container = containerRef.current?.getBoundingClientRect();
      if (!container) return;

      const next: Connection[] = [];
      for (const { dotIndex, lineNum } of presetLineNums) {
        const tickEl = document.getElementById(`tick-${lineNum}`) as HTMLDivElement | null;
        if (!tickEl) continue;
        const r = tickEl.getBoundingClientRect();
        const x = r.left - container.left + r.width / 2;
        const y = r.bottom - container.top;
        next.push({ dotIndex, lineNum, x, y });
      }
      setConnections(next);
      setActiveDot(null);
      setResults({});
    };

    const raf = requestAnimationFrame(compute);
    const onResize = () => compute();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [mode, presetLineNums]);

  // --------- UI ---------
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

          const isConnectedLine = connections.some((c) => c.lineNum === num);

          return (
            <div
              key={num}
              id={`tick-${num}`}
              onClick={(e) => handleScaleClick(num, e)}
              className={`absolute bottom-6 ${mode === "preConnected" ? "cursor-default" : "cursor-pointer"}`}
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

      {/* Inputs with dots */}
      <div className="mt-[100px] flex items-center gap-2 justify-center">
        {Array.from({ length: dotCount }).map((_, dotIndex) => {
          const isConnectedDot = connections.some((c) => c.dotIndex === dotIndex);
          const isActive = activeDot === dotIndex;
          const showReadOnly = mode === "preFilledBoxes";
          const presetValue = presetBoxNumbers[dotIndex] ?? "";

          return (
            <div key={dotIndex} className="flex flex-col items-center">
              {/* Dot */}
              <div
                id={`dot-${dotIndex}`}
                onClick={() => handleDotClick(dotIndex)}
                className="size-4 mb-3 rounded-full"
                style={{
                  backgroundColor:
                    isActive || isConnectedDot || mode === "preConnected" ? BRAND : "black",
                  cursor: mode === "preConnected" ? "default" : "pointer",
                }}
              />

              {/* Input (editable unless preFilledBoxes) */}
              <input
                id={`input-${dotIndex}`}
                type="text"
                inputMode="numeric"
                placeholder={showReadOnly ? "" : "00"}
                value={showReadOnly ? String(presetValue) : undefined}
                readOnly={showReadOnly}
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

          return <line key={i} x1={dotX} y1={dotY} x2={c.x} y2={c.y} stroke={BRAND} strokeWidth="2" />;
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
