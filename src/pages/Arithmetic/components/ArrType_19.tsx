import Check from "@/components/common/Check";
import Controllers from "@/components/common/Controllers";
import Hint from "@/components/common/Hint";
import React, { useState } from "react";

// Math problems data
const problemsJSON = [
  { id: 1, question: "5 x _ = 40", answer: 8 },
  { id: 2, question: "_ x 8 = 48", answer: 6 },
  { id: 3, question: "8 x 7 = _", answer: 56 },
  { id: 4, question: "_ x 7 = 42", answer: 6 },
  { id: 5, question: "_ x 9 = 45", answer: 5 },
  { id: 6, question: "6 x 9 = _", answer: 54 },
  { id: 7, question: "6 x 9 = _", answer: 54 },
  { id: 8, question: "_ x 9 = 45", answer: 5 },
  { id: 9, question: "7 x 6 = _", answer: 42 },
];

const ArrType_19 = ({ hint }) => {
  const [answers, setAnswers] = useState(Array(problemsJSON.length).fill(""));
  const [validation, setValidation] = useState(Array(problemsJSON.length).fill(null));
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [status, setStatus] = useState(null);

  const handleInputChange = (idx, val) => {
    const newAnswers = [...answers];
    newAnswers[idx] = val === "" ? "" : parseInt(val);
    setAnswers(newAnswers);
    setStatus(null);
  };

  const handleCheck = () => {
    const newValidation = problemsJSON.map((p, i) => p.answer === answers[i]);
    setValidation(newValidation);
    setStatus(newValidation.every(Boolean) ? "match" : "wrong");
  };

  const handleShowSolution = () => {
    setAnswers(problemsJSON.map((p) => p.answer));
    setValidation(Array(problemsJSON.length).fill(true));
    setStatus("match");
  };

  const handleShowHint = () => setShowHint((v) => !v);

  // summary for Check component
  const summary = status
    ? {
        text:
          status === "match"
            ? "🎉 Correct! Good Job"
            : "❌ Some answers are wrong",
        color: status === "match" ? "text-green-600" : "text-red-600",
      }
    : null;

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        Math Grid
      </h1>

      {/* Math problems grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl">
        {problemsJSON.map((p, idx) => (
          <div key={p.id} className="flex items-center justify-center gap-2 p-2 sm:p-4 md:p-6 rounded bg-white shadow">
            {p.question.split(" ").map((part, i) =>
              part === "_"
                ? (
                  <input
                    key={i}
                    type="number"
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-center rounded bg-no-repeat bg-center bg-contain ${validation[idx] === true ? "border-green-500" : validation[idx] === false ? "border-red-500" : "border-gray-300"}`}
                    style={{ backgroundImage: `url("/images/math.png")` }}
                    value={answers[idx]}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    readOnly={showSolution}
                  />
                )
                : <span key={i} className="text-base sm:text-lg md:text-xl font-medium">{part}</span>
            )}
          </div>
        ))}
      </div>

      {/* Controllers এক সাইডে (start এ) */}
      <div className="w-full max-w-5xl mt-8 flex justify-start">
        <Controllers
          handleCheck={handleCheck}
          handleShowSolution={handleShowSolution}
          handleShowHint={handleShowHint}
        />
      </div>

      {showHint && <Hint hint={hint} />}
      <Check summary={summary} />
    </div>
  );
};

export default ArrType_19;
