"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Item = {
  id: number;
  number: number;
  firstNumber: number;
  lastNumber: number;
};

interface Props {
  data: Item[];
}

export default function ArrFirstAndSecondNumber({ data }: Props) {
  const [answers, setAnswers] = useState<{ [key: number]: { first?: string; last?: string } }>(
    {}
  );
  const [results, setResults] = useState<{ [key: number]: { first?: "correct" | "wrong"; last?: "correct" | "wrong" } }>({});

  const handleChange = (id: number, field: "first" | "last", value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleCheck = () => {
    const newResults: typeof results = {};
    data.forEach((d) => {
      const userFirst = answers[d.id]?.first;
      const userLast = answers[d.id]?.last;

      newResults[d.id] = {
        first: userFirst === String(d.firstNumber) ? "correct" : "wrong",
        last: userLast === String(d.lastNumber) ? "correct" : "wrong",
      };
    });
    setResults(newResults);
  };

  const handleShowSolution = () => {
    const newAnswers: typeof answers = {};
    const newResults: typeof results = {};
    data.forEach((d) => {
      newAnswers[d.id] = { first: String(d.firstNumber), last: String(d.lastNumber) };
      newResults[d.id] = { first: "correct", last: "correct" };
    });
    setAnswers(newAnswers);
    setResults(newResults);
  };

  return (
    <div>
      {data?.map((d) => (
        <div key={d.id} className="flex items-center gap-2 my-2">
          <p className="font-bold">{d.number}</p>
          <p>lies between</p>
          <input
            type="text"
            value={answers[d.id]?.first ?? ""}
            onChange={(e) => handleChange(d.id, "first", e.target.value)}
            className={`border-b-2 border-dashed px-3 w-16 text-center outline-none
              ${
                results[d.id]?.first === "correct"
                  ? "text-green-600 border-green-600"
                  : results[d.id]?.first === "wrong"
                  ? "text-red-600 border-red-600"
                  : "border-black"
              }`}
          />
          <p>and</p>
          <input
            type="text"
            value={answers[d.id]?.last ?? ""}
            onChange={(e) => handleChange(d.id, "last", e.target.value)}
            className={`border-b-2 border-dashed px-3 w-16 text-center outline-none
              ${
                results[d.id]?.last === "correct"
                  ? "text-green-600 border-green-600"
                  : results[d.id]?.last === "wrong"
                  ? "text-red-600 border-red-600"
                  : "border-black"
              }`}
          />
        </div>
      ))}

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
