"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FillBlanksProps {
  question: string;
  correctAnswer: string;
  description: string;
  hint: string;
}

export default function ReadingFillBlanks({
  question,
  correctAnswer,
  description,
  hint,
}: FillBlanksProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Try again.");
    }
  };

  return (
    <div className="w-full bg-[#fdeedc] rounded-xl p-6 shadow-md">
      {/* Passage */}
      <p className="bg-[#e9543d] text-white rounded-lg p-4 mb-6">{description}</p>

      {/* Question */}
      <h2 className="text-lg font-semibold mb-4">{question}</h2>

      {/* Input field */}
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="border p-2 rounded w-1/2 mb-4"
        placeholder="Type your answer..."
      />

      {/* Feedback */}
      {feedback && <p className="mb-2 font-medium">{feedback}</p>}
      {showHint && <p className="text-blue-600 mb-2">💡 Hint: {hint}</p>}
      {showSolution && (
        <p className="text-green-600 mb-2">
          ✅ Correct Answer: <b>{correctAnswer}</b>
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <Button onClick={checkAnswer} className="bg-[#dbeafe] hover:bg-[#dbeafe]/70 text-black border">
          Check
        </Button>
        <Button onClick={() => setShowHint(true)} className="bg-[#ffedd5] hover:bg-[#ffedd5]/70 text-black border">
          Hint
        </Button>
        <Button
          onClick={() => setShowSolution(true)}
          className="bg-[#f3e8ff] hover:bg-[#f3e8ff]/70 text-black border"
        >
          Show Solution
        </Button>
      </div>
    </div>
  );
}
