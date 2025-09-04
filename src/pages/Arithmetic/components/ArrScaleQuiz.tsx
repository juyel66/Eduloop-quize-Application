import { useEffect, useMemo, useRef, useState } from "react";

/** Question modes:
 * - connectThenType   → user clicks dot → clicks tick → types the number
 * - preConnected      → connections are pre-made, user only types numbers
 * - preFilledBoxes    → boxes show numbers, user must connect dots to correct ticks
 */
type Mode = "connectThenType" | "preConnected" | "preFilledBoxes";

type PresetPair = { dotIndex: number; lineNum: number };

type Props = {
  mode: Mode;
  /** For "preConnected": which dots are connected to which line numbers on load */
  presetLineNums?: PresetPair[];
  /** For "preFilledBoxes": numbers shown in the boxes (index = dotIndex) */
  presetBoxNumbers?: number[];
  /** Number of dot+box pairs to render (default 5) */
  dotCount?: number;
};

type Connection = {
  dotIndex: number;
  lineNum: number;
  /** Bottom-center coordinate of the tick (relative to the container) */
  x: number;
  y: number;
};

const BRAND = "#ff6900"; // your brand color for active lines, dots, connectors

export default function ArrScaleQuiz({
  mode,
  presetLineNums = [],
  presetBoxNumbers = [12, 50, 97, 3, 88],
  dotCount = 5,
}: Props) {
  /** 1 → 100 ticks on the scale */
  const lines = useMemo(() => Array.from({ length: 100 }, (_, i) => i + 1), []);

  /** Which dot is currently selected for making a connection */
  const [activeDot, setActiveDot] = useState<number | null>(null);

  /** All current connections (each dot can have at most one) */
  const [connections, setConnections] = useState<Connection[]>([]);

  /** Validation results per dot index: "correct" | "wrong" | null */
  const [results, setResults] = useState<Record<number, "correct" | "wrong" | null>>({});

  /** Ref to the wrapping container for coordinate computations */
  const containerRef = useRef<HTMLDivElement | null>(null);

  // -----------------------
  // Helpers
  // -----------------------

  /** Compute bottom-center of a tick and (re)connect the given dot to that tick */
  const connectDotToTick = (dotIndex: number, lineNum: number, tickEl: HTMLDivElement) => {
    const container = containerRef.current?.getBoundingClientRect();
    const tickRect = tickEl.getBoundingClientRect();
    if (!container) return;

    const x = tickRect.left - container.left + tickRect.width / 2;
    const y = tickRect.bottom - container.top; // bottom of tick

    // Replace any previous connection for this dot
    setConnections((prev) => {
      const filtered = prev.filter((c) => c.dotIndex !== dotIndex);
      return [...filtered, { dotIndex, lineNum, x, y }];
    });
  };

  // -----------------------
  // Click handlers
  // -----------------------

  /** Dot click → select this dot (not used in preConnected) */
  const handleDotClick = (dotIndex: number) => {
    if (mode === "preConnected") return; // dots are static in this mode
    setActiveDot(dotIndex);
  };

  /** Tick click → if a dot is active, connect it to this tick */
  const handleScaleClick = (lineNum: number) => {
    if (mode === "preConnected") return; // no connecting in this mode
    if (activeDot === null) return;

    // Resolve the tick element by id to ensure precise anchor point
    const tickEl = document.getElementById(`tick-${lineNum}`) as HTMLDivElement | null;
    if (!tickEl) return;
    connectDotToTick(activeDot, lineNum, tickEl);
    setActiveDot(null);
  };

  // -----------------------
  // Validation
  // -----------------------

  /** Check answers according to the current mode */
  const handleCheck = () => {
    const newResults: Record<number, "correct" | "wrong" | null> = {};

    if (mode === "preFilledBoxes") {
      // Boxes show the target numbers (read-only). The user must connect to matching ticks.
      presetBoxNumbers.slice(0, dotCount).forEach((targetNum, dotIndex) => {
        const conn = connections.find((c) => c.dotIndex === dotIndex);
        newResults[dotIndex] = conn && conn.lineNum === targetNum ? "correct" : "wrong";
      });
    } else {
      // connectThenType & preConnected: compare typed value in the input with the connected tick
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

  // -----------------------
  // Prebuild connections for "preConnected"
  // (Build once; do not clear in other modes)
  // -----------------------

  useEffect(() => {
    if (mode !== "preConnected" || !presetLineNums.length) return;

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
      setResults({}); // reset any prior results
    };

    const raf = requestAnimationFrame(compute);
    const onResize = () => compute();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [mode, presetLineNums]);

  // -----------------------
  // UI
  // -----------------------

  return (
    <div ref={containerRef} className="relative">
      {/* ---------- Scale with ticks (1 → 100) ---------- */}
      <div className="relative h-24">
        <div className="w-full h-1 bg-black absolute bottom-6" />
        {lines.map((num) => {
          const isFirst = num === 1;
          const isLast = num === 100;
          const isMiddle = num === 50;
          const isLarge = num % 10 === 0 || isFirst || isLast;
          const isMedium = num % 5 === 0 && !isLarge;

          // Highlight tick if it has any connection
          const isConnectedLine = connections.some((c) => c.lineNum === num);

          return (
            <div
              key={num}
              id={`tick-${num}`}
              onClick={() => handleScaleClick(num)}
              className={`absolute bottom-6 ${
                mode === "preConnected" ? "cursor-default" : "cursor-pointer"
              }`}
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

      {/* ---------- Dots + Input boxes row ---------- */}
      <div className="mt-[100px] flex items-center gap-2 justify-center">
        {Array.from({ length: dotCount }).map((_, dotIndex) => {
          const isConnectedDot = connections.some((c) => c.dotIndex === dotIndex);
          const isActive = activeDot === dotIndex;

          const isReadOnly = mode === "preFilledBoxes";
          const presetValue = presetBoxNumbers[dotIndex] ?? "";

          return (
            <div key={dotIndex} className="flex flex-col items-center">
              {/* Dot (clickable in all modes except preConnected) */}
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

              {/* Input box:
                  - connectThenType / preConnected → user types answer
                  - preFilledBoxes → number is shown read-only, user must connect lines
              */}
              <input
                id={`input-${dotIndex}`}
                type="text"
                inputMode="numeric"
                placeholder={isReadOnly ? "" : "00"}
                value={isReadOnly ? String(presetValue) : undefined}
                readOnly={isReadOnly}
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

      {/* ---------- SVG connectors (dot → tick bottom-center) ---------- */}
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

      {/* ---------- Check button ---------- */}
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
