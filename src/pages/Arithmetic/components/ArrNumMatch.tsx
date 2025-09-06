"use client";

import { useState, useMemo } from "react";
import Xarrow from "react-xarrows";
import { Button } from "@/components/ui/button";


export default function ArrNumMatch({data}:any) {
  const [connections, setConnections] = useState<
    { start: string; end: string; leftId: number; rightId: number }[]
  >([]);
  const [selectedDot, setSelectedDot] = useState<string | null>(null);
  const [results, setResults] = useState<{ [key: number]: "correct" | "wrong" }>({});

  // Shuffle right column only once
  const shuffledRight = useMemo(() => {
    // give right column unique "rid" for rendering
    return [...data]
      .map((item, idx) => ({ ...item, rid: idx + 100 })) // rid avoids React key clash
      .sort(() => Math.random() - 0.5);
  }, []);

  const handleDotClick = (id: string) => {
    if (!selectedDot) {
      setSelectedDot(id); // first dot clicked
    } else {
      if (selectedDot.startsWith("dot-left") && id.startsWith("dot-right")) {
        const leftId = parseInt(selectedDot.split("-")[2]);
        const rightId = parseInt(id.split("-")[2]);

        setConnections((prev) => {
          // remove any old connection for this leftId
          const filtered = prev.filter((c) => c.leftId !== leftId);
          return [...filtered, { start: selectedDot, end: id, leftId, rightId }];
        });
      }
      setSelectedDot(null); // reset
    }
  };

  const handleCheck = () => {
    const newResults: { [key: number]: "correct" | "wrong" } = {};
    connections.forEach((conn) => {
      const leftItem = data.find((d:any) => d.id === conn.leftId);
      const rightItem = shuffledRight.find((d) => d.id === conn.rightId);
      if (leftItem && rightItem) {
        if (leftItem.number >= rightItem.from && leftItem.number <= rightItem.to) {
          newResults[leftItem.id] = "correct";
        } else {
          newResults[leftItem.id] = "wrong";
        }
      }
    });
    setResults(newResults);
  };

  const handleShowSolution = () => {
    const newResults: { [key: number]: "correct" | "wrong" } = {};
    data.forEach((d:any) => {
      if (d.number >= d.from && d.number <= d.to) {
        newResults[d.id] = "correct";
      } else {
        newResults[d.id] = "wrong";
      }
    });
    setResults(newResults);

    // auto-connect correct matches visually
    const autoConnections = data
      .map((left:any) => {
        const right = shuffledRight.find(
          (r) => left.number >= r.from && left.number <= r.to
        );
        return right
          ? {
              start: `dot-left-${left.id}`,
              end: `dot-right-${right.id}`,
              leftId: left.id,
              rightId: right.id,
            }
          : null;
      })
      .filter(Boolean) as {
      start: string;
      end: string;
      leftId: number;
      rightId: number;
    }[];

    setConnections(autoConnections);
  };

  return (
    <div>
      <div className="flex items-center justify-between w-2/3 mx-auto relative">
        {/* Left column */}
        <div className="space-y-5">
          {data.map((item:any) => (
            <div key={item.id} className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={item.number}
                className={`border-2 w-20 h-10 text-2xl font-bold text-center 
                  ${
                    results[item.id] === "correct"
                      ? "border-green-500"
                      : results[item.id] === "wrong"
                      ? "border-red-500"
                      : "border-primary"
                  }`}
              />
              <div
                id={`dot-left-${item.id}`}
                className="size-3 bg-black rounded-full cursor-pointer"
                onClick={() => handleDotClick(`dot-left-${item.id}`)}
              ></div>
            </div>
          ))}
        </div>

        {/* Right column (shuffled order) */}
        <div className="space-y-5">
          {shuffledRight.map((item) => (
            <div key={item.rid} className="flex items-center gap-2">
              <div
                id={`dot-right-${item.id}`}
                className="size-3 bg-black rounded-full cursor-pointer"
                onClick={() => handleDotClick(`dot-right-${item.id}`)}
              ></div>
              <input
                type="text"
                readOnly
                value={`${item.from}-${item.to}`}
                className={`border-2 w-28 h-10 text-2xl font-bold text-center 
                  ${
                    results[item.id] === "correct"
                      ? "border-green-500"
                      : results[item.id] === "wrong"
                      ? "border-red-500"
                      : "border-primary"
                  }`}
              />
            </div>
          ))}
        </div>

        {/* Draw connections */}
        {connections.map((c, idx) => (
          <Xarrow
            key={idx}
            start={c.start}
            end={c.end}
            strokeWidth={2}
            color="#ff6900"
            showHead={false}
            showTail={false}
            path="straight"
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCheck}
            className="bg-[#dbeafe] hover:bg-[#dbeafe]/70 text-black border"
          >
            Check
          </Button>
          <Button className="bg-[#ffedd5] hover:bg-[#ffedd5]/70 text-black border">
            Hint
          </Button>
          <Button
            onClick={handleShowSolution}
            className="bg-[#f3e8ff] hover:bg-[#f3e8ff]/70 text-black border"
          >
            Show Solution
          </Button>
        </div>
      </div>
    </div>
  );
}
