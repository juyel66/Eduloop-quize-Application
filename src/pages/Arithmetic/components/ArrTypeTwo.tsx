import { useState, useRef } from "react";

type Connection = {
    dotIndex: number;
    lineNum: number;
    x: number;
    y: number;
};

const BRAND = "#ff6900"; // your line/dot color

export default function ArrTypeTwo() {
    const lines = Array.from({ length: 100 }, (_, i) => i + 1);
    const [activeDot, setActiveDot] = useState<number | null>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [results, setResults] = useState<Record<number, "correct" | "wrong" | null>>({});
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleDotClick = (dotIndex: number) => {
        setActiveDot(dotIndex);
    };

    const handleScaleClick = (lineNum: number, e: React.MouseEvent<HTMLDivElement>) => {
        if (activeDot !== null) {
            const container = containerRef.current?.getBoundingClientRect();
            const tickRect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            if (!container) return;

            // Anchor to the *bottom center* of the tick
            const x = tickRect.left - container.left + tickRect.width / 2;
            const y = tickRect.bottom - container.top;

            setConnections((prev) => [...prev, { dotIndex: activeDot, lineNum, x, y }]);
            setActiveDot(null);
        }
    };


    const handleCheck = () => {
        const newResults: Record<number, "correct" | "wrong" | null> = {};
        connections.forEach((c) => {
            const input = document.getElementById(`input-${c.dotIndex}`) as HTMLInputElement | null;
            if (input) {
                const userValue = parseInt(input.value, 10);
                newResults[c.dotIndex] = userValue === c.lineNum ? "correct" : "wrong";
            }
        });
        setResults(newResults);
    };

    return (
        <div ref={containerRef} className="relative">
            {/* Scale */}
            <div className="relative h-24">
                <div className="w-full h-1 bg-black absolute bottom-6"></div>

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

            {/* Inputs with dots */}
            <div className="mt-[100px] flex items-center gap-2 justify-center">
                {[0, 1, 2, 3, 4].map((dotIndex) => {
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

                            {/* Input */}
                            <input
                                id={`input-${dotIndex}`}
                                type="text"
                                inputMode="numeric"
                                placeholder="00"
                                className={`border-2 size-15 text-3xl font-bold text-center appearance-none focus:outline-none
                                ${results[dotIndex] === "correct"
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


            {/* Connections */}
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
