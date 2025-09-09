import Check from "@/components/common/Check"
import Controllers from "@/components/common/Controllers"
import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"
import { IoMdArrowRoundForward } from "react-icons/io"

interface RowProps {
    maxLength?: number
    start: number
    step?: number
    prefilledCount?: number
    inputMaxLength?: number
}

export default function ArrFill({
    rows,
    inputMaxLength = 3,
    onNext,
}: {
    rows?: RowProps[]
    inputMaxLength?: number
    onNext?: () => void
}) {
    const [values, setValues] = useState<Record<string, string>>({})
    const [checked, setChecked] = useState(false)

    // build expected values for all rows
    const expected: Record<string, number> = useMemo(() => {
        const exp: Record<string, number> = {}
        rows?.forEach((row, rIdx) => {
            const step = row.step ?? 10
            const len = row.maxLength ?? 10
            Array.from({ length: len }).forEach((_, i) => {
                exp[`${rIdx}-${i}`] = row.start + i * step
            })
        })
        return exp
    }, [rows])

    const handleChange = (key: string, raw: string) => {
        const cleaned = raw.replace(/[^0-9]/g, "")
        setValues((prev) => ({ ...prev, [key]: cleaned }))
        if (checked) setChecked(false)
    }

    // Compute result colors
    const results: Record<string, "correct" | "wrong" | undefined> = useMemo(() => {
        const res: Record<string, "correct" | "wrong" | undefined> = {}
        Object.keys(expected).forEach((k) => {
            if (!checked) {
                res[k] = undefined
            } else {
                const [rowIdxStr, colIdxStr] = k.split("-")
                const rowIdx = Number(rowIdxStr)
                const colIdx = Number(colIdxStr)
                const row = rows![rowIdx]
                const prefilledCount = row.prefilledCount ?? 2

                if (colIdx < prefilledCount) {
                    res[k] = "correct" // prefilled are always correct
                    return
                }

                const val = values[k]
                res[k] = val && Number(val) === expected[k] ? "correct" : "wrong"
            }
        })
        return res
    }, [checked, values, expected, rows])

    const handleCheck = () => {
        setChecked(true)
    }

    const summary = useMemo(() => {
        if (!checked) return null
        const vals = Object.values(results)
        const allCorrect = vals.length > 0 && vals.every((r) => r === "correct")
        const anyWrong = vals.some((r) => r === "wrong")
        if (allCorrect) {
            return { text: "🎉 Correct! Good Job", color: "text-green-600", bgColor: "bg-green-100", borderColor: "border-green-600" }
        }
        if (anyWrong) {
            return { text: "❌ Oops! Some answers are wrong", color: "text-red-600", bgColor: "bg-red-100", borderColor: "border-red-600" }
        }
        return null
    }, [results, checked])

    // 👉 Show Solution: fill all editable slots with expected values and mark correct
    const handleShowSolution = () => {
        if (!rows?.length) return

        const next: Record<string, string> = { ...values }
        rows.forEach((row, rIdx) => {
            const len = row.maxLength ?? 10
            const prefilledCount = row.prefilledCount ?? 2
            for (let i = prefilledCount; i < len; i++) {
                const key = `${rIdx}-${i}`
                next[key] = String(expected[key])
            }
        })

        setValues(next)
        // setChecked(true) // trigger green borders + summary
    }

    return (
        <>
            <div>

                <div className='border-2 border-primary w-full h-full rounded-bl-[40px] pb-5 mt-5'>

                    <div className='flex items-center gap-3 mb-6'>
                        <div className='pt-1 pb-2 pl-5 pr-6 text-center bg-primary text-white text-2xl font-semibold'>Start</div>
                        <h1 className='font-bold text-xl'>Continue counting in jumps of 10.</h1>
                    </div>

                    <div className='space-y-6 pl-25'>
                        {rows?.map((row, rIdx) => {
                            const len = row.maxLength ?? 10
                            const prefilledCount = row.prefilledCount ?? 2
                            const rowInputMax = row.inputMaxLength ?? inputMaxLength

                            return (
                                <div key={rIdx} className="flex items-center">
                                    {Array.from({ length: len }).map((_, i) => {
                                        const key = `${rIdx}-${i}`
                                        const preset = i < prefilledCount
                                        return (
                                            <div key={i} className="flex items-center">
                                                <div className='w-3 bg-primary h-1'></div>
                                                <input
                                                    id={`input-${key}`}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={rowInputMax}
                                                    placeholder={preset ? "" : ""}
                                                    value={preset ? String(expected[key]) : (values[key] ?? "")}
                                                    readOnly={preset}
                                                    onChange={(e) => { if (!preset) handleChange(key, e.target.value) }}
                                                    className={`border-2 size-15 text-3xl font-bold text-center appearance-none focus:outline-none
                                                            ${results[key] === "correct"
                                                            ? "border-green-500"
                                                            : results[key] === "wrong"
                                                                ? "border-red-500"
                                                                : "border-primary"
                                                        }`}
                                                />
                                            </div>
                                        )
                                    })}
                                    <div className='w-3 bg-primary h-1'></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <Controllers handleCheck={handleCheck} handleShowSolution={handleShowSolution}/>
            <Check summary={summary} />
        </>
    )
}
