"use client";

import { useState, useMemo } from "react";
import Controllers from "@/components/common/Controllers";
import Check from "@/components/common/Check";

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

export default function ArrTypeFive({ data, method }: Props) {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [results, setResults] = useState<{ [key: number]: "correct" | "wrong" | null }>({});
  const [checked, setChecked] = useState(false);

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (checked) setChecked(false); // reset feedback when editing
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
    setChecked(true);
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
    setChecked(false); // 👈 don't show summary after solution
  };

  // ✅ Summary only when "Check" is clicked
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
                    results[d.id] === "correct" && checked
                      ? "border-green-600 text-green-600"
                      : results[d.id] === "wrong" && checked
                      ? "border-red-600 text-red-600"
                      : "border-dashed border-black"
                  }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <Controllers handleCheck={handleCheck} handleShowSolution={handleShowSolution} />
      <Check summary={summary} /> {/* ✅ shows only after Check */}
    </div>
  );
}
