import React, { useState, useEffect } from "react"
import Check from "@/components/common/Check"
import Hint from "@/components/common/Hint"
import Controllers from "@/components/common/Controllers"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { IoMdArrowRoundBack } from "react-icons/io"

interface Question {
  id: number
  question: string
  options: string[]
  answer: string[]
  hint?: string
}

interface LanguagePageProps {
  data?: Question[]
}

export default function LanguagePage({ data: initialData = [] }: LanguagePageProps) {
  const [data, setData] = useState<Question[]>(initialData)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [id: number]: string }>({})
  const [status, setStatus] = useState<"match" | "wrong" | "">("")
  const [showSolution, setShowSolution] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (initialData.length > 0) {
      setData(initialData)
      setLoading(false)
    } else {
      setTimeout(() => {
        const sampleData: Question[] = [
          {
            id: 0,
            question: "Which fruit is red?",
            options: ["Apple", "Banana",],
            answer: ["Apple"],
            hint: "It is the most common red fruit you eat daily."
          },
          {
            id: 1,
            question: "Which fruit is yellow?",
            options: ["Dog", "Banana", "Cat", "Apple"],
            answer: ["Banana"],
            hint: "It is long and yellow, often eaten by monkeys."
          },
          {
            id: 2,
            question: "Which animal says meow?",
            options: ["Dog", "Cat", "Apple", "Banana"],
            answer: ["Cat"],
            hint: "It is a small domestic animal that purrs."
          },
          {
            id: 3,
            question: "Which animal says woof?",
            options: ["Dog", "Cat", "Banana", "Apple"],
            answer: ["Dog"],
            hint: "It is a loyal pet and barks loudly."
          }
        ]
        setData(sampleData)
        setLoading(false)
      }, 1000)
    }
  }, [initialData])

  if (loading) return <div className="text-center text-xl mt-10">Loading questions...</div>
  if (data.length === 0) return <div className="text-center text-xl mt-10">No questions available</div>

  const currentQuestion = data[currentIndex]
  const selected = answers[currentQuestion.id] || ""

  const selectOption = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
    setShowSolution(false)
    setStatus("")
  }

  const handleCheck = () => {
    if (!selected) return
    setStatus(currentQuestion.answer.includes(selected) ? "match" : "wrong")
  }

  const handleShowSolution = () => {
    setShowSolution(true)
    setStatus("")
  }

  const handleShowHint = () => setShowHint(!showHint)

  const goNext = () => {
    if (currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1)
    setShowSolution(false)
    setShowHint(false)
    setStatus("")
  }

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
    setShowSolution(false)
    setShowHint(false)
    setStatus("")
  }

  const summary =
    status === "match"
      ? { text: "✅ Correct!", color: "text-green-600", bgColor: "bg-green-100", borderColor: "border-green-600" }
      : status === "wrong"
      ? { text: "❌ Wrong answer!", color: "text-red-600", bgColor: "bg-red-100", borderColor: "border-red-600" }
      : null

  return (
    <div className="relative flex justify-center items-start p-10">
      {/* Back button */}
      <Button
        onClick={goPrev}
        disabled={currentIndex === 0}
        variant="default"
        className="absolute top-6 left-10"
      >
        ← Back
      </Button>





      {/* Main container */}
      <div className="w-full flex flex-col gap-6">
       

        {/* Question card */}
        <div className="bg-white mt-10 shadow-lg rounded-2xl p-6 flex flex-col gap-6">
          {/* Question text */}
          <p className="text-xl font-semibold text-gray-700">
            Q{currentIndex + 1}. {currentQuestion.question}
          </p>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map(opt => {
              const isSelected = selected === opt
              const isCorrect = showSolution && currentQuestion.answer.includes(opt)
              const isWrong = showSolution && !currentQuestion.answer.includes(opt) && isSelected

              return (
                <Button
                  key={opt}
                  onClick={() => selectOption(opt)}
                  className={`w-full px-4 py-4 rounded-lg border text-gray-700 font-medium
                    ${isSelected ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"}
                    ${isCorrect ? "bg-green-100 border-green-500 text-green-700" : ""}
                    ${isWrong ? "bg-red-100 border-red-500 text-red-700" : ""}`}
                >
                  {opt}
                </Button>
              )
            })}
          </div>

          {/* Controllers: Check, Show Solution, Hint */}
          <Controllers
            handleCheck={handleCheck}
            handleShowSolution={handleShowSolution}
            handleShowHint={handleShowHint}
          />

          {/* Show result and hint */}
          {summary && <Check summary={summary} />}
          {showHint && <Hint hint={currentQuestion.hint || ""} />}

<div className="flex items-center justify-between mt-6">
                 <div>
                        <Button className="mt-5 py-6 bg-[#e8edff] hover:bg-[#e8edff]/70 text-black border">
                            <ChevronLeft className="mr-2" /> Switch Category
                        </Button>
                    </div>

                            <div className="flex justify-end">
            <Button
              onClick={goNext}
              disabled={currentIndex === data.length - 1}
              className="px-6 py-3 text-white rounded shadow disabled:opacity-50"
            >
              Next →
            </Button>
          </div>
</div>



      
  

          {/* <p className="mt-2 text-gray-500 text-center">
            Question {currentIndex + 1} of {data.length}
          </p> */}


        </div>
      </div>
    </div>
  )
}
