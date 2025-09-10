import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IoIosArrowForward, IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io"
import { ChevronLeft } from "lucide-react"
import QuestionRenderer from "./components/QuestionRenderer"
import { QUESTIONS_DATA } from "./components/Questions"

export default function ArithmeticPage() {
    const [question, setQuestion] = useState(0)
    const q = QUESTIONS_DATA[question]

    const isFirst = question === 0
    const isLast = question === QUESTIONS_DATA.length - 1

    const handlePrev = () => setQuestion((prev) => Math.max(prev - 1, 0))
    const handleNext = () => setQuestion((prev) => Math.min(prev + 1, QUESTIONS_DATA.length - 1))

    // Difficulty pills highlight
    const level = q?.level ?? "Easy"
    const pillBase = "py-2 px-5 rounded-lg font-semibold"
    const active = "bg-primary text-white"
    const inactive = "bg-transparent text-black"

    return (
        <>
            {/* Top bar */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <Button
                        onClick={handlePrev}
                        disabled={isFirst}
                        className="rounded-2xl py-7 pl-2 font-bold text-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <div className="size-10 bg-white text-black rounded-2xl flex items-center justify-center">
                            <IoMdArrowRoundBack size={50} className="text-5xl" />
                        </div>
                        Back
                    </Button>

                    {/* Breadcrumbs from data */}
                    <div className="text-primary flex gap-3 items-center">
                        <p>Group {q.group}</p>
                        <IoIosArrowForward />
                        <p>{q.subject}</p>
                        <IoIosArrowForward />
                        <p>{q.category}</p>
                    </div>
                </div>

                {/* Difficulty pills */}
                <div className="bg-white p-1 rounded-lg flex items-center">
                    <div className={`${pillBase} ${level === "Easy" ? active : inactive}`}>Easy</div>
                    <div className={`${pillBase} ${level === "Medium" ? active : inactive}`}>Medium</div>
                    <div className={`${pillBase} ${level === "Advance" ? active : inactive}`}>Advance</div>
                </div>
            </div>

            {/* Body */}
            <div key={q.id} className="p-10 rounded-[30px] w-full h-full border flex flex-col bg-white">
                {/* Question text */}
                <div className="mb-4 text-lg font-semibold">
                    <h1 className="font-bold">Question {question + 1}</h1>
                    <p>{q.metadata.question}</p>
                </div>

                {/* Render question dynamically */}
                <QuestionRenderer q={q} />

                

                {/* Footer actions */}
                <div className="flex items-center justify-between mt-6">
                    <div>
                        <Button className="mt-5 py-6 bg-[#e8edff] hover:bg-[#e8edff]/70 text-black border">
                            <ChevronLeft className="mr-2" /> Switch Category
                        </Button>
                    </div>

                    <Button
                        onClick={handleNext}
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
        </>
    )
}
