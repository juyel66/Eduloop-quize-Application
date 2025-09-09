"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Controllers from "@/components/common/Controllers";

type Item = {
  id: number;
  result: number;
  answer: [number, number][]; // multiple pairs
};

interface Props {
  data: Item[];
  method: "addition" | "multiplication";
}

export default function ArrNumAddMultiOptions({ data, method }: Props) {
  // store user input
  const [userInput, setUserInput] = useState<{ [key: string]: string }>({});
  // store validation result
  const [results, setResults] = useState<{ [key: string]: "correct" | "wrong" | null }>({});

  const checkAnswer = (d: Item, fixed: number, userVal: string) => {
    const userNum = Number(userVal);
    if (!userVal) return false;

    if (method === "addition") {
      return fixed + userNum === d.result;
    }
    if (method === "multiplication") {
      return fixed * userNum === d.result;
    }
    return false;
  };

  const handleChange = (key: string, value: string) => {
    setUserInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheck = () => {
    const newResults: typeof results = {};
    data.forEach((d) => {
      d.answer.forEach((pair, idx) => {
        const key = `${d.id}-${idx}`;
        // first digit fixed, second user input
        const fixed = pair[0];
        const inputVal = userInput[key];
        newResults[key] = checkAnswer(d, fixed, inputVal) ? "correct" : "wrong";
      });
    });
    setResults(newResults);
  };

  const handleShowSolution = () => {
    const newInputs: typeof userInput = {};
    const newResults: typeof results = {};

    data.forEach((d) => {
      d.answer.forEach((pair, idx) => {
        const key = `${d.id}-${idx}`;
        const fixed = pair[0];
        const expected = method === "addition" ? d.result - fixed : d.result / fixed;

        newInputs[key] = String(expected);
        newResults[key] = "correct";
      });
    });

    setUserInput(newInputs);
    setResults(newResults);
  };

  return (
    <div>
      <div className="flex gap-6 items-center justify-center">
        {data.map((d) => (
          <div key={d.id} className="flex flex-col items-center">
            {/* Top number */}
            <p className="text-xl font-bold">{d.result}</p>
            <div className="w-20 h-0.5 bg-blue-400 my-1"></div>

            {/* Options (pairs) */}
            <div className="flex flex-col gap-2">
              {d.answer.map((pair, idx) => {
                const key = `${d.id}-${idx}`;
                const fixed = pair[0];
                return (
                  <div key={idx} className="flex items-center gap-2 justify-center">
                    {/* Fixed digit */}
                    <p className="px-3 w-12 text-center border-black font-bold">
                      {fixed}
                    </p>
                    <div className="w-0.5 h-8 bg-blue-400"></div>


                    {/* User input digit */}
                    <input
                      type="text"
                      value={userInput[key] ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className={`border-b-2 px-3 w-12 text-center outline-none font-bold
                        ${
                          results[key] === "correct"
                            ? "border-green-600 text-green-600"
                            : results[key] === "wrong"
                            ? "border-red-600 text-red-600"
                            : "border-dashed border-black"
                        }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <Controllers handleCheck={handleCheck} handleShowSolution={handleShowSolution}/>
    </div>
  );
}
