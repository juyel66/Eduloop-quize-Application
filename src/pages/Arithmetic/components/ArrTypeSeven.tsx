import React, { useState } from "react"
import Controllers from "@/components/common/Controllers"
import Check from "@/components/common/Check"
import Hint from "@/components/common/Hint"

export default function ArrTypeSeven({ data, hint }: any) {
    const [answers, setAnswers] = useState<{ [id: number]: string[] }>({})
    const [status, setStatus] = useState<"match" | "wrong" | "">("")
    const [showSolution, setShowSolution] = useState(false)
    const [wrongAnswers, setWrongAnswers] = useState<{ [id: number]: string[] }>({})
    const [correctAnswers, setCorrectAnswers] = useState<{ [id: number]: string[] }>({})
    const [showHint, setShowHint] = useState(false)

    const handleShowHint = () => {
        setShowHint(!showHint)
    }



    const arraysEqual = (a: string[], b: string[]) => {
        const sortedA = [...a].sort()
        const sortedB = [...b].sort()
        return (
            sortedA.length === sortedB.length &&
            sortedA.every((val, i) => val === sortedB[i])
        )
    }

    const handleCheckAll = () => {
        let allCorrect = true
        let wrongMap: { [id: number]: string[] } = {}
        let correctMap: { [id: number]: string[] } = {}

        data.forEach((q: any) => {
            const selected = answers[q.id] || []

            // ✅ store correct selections
            correctMap[q.id] = selected.filter((p) => q.answer.includes(p))

            // ❌ store wrong selections
            wrongMap[q.id] = selected.filter((p) => !q.answer.includes(p))

            // check overall correctness
            if (!arraysEqual(selected, q.answer)) {
                allCorrect = false
            }
        })

        setCorrectAnswers(correctMap)
        setWrongAnswers(wrongMap)

        if (allCorrect) {
            setStatus("match")
        } else {
            setStatus("wrong")
        }
    }

    const handleShowSolutionAll = () => {
        let newAnswers: { [id: number]: string[] } = {}
        data.forEach((q: any) => {
            newAnswers[q.id] = [...q.answer]
        })
        setAnswers(newAnswers)
        setShowSolution(true)

        // reset correctness states
        setWrongAnswers({})
        setCorrectAnswers({})
        setStatus("") // ✅ no summary shown
    }


    const toggleAnswer = (qid: number, p: string) => {
        setAnswers((prev) => {
            const current = prev[qid] || []
            return {
                ...prev,
                [qid]: current.includes(p)
                    ? current.filter((x) => x !== p)
                    : [...current, p],
            }
        })
        setShowSolution(false)
    }

    const summary =
        status === "match"
            ? {
                text: "🎉 All Correct! Great job",
                color: "text-green-600",
                bgColor: "bg-green-100",
                borderColor: "border-green-600",
            }
            : status === "wrong"
                ? {
                    text: "❌ Some answers are wrong. Check again.",
                    color: "text-red-600",
                    bgColor: "bg-red-100",
                    borderColor: "border-red-600",
                }
                : null

    return (
        <div>
            {/* show questions side by side */}
            <div className="grid grid-cols-3 gap-6">
                {data.map((q: any) => {
                    const selected = answers[q.id] || []
                    const wrongSelected = wrongAnswers[q.id] || []
                    const correctSelected = correctAnswers[q.id] || []

                    return (
                        <div
                            key={q.id}
                            className="p-5 border rounded-lg bg-white flex flex-col items-center"
                        >
                            {/* digits + arrow */}
                            <div className="flex relative items-center gap-5">
                                <div className="absolute left-10 top-14">
                                    <div className="relative">
                                        <div className="w-5 absolute top-0 left-0 h-0.5 rotate-45 bg-primary"></div>
                                        <div className="w-5 h-0.5 absolute bottom-3 left-0 -rotate-45 bg-primary"></div>
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    value={q.digits[0]}
                                    className="size-10 border-2 !border-primary text-2xl font-semibold text-center"
                                    readOnly
                                />
                                <div className="flex flex-col gap-5">
                                    <input
                                        type="text"
                                        value={q.digits[1]}
                                        className="size-10 border-2 !border-primary text-2xl font-semibold text-center"
                                        readOnly
                                    />
                                    <input
                                        type="text"
                                        value={q.digits[2]}
                                        className="size-10 border-2 !border-primary text-2xl font-semibold text-center"
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* options */}
                            <div className="space-y-2 mt-5 w-full">
                                {q.pattern.map((p: any, i: any) => {
                                    const isCorrect = q.answer.includes(p)
                                    const isSelected = selected.includes(p)
                                    const isWrongSelected = wrongSelected.includes(p)
                                    const isCorrectSelected = correctSelected.includes(p)

                                    const optionClasses =
                                        showSolution && isCorrect
                                            ? "bg-green-100 border-green-600 text-green-700"
                                            : isWrongSelected
                                                ? "bg-red-100 border-red-600 text-red-700"
                                                : isCorrectSelected
                                                    ? "bg-green-100 border-green-600 text-green-700"
                                                    : isSelected
                                                        ? "bg-primary/10 border-primary"
                                                        : ""

                                    return (
                                        <div
                                            key={i}
                                            onClick={() => toggleAnswer(q.id, p)}
                                            className={`flex items-center gap-2 cursor-pointer border rounded p-2 ${optionClasses}`}
                                        >
                                            {/* custom checkbox */}
                                            <div
                                                className={`w-5 h-5 flex items-center justify-center border-2 rounded 
                        ${isSelected
                                                        ? "bg-primary border-primary"
                                                        : "border-gray-400"
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <svg
                                                        className="w-4 h-4 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 font-semibold">
                                                {p}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* one controller at bottom */}
            <Controllers
                handleCheck={handleCheckAll}
                handleShowSolution={handleShowSolutionAll}
                handleShowHint={handleShowHint}
            />
            {
                showHint && <Hint hint={hint} />
            }
            <Check summary={summary} />
        </div>
    )
}
