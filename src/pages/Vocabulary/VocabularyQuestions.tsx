import React, { useState, useEffect } from "react";
import Check from "@/components/common/Check";
import Hint from "@/components/common/Hint";
import Controllers from "@/components/common/Controllers";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

interface Question {
  id: number;
  type: "mcq" | "fill" | "verb" | "short";
  question: string;
  options: string[];
  answer: string[];
  hint?: string;
}

interface LanguagePageProps {
  data?: Question[];
}

export default function VocabularyQuestions({
  data: initialData = [],
}: LanguagePageProps) {
  const [data, setData] = useState<Question[]>(initialData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [id: number]: string | string[] }>(
    {}
  );
  const [status, setStatus] = useState<"match" | "wrong" | "">("");
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialData.length > 0) {
      setData(initialData);
      setLoading(false);
    } else {
      setTimeout(() => {
        const sampleData: Question[] = [
          {
            id: 0,
            type: "mcq",
            question: "Which fruit is red?",
            options: ["Apple", "Banana", "Mango", "Orange"],
            answer: ["Apple"],
            hint: "It is the most common red fruit you eat daily.",
          },
          {
            id: 1,
            type: "fill",
            question: "Fill in the blank: The capital of Bangladesh is _____.",
            options: [],
            answer: ["Dhaka"],
            hint: "It starts with 'D'.",
          },
          {
            id: 2,
            type: "verb",
            question: "Right form of verb: He ____ (go) to school every day.",
            options: [],
            answer: ["goes"],
            hint: "Think about present simple tense.",
          },
          {
            id: 3,
            type: "short",
            question: "Write two programming languages you know:",
            options: [],
            answer: ["JavaScript", "Python"],
            hint: "Think about web or general purpose languages.",
          },
        ];
        setData(sampleData);
        setLoading(false);
      }, 1000);
    }
  }, [initialData]);

  if (loading)
    return (
      <div className="text-center text-xl mt-10">Loading questions...</div>
    );
  if (data.length === 0)
    return (
      <div className="text-center text-xl mt-10">No questions available</div>
    );

  const currentQuestion = data[currentIndex];
  const selected = answers[currentQuestion.id] || "";

  const selectOption = (value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setShowSolution(false);
    setStatus("");
  };

  const handleCheck = () => {
    if (!selected) return;

    if (Array.isArray(selected)) {
      const correct = currentQuestion.answer.every((ans) =>
        selected.some((s) => s.toLowerCase() === ans.toLowerCase())
      );
      setStatus(correct ? "match" : "wrong");
    } else {
      setStatus(
        currentQuestion.answer
          .map((a) => a.toLowerCase())
          .includes(selected.toLowerCase())
          ? "match"
          : "wrong"
      );
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setStatus("");
  };

  const handleShowHint = () => setShowHint(!showHint);

  const goNext = () => {
    if (currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1);
    setShowSolution(false);
    setShowHint(false);
    setStatus("");
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    setShowSolution(false);
    setShowHint(false);
    setStatus("");
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === data.length - 1;

  const summary =
    status === "match"
      ? {
          text: "✅ Correct!",
          color: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-600",
        }
      : status === "wrong"
      ? {
          text: "❌ Wrong answer!",
          color: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-600",
        }
      : null;

  return (
    <div className="p-10">
      {/* Back button (Top Left) */}

      {/* <Button
        onClick={goPrev}
        disabled={isFirst}
        className="rounded-2xl py-7 px-6 font-bold text-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center"
      >
        <div className="size-10 bg-black rounded-2xl flex items-center justify-center mr-2">
          <IoMdArrowRoundBack size={30} className="text-white" />
        </div>
        Back
      </Button> */}

      <Button
        onClick={goPrev}
        disabled={isFirst}
        className="rounded-2xl py-7 pl-2 font-bold text-xl disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <div className="size-10 bg-white text-black rounded-2xl flex items-center justify-center">
          <IoMdArrowRoundBack size={50} className="text-5xl" />
        </div>
        Back
      </Button>

      {/* Main container */}
      <div className="w-full flex flex-col gap-6">
        {/* Question card */}
        <div className="bg-white mt-10 shadow-lg rounded-2xl p-6 flex flex-col gap-6">
          {/* Question text */}
          <p className="text-xl font-semibold text-gray-700">
            Q{currentIndex + 1}. {currentQuestion.question}
          </p>

          {/* MCQ Options */}
          {currentQuestion.type === "mcq" && (
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((opt) => {
                const isSelected = selected === opt;
                const isCorrect =
                  showSolution && currentQuestion.answer.includes(opt);
                const isWrong =
                  showSolution &&
                  !currentQuestion.answer.includes(opt) &&
                  isSelected;

                return (
                  <Button
                    key={opt}
                    onClick={() => selectOption(opt)}
                    className={`w-full px-4 py-4 rounded-lg border text-gray-700 font-medium
                      ${
                        isSelected
                          ? "bg-blue-100 border-blue-400"
                          : "bg-white border-gray-300"
                      }
                      ${
                        isCorrect
                          ? "bg-green-100 border-green-500 text-green-700"
                          : ""
                      }
                      ${
                        isWrong ? "bg-red-100 border-red-500 text-red-700" : ""
                      }`}
                  >
                    {opt}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Fill in the blanks / Verb Input */}
          {(currentQuestion.type === "fill" ||
            currentQuestion.type === "verb") && (
            <input
              type="text"
              value={selected as string}
              onChange={(e) => selectOption(e.target.value)}
              placeholder="Type your answer..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          {/* Short Question (two inputs with bottom border only) */}
          {currentQuestion.type === "short" && (
            <div className="flex flex-col gap-4">
              {[0, 1].map((i) => (
                <input
                  key={i}
                  type="text"
                  value={Array.isArray(selected) ? selected[i] || "" : ""}
                  onChange={(e) => {
                    const updated = Array.isArray(selected)
                      ? [...selected]
                      : [];
                    updated[i] = e.target.value;
                    selectOption(updated);
                  }}
                  placeholder={`Answer ${i + 1}`}
                  className="w-full border-b-2 border-gray-400 focus:border-blue-500 outline-none px-2 py-2"
                />
              ))}
            </div>
          )}

          {/* Controllers: Inline buttons */}
          <div className="flex gap-4 justify-start mt-4">
            <Controllers
              handleCheck={handleCheck}
              handleShowSolution={handleShowSolution}
              handleShowHint={handleShowHint}
            />
          </div>

          {/* Show result and hint */}
          {summary && <Check summary={summary} />}
          {showHint && <Hint hint={currentQuestion.hint || ""} />}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6">
            <div>
              <Button className="mt-5 py-6 bg-[#e8edff] hover:bg-[#e8edff]/70 text-black border">
                <ChevronLeft className="mr-2" /> Switch Category
              </Button>
            </div>

            <Button
              onClick={goNext}
              disabled={isLast}
              className="rounded-2xl py-7 pr-2 font-bold text-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Next
              <div className="size-10 bg-black rounded-2xl flex items-center justify-center ml-2">
                <IoMdArrowRoundForward size={50} className="text-5xl" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
