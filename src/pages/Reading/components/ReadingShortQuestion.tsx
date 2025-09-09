"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
interface ReadingShortQuestionProps {
  question: string;
  correctAnswer: string;
  description: string;
  hint: string;
}

const ReadingShortQuestion = ({
  question,
  correctAnswer,
  description,
  hint,
}: ReadingShortQuestionProps) => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const [showHint, setShowHint] = useState(false);

  const handleCheck = () => {
    if (!inputValue.trim()) return;
    setResult(
      inputValue.trim().toLowerCase() === correctAnswer.toLowerCase()
    );
  };

  const handleShowSolution = () => {
    setInputValue(correctAnswer);
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

      {/* Input */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full p-3 rounded-lg border border-gray-300 mb-4"
      />

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <Button
          onClick={handleCheck}
          className="bg-[#dbeafe] hover:bg-[#dbeafe]/70 text-black border p-2"
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
};

export default ReadingShortQuestion;
