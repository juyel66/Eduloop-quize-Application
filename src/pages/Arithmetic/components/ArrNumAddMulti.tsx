"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Controllers from "@/components/common/Controllers";

type Item = {
  id: number;
  result: number;
  option: number;
  answer: number; // keep for reference / solution
};

interface Props {
  data: Item[];
  method: "addition" | "multiplication";
}

export default function ArrNumAddMulti({ data, method }: Props) {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [results, setResults] = useState<{ [key: number]: "correct" | "wrong" | null }>({});

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // calculate expected answer dynamically
  const calculateAnswer = (d: Item) => {
    if (method === "addition") {
      return d.result - d.option;
    }
    if (method === "multiplication") {
      return d.result / d.option;
    }
    return d.answer;
  };

  const handleCheck = () => {
    const newResults: typeof results = {};
    data.forEach((d) => {
      const expected = calculateAnswer(d);
      const userVal = answers[d.id];
      newResults[d.id] = userVal === String(expected) ? "correct" : "wrong";
    });
    setResults(newResults);
  };

  const handleShowSolution = () => {
    const newAnswers: typeof answers = {};
    const newResults: typeof results = {};
    data.forEach((d) => {
      const expected = calculateAnswer(d);
      newAnswers[d.id] = String(expected);
      newResults[d.id] = "correct";
    });
    setAnswers(newAnswers);
    setResults(newResults);
  };

  return (
    <div>
      <div className="flex gap-8 items-center justify-center">
        {data.map((d) => (
          <div key={d.id} className="flex items-center flex-col">
            {/* Top number */}
            <p className="text-xl font-bold">{d.result}</p>
            <div className="w-20 h-0.5 bg-blue-400 my-1"></div>

            {/* Bottom row */}
            <div className="flex items-center gap-2">
              <p className="px-3 w-10 text-center font-bold">{d.option}</p>
              <div className="w-0.5 h-14 bg-blue-400"></div>
              <input
                type="text"
                value={answers[d.id] ?? ""}
                onChange={(e) => handleChange(d.id, e.target.value)}
                className={`border-b-2 px-3 w-10 text-center outline-none
                  ${
                    results[d.id] === "correct"
                      ? "border-green-600 text-green-600"
                      : results[d.id] === "wrong"
                      ? "border-red-600 text-red-600"
                      : "border-dashed border-black"
                  }`}
              />
            </div>

            {/* Method text */}
            {/* <p className="text-sm mt-2 text-gray-500">
              {method === "addition"
                ? `${d.number} - ${d.option} = ?`
                : `${d.number} ÷ ${d.option} = ?`}
            </p> */}
          </div>
        ))}
      </div>

      {/* Controls */}
      <Controllers handleCheck={handleCheck} handleShowSolution={handleShowSolution}/>
    </div>
  );
}
