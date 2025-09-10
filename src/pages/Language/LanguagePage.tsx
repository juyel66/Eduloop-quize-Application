import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { IoIosArrowForward, IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

// Static Grammar Questions
const GRAMMAR_QUESTIONS = [
  {
    id: 1,
    group: "5",
    subject: "Grammar",
    category: "Noun",
    level: "Advanced",
    metadata: {
      question: "Which word is the noun in: 'The tall boy smiled.'",
      options: ["smiled", "boy", "the", "tall"],
      answer: "boy",
      image: "https://placehold.co/150x200/A0DEE9/FFFFFF?text=Boy+Character",
    },
  },
  {
    id: 2,
    group: "5",
    subject: "Grammar",
    category: "Verb",
    level: "Medium",
    metadata: {
      question: "What is the verb in: 'She quickly ran home.'",
      options: ["She", "quickly", "ran", "home"],
      answer: "ran",
      image: "https://placehold.co/150x200/A0DEE9/FFFFFF?text=Girl+Character",
    },
  },
  {
    id: 3,
    group: "5",
    subject: "Grammar",
    category: "Verb",
    level: "Medium",
    metadata: {
      question: "What is the verb in: 'She quickly ran home.'",
      options: ["She", "quickly", "ran", "home"],
      answer: "ran",
      image: "https://placehold.co/150x200/A0DEE9/FFFFFF?text=Girl+Character",
    },
  },
  {
    id: 4,
    group: "5",
    subject: "Grammar",
    category: "Verb",
    level: "Medium",
    metadata: {
      question: "What is the verb in: 'She quickly ran home.'",
      options: ["She", "quickly", "ran", "home"],
      answer: "ran",
      image: "https://placehold.co/150x200/A0DEE9/FFFFFF?text=Girl+Character",
    },
  },
  {
    id: 5,
    group: "5",
    subject: "Grammar",
    category: "Verb",
    level: "Medium",
    metadata: {
      question: "What is the verb in: 'She quickly ran home.'",
      options: ["She", "quickly", "ran", "home"],
      answer: "ran",
      image: "https://placehold.co/150x200/A0DEE9/FFFFFF?text=Girl+Character",
    },
  },
];

const QuizApp = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const isFirst = questionIndex === 0;
  const isLast = questionIndex === GRAMMAR_QUESTIONS.length - 1;
  const currentQuestion = GRAMMAR_QUESTIONS[questionIndex];

  const handlePrev = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setQuestionIndex((prev) => Math.max(prev - 1, 0));
  };
  
  const handleNext = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setQuestionIndex((prev) => Math.min(prev + 1, GRAMMAR_QUESTIONS.length - 1));
  };

  const handleAnswerClick = (option) => {
    if (!isSubmitted) {
      setSelectedAnswer(option);
    }
  };

  const handleCheck = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
      if (selectedAnswer === currentQuestion.metadata.answer) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }
  };

  const level = currentQuestion?.level ?? "Easy";
  const pillBase = "py-2 px-5 rounded-full font-semibold transition-colors duration-200";
  const activePill = "bg-orange-500 text-white";
  const inactivePill = "bg-white text-gray-500";

  return (
    <div className="min-h-screen flex flex-col p-8 bg-[#f5f5f5] font-inter">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="flex items-center gap-2 text-gray-700 font-semibold p-2 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="size-12 flex items-center justify-center">
              <ChevronLeft className="size-8" />
            </div>
            Back
          </button>

          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center text-sm gap-2 text-gray-500">
            <span className="text-gray-700 font-medium">Group {currentQuestion.group}</span>
            <IoIosArrowForward />
            <span className="text-gray-700 font-medium">{currentQuestion.subject}</span>
            <IoIosArrowForward />
            <span className="text-gray-700 font-medium">{currentQuestion.category}</span>
          </div>
        </div>

        {/* Difficulty Pills */}
        <div className="bg-white p-1 rounded-full shadow-md flex items-center">
          <div className={`${pillBase} ${level === "Easy" ? activePill : inactivePill}`}>Easy</div>
          <div className={`${pillBase} ${level === "Medium" ? activePill : inactivePill}`}>Medium</div>
          <div className={`${pillBase} ${level === "Advanced" ? activePill : inactivePill}`}>Advanced</div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
            {/* Timer icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer text-orange-600"><path d="M10 2h4"/><path d="M12 14v-4"/><path d="M4 13a8 8 0 1 0 16 0 8 8 0 0 0-16 0"/></svg>
          </div>
          <span>01:11</span>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="flex-1 flex items-center justify-center">
        <div key={currentQuestion.id} className="p-12 rounded-[30px] w-full max-w-4xl border border-gray-200 shadow-xl flex bg-white">
          {/* Left Column - Questions and Options */}
          <div className="flex-1 pr-12 flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-xl font-bold">Question {questionIndex + 1}</h1>
              <p className="text-2xl text-gray-700 font-semibold">{currentQuestion.metadata.question}</p>
            </div>
            
            {/* Options */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {currentQuestion.metadata.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerClick(opt)}
                  className={`
                    w-full py-6 px-4 text-left text-lg font-medium transition-colors duration-200
                    border rounded-lg shadow-sm
                    ${
                      isSubmitted 
                        ? (opt === currentQuestion.metadata.answer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : (selectedAnswer === opt ? 'bg-red-100 border-red-500 text-red-800' : 'bg-gray-100 border-gray-300 text-gray-600'))
                        : (selectedAnswer === opt ? 'bg-indigo-100 border-indigo-500 text-indigo-800' : 'bg-white border-gray-300 hover:border-indigo-400')
                    }
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 py-4 text-lg font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-200" onClick={handleCheck}>
                Check
              </button>
              <button className="flex-1 py-4 text-lg font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                Hint
              </button>
              <button className="flex-1 py-4 text-lg font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                Show Solution
              </button>
            </div>
            
            {/* Switch Category */}
            <div className="mt-8">
              <button className="text-gray-500 font-semibold flex items-center gap-2 hover:text-gray-700 transition-colors duration-200">
                <ChevronLeft size={20} />
                Switch Category
              </button>
            </div>
          </div>
          
          {/* Right Column - Character & Next Button */}
          <div className="flex flex-col items-center justify-end">
            {/* The character image is not present in this design */}
            
            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={isLast}
              className="mt-8 px-6 py-3 rounded-lg flex items-center gap-2 bg-orange-500 text-white font-bold text-xl shadow-lg transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Next
              <IoMdArrowRoundForward size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto pt-8 flex items-center justify-between text-gray-500 text-xs">
        <span>© Extra Handen --- School-safe. No personal data</span>
        <a href="#" className="underline">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default QuizApp;