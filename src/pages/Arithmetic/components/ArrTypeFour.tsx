"use client";

import { useState, useMemo } from "react";
import Controllers from "@/components/common/Controllers";
import Check from "@/components/common/Check";

type Item = {
  id: number;
  number: number;
  firstNumber: number;
  lastNumber: number;
};

interface Props {
  data: Item[];
}

export default function ArrTypeFour({ data }: Props) {
  const [answers, setAnswers] = useState<{ [key: number]: { first?: string; last?: string } }>({});
  const [results, setResults] = useState<{ [key: number]: { first?: "correct" | "wrong"; last?: "correct" | "wrong" } }>({});
  const [checked, setChecked] = useState(false);

  const handleChange = (id: number, field: "first" | "last", value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
    if (checked) setChecked(false); // reset feedback when editing
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
    setChecked(true);
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
    setChecked(false); // 👈 no summary after solution
  };

  // ✅ Summary (same logic as other components)
  const summary = useMemo(() => {
    if (!checked) return null;

    const allResults = Object.values(results).flatMap((r) => [r.first, r.last]);
    if (allResults.length === 0) return null;

    const allCorrect = allResults.every((r) => r === "correct");
    const anyWrong = allResults.some((r) => r === "wrong");

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
      {data?.map((d) => (
        <div key={d.id} className="flex items-center gap-2 my-2">
          <p className="font-bold">{d.number}</p>
          <p>lies between</p>

          {/* First input */}
          <input
            type="text"
            value={answers[d.id]?.first ?? ""}
            onChange={(e) => handleChange(d.id, "first", e.target.value)}
            className={`border-b-2 border-dashed px-3 w-16 text-center outline-none
              ${
                results[d.id]?.first === "correct" && checked
                  ? "text-green-600 border-green-600"
                  : results[d.id]?.first === "wrong" && checked
                  ? "text-red-600 border-red-600"
                  : "border-black"
              }`}
          />

          <p>and</p>

          {/* Last input */}
          <input
            type="text"
            value={answers[d.id]?.last ?? ""}
            onChange={(e) => handleChange(d.id, "last", e.target.value)}
            className={`border-b-2 border-dashed px-3 w-16 text-center outline-none
              ${
                results[d.id]?.last === "correct" && checked
                  ? "text-green-600 border-green-600"
                  : results[d.id]?.last === "wrong" && checked
                  ? "text-red-600 border-red-600"
                  : "border-black"
              }`}
          />
        </div>
      ))}

      {/* Controls */}
      <Controllers handleCheck={handleCheck} handleShowSolution={handleShowSolution} />
      <Check summary={summary} /> {/* ✅ Only shows after Check */}
    </div>
  );
}
