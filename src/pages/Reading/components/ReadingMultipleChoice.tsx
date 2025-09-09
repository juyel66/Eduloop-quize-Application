"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReadingQuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
  description: string;
  hint: string; // ✅ added
}

export default function ReadingMultipleChoice({
  question,
  options,
  correctAnswer,
  description,
  hint,
}: ReadingQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<null | boolean>(null);
  const [showHint, setShowHint] = useState(false); // ✅ state for hint

  const handleCheck = () => {
    if (selected) setResult(selected === correctAnswer);
  };

  const handleShowSolution = () => {
    setSelected(correctAnswer);
    setResult(true);
  };

  return (
    <div className="w-full bg-[#fdeedc] rounded-xl p-6 shadow-md">
      {/* Top description */}
      <div className="bg-[#e9543d] text-white rounded-lg p-4 mb-6">
        <p className="text-sm md:text-base">{description}</p>
      </div>

      {/* Question */}
      <h2 className="text-lg font-semibold mb-4">{question}</h2>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`w-full text-left p-3 rounded-lg border transition ${
              selected === option
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleCheck}
          className="bg-[#dbeafe] hover:bg-[#dbeafe]/70 text-black border"
        >
          Check
        </Button>
        <Button
          onClick={() => setShowHint(!showHint)}
          className="bg-[#ffedd5] hover:bg-[#ffedd5]/70 text-black border"
        >
          {showHint ? "Hide Hint" : "Hint"}
        </Button>
        <Button
          onClick={handleShowSolution}
          className="bg-[#f3e8ff] hover:bg-[#f3e8ff]/70 text-black border"
        >
          Show Solution
        </Button>
      </div>


      {/* ✅ Show Hint */}
      {showHint && (
        <p className="text-blue-600 font-medium mb-2">💡 Hint: {hint}</p>
      )}

      {/* Result */}
      {result !== null && (
        <p
          className={`text-base font-medium ${
            result ? "text-green-600" : "text-red-600"
          }`}
        >
          {result ? "✅ Correct!" : "❌ Wrong. Try again or show solution."}
        </p>
      )}
    </div>
  );
}
