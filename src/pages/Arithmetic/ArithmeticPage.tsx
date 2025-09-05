import QuestionAnswerLayout from '@/components/layout/QuestionAnswerLayout'
import ArrScaleQuiz from './components/ArrScaleQuiz'
import ArrFill from './components/ArrFill'
import { Button } from '@/components/ui/button'
import { IoIosArrowForward, IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { useMemo, useState } from 'react'
import { ChevronLeft } from 'lucide-react'

// Your data (kept exactly as you shared)
const QUESTIONS_DATA = [
    {
        id: 1,
        type: "math1",
        group: "4",
        subject: "Arithmetic",
        category: "Basic",
        level: "Easy",
        metadata: {
            question: "Continue counting in jumps of 10.",
            steps: 10,
            answer1: 12,
            count: 10,
            defaultValue: 3,
            hint: "Just add 10 with every number",
        }
    },
    {
        id: 2,
        type: "math2",
        group: "4",
        subject: "Arithmetic",
        category: "Basic",
        level: "Medium",
        metadata: {
            question: "Which numbers are there in this scale?",
            options: [12, 50, 34, 43, 63, 89],
            hint: "Just count 1 by 1 of the scale line and type at the boxes",
        }
    },
    {
        id: 3,
        type: "math3",
        group: "4",
        subject: "Arithmetic",
        category: "Basic",
        level: "Advance",
        metadata: {
            question: "Which numbers are there in this boxes? Connect with the scale line.",
            options: [12, 50, 34, 43, 63, 89],
            hint: "Just count 1 by 1 of the scale line and connect with the scale line",
        }
    },
    {
        id: 4,
        type: "math3",
        group: "4",
        subject: "Arithmetic",
        category: "Basic",
        level: "Advance",
        metadata: {
            question: "Which numbers are there in this boxes? Connect with the scale line.",
            options: [28, 30, 64, 13, 93, 79],
            hint: "Just count 1 by 1 of the scale line and connect with the scale line",
        }
    },
    {
        id: 5,
        type: "math1",
        group: "4",
        subject: "Arithmetic",
        category: "Basic",
        level: "Easy",
        metadata: {
            question: "Continue counting in jumps of 10.",
            steps: 10,
            answer1: 42,
            count: 10,
            defaultValue: 2,
            hint: "Just add 10 with every number",
        }
    },
]

export default function ArithmeticPage() {
    const [question, setQuestion] = useState(0)

    const isFirst = question === 0
    const isLast = question === QUESTIONS_DATA.length - 1
    const q = QUESTIONS_DATA[question]

    const handlePrev = () => setQuestion((prev) => Math.max(prev - 1, 0))
    const handleNext = () => setQuestion((prev) => Math.min(prev + 1, QUESTIONS_DATA.length - 1))

    // Render by type
    const content = useMemo(() => {
        if (!q) return null

        switch (q.type) {
            case 'math1': {
                const start = q.metadata.answer1 ?? 10
                const step = q.metadata.steps ?? 10
                const count = q.metadata.count ?? 10
                const prefilled = q.metadata.defaultValue ?? 2

                return (
                    <ArrFill
                        key={q.id}
                        rows={[{ start, step, maxLength: count, prefilledCount: prefilled, inputMaxLength: 3 }]}
                    />
                )
            }
            case 'math2': {
                const opts = q.metadata.options ?? []
                const presetLineNums = opts.map((lineNum: number, i: number) => ({ dotIndex: i, lineNum }))

                return (
                    <ArrScaleQuiz
                        key={q.id}
                        mode="preConnected"
                        presetLineNums={presetLineNums}
                        dotCount={opts.length}
                    />
                )
            }
            case 'math3': {
                const opts = q.metadata.options ?? []
                return (
                    <ArrScaleQuiz
                        key={q.id}
                        mode="preFilledBoxes"
                        presetBoxNumbers={opts}
                        dotCount={opts.length}
                    />
                )
            }
            default:
                return null
        }
    }, [q])

    // Difficulty pills highlight
    const level = q?.level ?? 'Easy'
    const pillBase = 'py-2 px-5 rounded-lg font-semibold'
    const active = 'bg-primary text-white'
    const inactive = 'bg-transparent text-black'

    return (
        <QuestionAnswerLayout>
            {/* Top bar */}
            <div className='flex items-center justify-between mb-5'>
                <div className='flex items-center gap-3'>
                    <Button
                        onClick={handlePrev}
                        disabled={isFirst}
                        className='rounded-2xl py-7 pl-2 font-bold text-xl disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        <div className='size-10 bg-white text-black rounded-2xl flex items-center justify-center'>
                            <IoMdArrowRoundBack size={50} className='text-5xl' />
                        </div>
                        Back
                    </Button>

                    {/* Breadcrumbs from data */}
                    <div className='text-primary flex gap-3 items-center'>
                        <p>Group {q.group}</p>
                        <IoIosArrowForward />
                        <p>{q.subject}</p>
                        <IoIosArrowForward />
                        <p>{q.category}</p>
                    </div>
                </div>

                {/* Difficulty pills */}
                <div className='bg-white p-1 rounded-lg flex items-center'>
                    <div className={`${pillBase} ${level === 'Easy' ? active : inactive}`}>Easy</div>
                    <div className={`${pillBase} ${level === 'Medium' ? active : inactive}`}>Medium</div>
                    <div className={`${pillBase} ${level === 'Advance' ? active : inactive}`}>Advance</div>
                </div>
            </div>



            {/* Body */}
            <div key={q.id} className='p-10 rounded-[30px]  w-full h-full border flex flex-col bg-white'>
                {/* Question text */}
                <div className="mb-4 text-lg font-semibold">
                    <h1 className='font-bold'>Question {question + 1}</h1>
                    <p>{q.metadata.question}</p>
                </div>
                {content}


                {/* Footer actions */}
                <div className='flex items-center justify-between mt-6'>
                    <div>
                        {/* fixed stray bracket in className */}
                        <Button className='mt-5 py-6 bg-[#e8edff] hover:bg-[#e8edff]/70 text-black border'>
                            <ChevronLeft className="mr-2" /> Switch Category
                        </Button>
                    </div>

                    <Button
                        onClick={handleNext}
                        disabled={isLast}
                        className='rounded-2xl py-7 pr-2 font-bold text-xl disabled:opacity-60 disabled:cursor-not-allowed'
                    >
                        Next
                        <div className='size-10 bg-black rounded-2xl flex items-center justify-center ml-2'>
                            <IoMdArrowRoundForward size={50} className='text-5xl' />
                        </div>
                    </Button>
                </div>
            </div>

        </QuestionAnswerLayout>
    )
}
