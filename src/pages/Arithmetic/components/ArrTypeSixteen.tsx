import Check from "@/components/common/Check";
import Controllers from "@/components/common/Controllers";
import Hint from "@/components/common/Hint";
import React, { useState } from "react";

const problemsJSON = [
  { id: 1, question: "3 + 7 + 2 =", answer: 12, type: "addition" },
  { id: 2, question: "1 + 5 + 9 =", answer: 15, type: "addition" },
  { id: 3, question: "4 + 3 + 6 =", answer: 13, type: "addition" },
  { id: 4, question: "5 + 5 + 4 =", answer: 14, type: "addition" },
  { id: 5, question: "8 + 3 + 2 =", answer: 13, type: "addition" },
  { id: 6, question: "6 + 6 + 4 =", answer: 16, type: "addition" },
];

const ArrTypeSixteen = () => {
  const [problems] = useState(problemsJSON);
  const [userAnswers, setUserAnswers] = useState(Array(problems.length).fill(NaN));
  const [validation, setValidation] = useState(Array(problems.length).fill(null));
  const [status, setStatus] = useState<"match" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value === "" ? NaN : parseInt(value);
    setUserAnswers(newAnswers);
    if (status) setStatus(null); // reset status on change
  };

  const handleCheck = () => {
    const newValidation = problems.map((p, i) => p.answer === userAnswers[i]);
    const allCorrect = newValidation.every(Boolean);
    setValidation(newValidation);
    setStatus(allCorrect ? "match" : "wrong");
    setShowSolution(false);
  };

  const handleShowHint = () => setShowHint((v) => !v);

  const handleShowSolution = () => {
    setShowSolution(true);
    setValidation(Array(problems.length).fill(true));
    setStatus(null);
  };

  const summary =
    status === "match"
      ? {
          text: "🎉 Correct! Good Job",
          color: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-600",
        }
      : status === "wrong"
      ? {
          text: "❌ Oops! Some answers are wrong",
          color: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-600",
        }
      : null;

  return (
    <>
      <div className="flex flex-col items-center justify-center font-sans text-gray-800">
        <div className="w-full rounded-xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Question 1</h1>
          <p className="text-lg text-gray-600 mb-4">
            First, draw a curve. Then solve the sum.
          </p>

          {/* Math Problems Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-16 mb-4">
            {problems.map((p, idx) => {
              const isCorrect = validation[idx];
              const inputClass =
                isCorrect === true
                  ? "border-green-600 text-green-600"
                  : isCorrect === false
                  ? "border-red-600 text-red-600"
                  : "border-gray-400 text-gray-900";

              return (
                <div
                  key={p.id}
                  className="flex items-end justify-between sm:justify-start sm:space-x-4"
                >
                  <span className="text-xl sm:text-2xl font-medium tracking-wide">
                    {p.question}
                  </span>
                  <input
                    type="number"
                    className={`w-24 sm:w-28 h-12 text-center text-xl font-semibold border-b-2 border-dashed focus:outline-none ${inputClass}`}
                    value={
                      showSolution
                        ? p.answer
                        : isNaN(userAnswers[idx])
                        ? ""
                        : userAnswers[idx]
                    }
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    readOnly={showSolution}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls, Hint and Check section */}
      <Controllers
        handleCheck={handleCheck}
        handleShowSolution={handleShowSolution}
        handleShowHint={handleShowHint}
      />
      {showHint && (
        <Hint hint="First, count the objects in the first group. Then, add the objects from the second and third groups to get the total number." />
      )}
      <Check summary={summary} />
    </>
  );
};

export default ArrTypeSixteen;
