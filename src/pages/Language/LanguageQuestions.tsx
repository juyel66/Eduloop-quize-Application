import React, { useState, useEffect } from "react";
import Check from "@/components/common/Check";
import Hint from "@/components/common/Hint";
import Controllers from "@/components/common/Controllers";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

interface Question {
  id: number;
  type: "mcq";
  question: string;
  options: string[];
  answer: string[];
  hint?: string;
}

interface LanguagePageProps {
  data?: Question[];
}

export default function LanguageQuestions({
  data: initialData = [],
}: LanguagePageProps) {
  const [data, setData] = useState<Question[]>(initialData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [id: number]: string }>({});
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
            hint: "It is the most common red fruit.",
          },
          {
            id: 1,
            type: "mcq",
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: ["Mars"],
            hint: "It is the 4th planet from the Sun.",
          },
          {
            id: 2,
            type: "mcq",
            question: "Which language is used for web development?",
            options: ["Python", "C++", "JavaScript", "Assembly"],
            answer: ["JavaScript"],
            hint: "It runs in browsers.",
          },
          {
            id: 3,
            type: "mcq",
            question: "Which one is a mammal?",
            options: ["Shark", "Frog", "Dolphin", "Snake"],
            answer: ["Dolphin"],
            hint: "Lives in water but not a fish.",
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

  const selectOption = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setShowSolution(false);
    setStatus("");
  };

  const handleCheck = () => {
    if (!selected) return;

    setStatus(
      currentQuestion.answer
        .map((a) => a.toLowerCase())
        .includes(selected.toLowerCase())
        ? "match"
        : "wrong"
    );
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
      {/* Back button */}
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
        <div className="bg-white mt-10 shadow-lg rounded-2xl p-6 flex flex-col gap-6">
          {/* Question */}
          <p className="text-xl font-semibold text-gray-700">
            Q{currentIndex + 1}. {currentQuestion.question}
          </p>

          {/* MCQ Options */}
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
                    ${isWrong ? "bg-red-100 border-red-500 text-red-700" : ""}`}
                >
                  {opt}
                </Button>
              );
            })}
          </div>

          {/* Controllers */}
          <div className="flex gap-4 justify-start mt-4">
            <Controllers
              handleCheck={handleCheck}
              handleShowSolution={handleShowSolution}
              handleShowHint={handleShowHint}
            />
          </div>

          {/* Show result */}
          {summary && <Check summary={summary} />}
          {showHint && <Hint hint={currentQuestion.hint || ""} />}

          {/* Show Solution */}
          {showSolution && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50 text-gray-800">
              <p className="font-semibold">✅ Correct Answer:</p>
              <ul className="list-disc list-inside">
                {currentQuestion.answer.map((ans, idx) => (
                  <li key={idx}>{ans}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
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
