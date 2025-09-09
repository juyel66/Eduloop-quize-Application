"use client";

import { useState, useMemo } from "react";
import Controllers from "@/components/common/Controllers";
import Check from "@/components/common/Check";

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
  const [userInput, setUserInput] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ [key: string]: "correct" | "wrong" | null }>({});
  const [checked, setChecked] = useState(false);

  const checkAnswer = (d: Item, fixed: number, userVal: string) => {
    const userNum = Number(userVal);
    if (!userVal) return false;
    if (method === "addition") return fixed + userNum === d.result;
    if (method === "multiplication") return fixed * userNum === d.result;
    return false;
  };

  const handleChange = (key: string, value: string) => {
    setUserInput((prev) => ({ ...prev, [key]: value }));
    if (checked) setChecked(false); // reset feedback when editing
  };

  const handleCheck = () => {
    const newResults: typeof results = {};
    data.forEach((d) => {
      d.answer.forEach((pair, idx) => {
        const key = `${d.id}-${idx}`;
        const fixed = pair[0];
        const inputVal = userInput[key];
        newResults[key] = checkAnswer(d, fixed, inputVal) ? "correct" : "wrong";
      });
    });
    setResults(newResults);
    setChecked(true);
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
    setChecked(false); // 👈 prevents showing summary after solution
  };

  // ✅ Summary only shows after "Check"
  const summary = useMemo(() => {
    if (!checked) return null;

    const vals = Object.values(results);
    if (vals.length === 0) return null;

    const allCorrect = vals.every((r) => r === "correct");
    const anyWrong = vals.some((r) => r === "wrong");

    if (allCorrect) {
      return {
        text: "🎉 Correct! Good Job",
        color: "text-green-600",
        bgColor: "bg-green-100",
        borderColor: "border-green-600",
      };
    }
    if (anyWrong) {
      return {
        text: "❌ Oops! Some answers are wrong",
        color: "text-red-600",
        bgColor: "bg-red-100",
        borderColor: "border-red-600",
      };
    }
    return null;
  }, [results, checked]);

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
                    <p className="px-3 w-12 text-center border-black font-bold">{fixed}</p>
                    <div className="w-0.5 h-8 bg-blue-400"></div>

                    {/* User input digit */}
                    <input
                      type="text"
                      value={userInput[key] ?? ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className={`border-b-2 px-3 w-12 text-center outline-none font-bold
                        ${
                          results[key] === "correct" && checked
                            ? "border-green-600 text-green-600"
                            : results[key] === "wrong" && checked
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
      <Controllers handleCheck={handleCheck} handleShowSolution={handleShowSolution} />
      <Check summary={summary} /> {/* ✅ Only shows after Check */}
    </div>
  );
}
