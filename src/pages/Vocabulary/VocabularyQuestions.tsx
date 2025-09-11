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
  group?: string;
  subject?: string;
  category?: string;
  level?: string;
  description?: string;
}


const question_data = [
  {
    id: 4,
    type: "readingMultipleChoice",
    group: "1",
    subject: "Language",
    category: "English",
    level: "Easy",
    metadata: {
      question: "Which of the following is a vowel in English?",
      options: ["B", "C", "A", "D"],
      correctAnswer: ["A"],
      hint: "Think about letters that are not consonants.",
    },
  },
  {
    id: 5,
    type: "readingMultipleChoice",
    group: "2",
    subject: "Language",
    category: "Spanish",
    level: "Medium",
    metadata: {
      question: "What does 'Hola' mean in Spanish?",
      options: ["Goodbye", "Hello", "Thanks", "Yes"],
      correctAnswer: ["Hello"],
      hint: "It’s a common greeting.",
    },
  },
  {
    id: 6,
    type: "readingMultipleChoice",
    group: "3",
    subject: "Language",
    category: "French",
    level: "Easy",
    metadata: {
      question: "What is the French word for 'apple'?",
      options: ["Pomme", "Poire", "Orange", "Banane"],
      correctAnswer: ["Pomme"],
      hint: "Sounds like 'Pom'.",
    },
  },
  {
    id: 7,
    type: "readingMultipleChoice",
    group: "4",
    subject: "Language",
    category: "German",
    level: "Advance",
    metadata: {
      description: "In German, nouns are always capitalized.",
      question: "Which of the following is correctly written in German?",
      options: ["hund", "Katze", "apfel", "vogel"],
      correctAnswer: ["Katze"],
      hint: "Nouns always start with a capital letter.",
    },
  },
  {
    id: 8,
    type: "readingMultipleChoice",
    group: "5",
    subject: "Language",
    category: "Bangla",
    level: "Medium",
    metadata: {
      question: "What is the Bangla word for 'Book'?",
      options: ["Kagoj", "Boi", "Khata", "Lekha"],
      correctAnswer: ["Boi"],
      hint: "It’s the common word used in schools.",
    },
  },
];

export default function VocabularyQuestions() {
  const [data, setData] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [id: number]: string | string[] }>(
    {}
  );
  const [status, setStatus] = useState<"match" | "wrong" | "">("");
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // useEffect এ data set
  useEffect(() => {
    const formatted: Question[] = question_data.map((q) => ({
      id: q.id,
      type: "mcq",
      question: q.metadata.question,
      options: q.metadata.options,
      answer: q.metadata.correctAnswer,
      hint: q.metadata.hint,
      group: q.group,
      subject: q.subject,
      category: q.category,
      level: q.level,
      description: q.metadata.description,
    }));
    setData(formatted);
  }, []);

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
          .includes((selected as string).toLowerCase())
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
          text: " Correct!",
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
