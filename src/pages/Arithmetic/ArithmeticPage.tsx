import ArrScaleQuiz from './components/ArrScaleQuiz'
import ArrFill from './components/ArrFill'
import { Button } from '@/components/ui/button'
import { IoIosArrowForward, IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { useMemo, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import ArrNumMatch from './components/ArrNumMatch'
import ArrFirstAndSecondNumber from './components/ArrFirstAndSecondNumber'
import ArrNumAddMulti from './components/ArrNumAddMulti'
import ArrNumAddMultiOptions from './components/ArrNumAddMultiOptions'
import type { Question } from '@/types/ArithmeticType'

// Discriminated union types for arithmetic questions



const QUESTIONS_DATA: Question[] = [
    {
        "id": 9,
        "type": "math9",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the numbers that is multiplication of the top number",
            "method": "multiplication",
            "data": [
                { "id": 1, "result": 12, "answer": [[3, 4], [6, 2], [4, 3]] },
                { "id": 2, "result": 20, "answer": [[10, 2], [5, 4], [20, 1]] },
                { "id": 3, "result": 50, "answer": [[25, 2], [10, 5], [50, 1]] },
                { "id": 4, "result": 60, "answer": [[30, 2], [20, 3], [15, 4]] }
            ]
            ,
            "hint": "Follow this: 3 * ? = 12, 6 * ? = 12, 4 + ? = 12"
        }
    },
    {
        "id": 8,
        "type": "math8",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the numbers that is addition of the top number",
            "method": "addition",
            "data": [
                { "id": 1, "result": 10, "answer": [[5, 5], [8, 2], [6, 4]] },
                { "id": 2, "result": 20, "answer": [[10, 10], [18, 2], [15, 5]] },
                { "id": 3, "result": 50, "answer": [[25, 25], [30, 20], [42, 8]] },
                { "id": 4, "result": 60, "answer": [[30, 30], [40, 20], [49, 11]] }
            ],
            "hint": "Follow this: 5 + ? = 10, 8 + ? = 10, 6 + ? = 10"
        }
    },
    {
        "id": 7,
        "type": "math7",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the number that is multiplication of the top number",
            "method": "multiplication",
            "data": [
                { "id": 1, "result": 10, "option": 2, "answer": 8 },
                { "id": 2, "result": 20, "option": 10, "answer": 10 },
                { "id": 3, "result": 50, "option": 25, "answer": 25 },
                { "id": 4, "result": 60, "option": 20, "answer": 15 }
            ],
            "hint": "Follow this: 2 * ? = 10"
        }
    },
    {
        "id": 6,
        "type": "math6",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the number that is addition of the top number",
            "method": "addition",
            "data": [
                { "id": 1, "result": 10, "option": 2, "answer": 8 },
                { "id": 2, "result": 20, "option": 10, "answer": 10 },
                { "id": 3, "result": 50, "option": 25, "answer": 25 },
                { "id": 4, "result": 35, "option": 20, "answer": 15 }
            ],
            "hint": "Follow this: 2 + ? = 10"
        }
    },
    {
        "id": 5,
        "type": "math5",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Guess the previous number and next number.",
            "data": [
                { "id": 1, "number": 18, "firstNumber": 17, "lastNumber": 19 },
                { "id": 2, "number": 45, "firstNumber": 44, "lastNumber": 46 },
                { "id": 3, "number": 69, "firstNumber": 68, "lastNumber": 70 }
            ],
            "hint": "Follow this: ? 18 ?. What is the number of previous number and next number?"
        }
    },
    {
        "id": 4,
        "type": "math4",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Between which number?",
            "data": [
                { "id": 1, "number": 10, "from": 1, "to": 15 },
                { "id": 2, "number": 20, "from": 19, "to": 29 },
                { "id": 3, "number": 30, "from": 30, "to": 39 },
                { "id": 4, "number": 40, "from": 39, "to": 49 },
                { "id": 5, "number": 50, "from": 49, "to": 69 }
            ],
            "hint": "Match the number withing the range numbers."
        }
    },
    {
        "id": 3,
        "type": "scale2",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Advance",
        "metadata": {
            "question": "Which numbers are there in this boxes? Connect with the scale line.",
            "options": [12, 50, 34, 43, 63, 89],
            "hint": "Just count 1 by 1 of the scale line and connect with the scale line"
        }
    },
    {
        "id": 2,
        "type": "scale1",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Medium",
        "metadata": {
            "question": "Which numbers are there in this scale?",
            "options": [12, 50, 34, 43, 63, 89, 99, 100, 43],
            "hint": "Just count 1 by 1 of the scale line and type at the boxes"
        }
    },
    {
        "id": 1,
        "type": "fill_blank",
        "group": "4",
        "subject": "Arithmetic",
        "category": "Basic",
        "level": "Easy",
        "metadata": {
            "question": "Continue counting in jumps of 10.",
            "steps": 10,
            "answer1": 12,
            "count": 10,
            "defaultValue": 3,
            "hint": "Just add 10 with every number"
        }
    }
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
            case 'fill_blank': {
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
            case 'scale1': {
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
            case 'scale2': {
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
            case 'math4': {
                const questions = q.metadata.data ?? []
                return (
                    <ArrNumMatch
                        key={q.id}
                        data={questions}
                    />
                )
            }
            case 'math5': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrFirstAndSecondNumber
                        key={q.id}
                        data={dataSet}
                    />
                )
            }
            case 'math6': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrNumAddMulti
                        method={"addition"}
                        key={q.id}
                        data={dataSet}
                    />
                )
            }
            case 'math7': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrNumAddMulti
                        method={"multiplication"}
                        key={q.id}
                        data={dataSet}
                    />
                )
            }
            case 'math8': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrNumAddMultiOptions
                        method={"addition"}
                        key={q.id}
                        data={dataSet}
                    />
                )
            }
            case 'math9': {
                const dataSet = q.metadata.data ?? []
                return (
                    <ArrNumAddMultiOptions
                        method={"multiplication"}
                        key={q.id}
                        data={dataSet}
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
        <>
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
        </>

    )
}
