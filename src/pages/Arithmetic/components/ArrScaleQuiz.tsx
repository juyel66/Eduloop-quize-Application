import Controllers from "@/components/common/Controllers";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";

/** Modes:
 * - connectThenType   → user connects a dot to a tick, then types that tick number
 * - preConnected      → connections pre-made, user types numbers
 * - preFilledBoxes    → numbers shown in boxes (read-only), user must connect to matching ticks
 */
type Mode = "connectThenType" | "preConnected" | "preFilledBoxes";
type PresetPair = { dotIndex: number; lineNum: number };

type Props = {
  mode: Mode;
  presetLineNums?: PresetPair[];
  presetBoxNumbers?: number[];
  dotCount?: number;
  // onNext: () => void;
};

type Connection = {
  dotIndex: number;
  lineNum: number;
  x: number;
  y: number;
};

const BRAND = "#ff6900";
const TICK_GAP = 17;
const SNAP_RADIUS = 8;

export default function ArrScaleQuiz({
  mode,
  presetLineNums = [],
  presetBoxNumbers = [12, 50, 97, 3, 88],
  dotCount = 5,
  // onNext,
}: Props) {
  const lines = useMemo(() => Array.from({ length: 100 }, (_, i) => i + 1), []);
  const [activeDot, setActiveDot] = useState<number | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, "correct" | "wrong" | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const connectDotToTick = (dotIndex: number, lineNum: number, tickEl: HTMLDivElement) => {
    const container = containerRef.current?.getBoundingClientRect();
    const tickRect = tickEl.getBoundingClientRect();
    if (!container) return;

    const x = tickRect.left - container.left + tickRect.width / 2;
    const y = tickRect.bottom - container.top;

    setConnections((prev) => {
      const filtered = prev.filter((c) => c.dotIndex !== dotIndex);
      return [...filtered, { dotIndex, lineNum, x, y }];
    });
  };

  const handleDotClick = (dotIndex: number) => {
    if (mode === "preConnected") return;
    setActiveDot(dotIndex);
  };

  const handleScaleClick = (lineNum: number) => {
    if (mode === "preConnected") return;
    if (activeDot === null) return;
    const tickEl = document.getElementById(`tick-${lineNum}`) as HTMLDivElement | null;
    if (!tickEl) return;
    connectDotToTick(activeDot, lineNum, tickEl);
    setActiveDot(null);
  };

  const handleScaleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    const x = e.clientX - container.left;
    let guess = Math.round(x / TICK_GAP);
    guess = Math.max(1, Math.min(100, guess));
    const tickX = guess * TICK_GAP;
    setHoveredLine(Math.abs(x - tickX) <= SNAP_RADIUS ? guess : null);
  };
  const handleScaleMouseLeave = () => setHoveredLine(null);

  const handleScaleContainerClick = () => {
    if (mode === "preConnected") return;
    if (activeDot === null || hoveredLine == null) return;
    const tickEl = document.getElementById(`tick-${hoveredLine}`) as HTMLDivElement | null;
    if (!tickEl) return;
    connectDotToTick(activeDot, hoveredLine, tickEl);
    setActiveDot(null);
  };

  const handleCheck = () => {
    const newResults: Record<number, "correct" | "wrong" | null> = {};
    if (mode === "preFilledBoxes") {
      // User must connect to numbers shown in boxes
      presetBoxNumbers.slice(0, dotCount).forEach((targetNum, dotIndex) => {
        const conn = connections.find((c) => c.dotIndex === dotIndex);
        newResults[dotIndex] = conn && conn.lineNum === targetNum ? "correct" : "wrong";
      });
    } else {
      // Compare typed against connected tick number
      for (let dotIndex = 0; dotIndex < dotCount; dotIndex++) {
        const conn = connections.find((c) => c.dotIndex === dotIndex);
        const asNum = typed[dotIndex]?.trim() ? Number(typed[dotIndex]) : NaN;
        newResults[dotIndex] = conn && !Number.isNaN(asNum) && asNum === conn.lineNum ? "correct" : "wrong";
      }
    }
    setResults(newResults);
  };

  const allCorrect = useMemo(() => {
    const vals = Object.values(results);
    return vals.length > 0 && vals.every((r) => r === "correct");
  }, [results]);

  // Build preset connections for preConnected on mount / when ticks render
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

  // --- Show Solution ---
  const handleShowSolution = () => {
    if (mode === "preFilledBoxes") {
      // Connect each dot to its preset box number
      const container = containerRef.current?.getBoundingClientRect();
      if (!container) return;

      const next: Connection[] = [];
      for (let dotIndex = 0; dotIndex < dotCount; dotIndex++) {
        const targetNum = presetBoxNumbers[dotIndex];
        if (!targetNum) continue;
        const tickEl = document.getElementById(`tick-${targetNum}`) as HTMLDivElement | null;
        if (!tickEl) continue;
        const r = tickEl.getBoundingClientRect();
        const x = r.left - container.left + r.width / 2;
        const y = r.bottom - container.top;
        next.push({ dotIndex, lineNum: targetNum, x, y });
      }
      setConnections(next);

      // Mark all as correct
      const solved: Record<number, "correct" | "wrong" | null> = {};
      for (let i = 0; i < dotCount; i++) solved[i] = "correct";
      setResults(solved);
    } else {
      // Fill inputs with the connected tick numbers (for existing connections)
      const nextTyped: Record<number, string> = {};
      for (let dotIndex = 0; dotIndex < dotCount; dotIndex++) {
        const conn = connections.find((c) => c.dotIndex === dotIndex);
        if (conn) nextTyped[dotIndex] = String(conn.lineNum);
      }
      setTyped(nextTyped);

      // If we want to also mark them correct immediately:
      const solved: Record<number, "correct" | "wrong" | null> = {};
      for (let i = 0; i < dotCount; i++) {
        const has = connections.find((c) => c.dotIndex === i);
        solved[i] = has ? "correct" : "wrong";
      }
      setResults(solved);
    }
  };

  return (
    <>
      <div ref={containerRef} className="relative">
        {/* Scale */}
        <div
          className="relative h-24"
          onMouseMove={handleScaleMouseMove}
          onMouseLeave={handleScaleMouseLeave}
          onClick={handleScaleContainerClick}
        >
          <div className="w-full h-1 bg-black absolute bottom-6 " />
          {lines.map((num) => {
            const isFirst = num === 1;
            const isLast = num === 100;
            const isMiddle = num === 50;
            const isLarge = num % 10 === 0 || isFirst || isLast;
            const isMedium = num % 5 === 0 && !isLarge;

            const isConnectedLine = connections.some((c) => c.lineNum === num);
            const isSnapped = hoveredLine === num;

            return (
              <div
                key={num}
                id={`tick-${num}`}
                onClick={() => handleScaleClick(num)}
                className={`absolute bottom-6 ${mode === "preConnected" ? "cursor-default" : "cursor-pointer"}`}
                style={{
                  left: `${num * TICK_GAP}px`,
                  width: isLarge ? "3px" : isMedium ? "2px" : "1px",
                  height: isLarge ? "40px" : isMedium ? "28px" : "20px",
                  backgroundColor: isConnectedLine ? BRAND : isSnapped ? BRAND : "black",
                  boxShadow: isSnapped && !isConnectedLine ? `0 0 0 2px ${BRAND}33` : "none",
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

        {/* Dots + Inputs */}
        <div className="mt-[100px] flex items-center gap-2 justify-center">
          {Array.from({ length: dotCount }).map((_, dotIndex) => {
            const isConnectedDot = connections.some((c) => c.dotIndex === dotIndex);
            const isActive = activeDot === dotIndex;

            const isReadOnly = mode === "preFilledBoxes";
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

                {/* Input */}
                <input
                  id={`input-${dotIndex}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={3}
                  placeholder={isReadOnly ? "" : ""}
                  value={isReadOnly ? String(presetValue) : (typed[dotIndex] ?? "")}
                  readOnly={isReadOnly}
                  onChange={(e) => {
                    if (isReadOnly) return;
                    const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                    setTyped((prev) => ({ ...prev, [dotIndex]: onlyDigits }));
                    setResults((prev) => ({ ...prev, [dotIndex]: null }));
                  }}
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

        {/* SVG connectors */}
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
      </div>

      {/* Controls */}
      <Controllers handleCheck={handleCheck} handleShowSolution={handleShowSolution}/>
    </>
  );
}
