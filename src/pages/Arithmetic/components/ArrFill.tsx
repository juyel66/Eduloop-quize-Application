import Check from "@/components/common/Check"
import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"
import { IoMdArrowRoundForward } from "react-icons/io"

interface RowProps {
    maxLength?: number       // number of slots in the row
    start: number
    step?: number
    prefilledCount?: number
    inputMaxLength?: number  // optional max length per input
}

export default function ArrFill({
    rows = [
        { start: 40, step: 20, maxLength: 5, prefilledCount: 2, inputMaxLength: 3 },
        { start: 35, step: 10, maxLength: 5, prefilledCount: 3 }, // will use global fallback
        { start: 120, step: 10, maxLength: 5, prefilledCount: 2, inputMaxLength: 3 },
    ] as RowProps[],
    inputMaxLength = 3, // 👈 global fallback
}: { rows?: RowProps[]; inputMaxLength?: number }) {
    const [values, setValues] = useState<Record<string, string>>({})
    const [checked, setChecked] = useState(false)

    // build expected values for all rows
    const expected: Record<string, number> = useMemo(() => {
        const exp: Record<string, number> = {}
        rows.forEach((row, rIdx) => {
            const step = row.step ?? 10
            const len = row.maxLength ?? 10
            Array.from({ length: len }).forEach((_, i) => {
                exp[`${rIdx}-${i}`] = row.start + i * step
            })
        })
        return exp
    }, [rows])

    const handleChange = (key: string, raw: string) => {
        const cleaned = raw.replace(/[^0-9]/g, ""); // only allow digits
        setValues((prev) => ({ ...prev, [key]: cleaned }));
        if (checked) setChecked(false);
    };



    const results: Record<string, "correct" | "wrong" | undefined> = useMemo(() => {
        const res: Record<string, "correct" | "wrong" | undefined> = {}
        Object.keys(expected).forEach((k) => {
            if (!checked) {
                res[k] = undefined
            } else {
                const [rowIdxStr, colIdxStr] = k.split("-")
                const rowIdx = Number(rowIdxStr)
                const colIdx = Number(colIdxStr)
                const row = rows[rowIdx]
                const prefilledCount = row.prefilledCount ?? 2

                // ✅ If this index is prefilled, always mark correct
                if (colIdx < prefilledCount) {
                    res[k] = "correct"
                    return
                }

                const val = values[k]
                if (val && Number(val) === expected[k]) res[k] = "correct"
                else res[k] = "wrong"
            }
        })
        return res
    }, [checked, values, expected, rows])

    const summary = useMemo(() => {
        if (!checked) return null

        const valuesArr = Object.values(results)
        const allCorrect = valuesArr.every((r) => r === "correct")
        const anyWrong = valuesArr.some((r) => r === "wrong")

        if (allCorrect) {
            return { text: "🎉 Correct! Good Job", color: "text-green-600", bgColor: "bg-green-100", borderColor: "border-green-600" }
        }
        if (anyWrong) {
            return { text: "❌ Oops! Some answers are wrong", color: "text-red-600", bgColor: "bg-red-100", borderColor: "border-red-600" }
        }
        return null
    }, [results, checked])




    return (
        <>
            <div className='border-2 border-primary w-full h-full rounded-bl-[40px] pb-5'>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='pt-1 pb-2 pl-5 pr-6 text-center bg-primary text-white text-2xl font-semibold'>Start</div>
                    <h1 className='font-bold text-xl'>Continue counting in jumps of 10.</h1>
                </div>

                <div className='space-y-6 pl-25'>
                    {rows.map((row, rIdx) => {
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
                                                placeholder={preset ? "" : "00"}
                                                value={preset ? String(expected[key]) : (values[key] ?? "")}
                                                readOnly={preset}
                                                onChange={(e) => {
                                                    if (!preset) handleChange(key, e.target.value)   // only editable if not preset
                                                }}
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
            <div className='flex items-center justify-between mt-10'>
                <div className='flex items-center gap-3'>
                    <Button onClick={() => setChecked(true)} className='bg-[#dbeafe] hover:bg-[#dbeafe]/70 text-black border'>Check</Button>
                    <Button className='bg-[#ffedd5] hover:bg-[#ffedd5]/70 text-black border'>Hint</Button>
                    <Button className='bg-[#f3e8ff] hover:bg-[#f3e8ff]/70 text-black border'>Show Solution</Button>
                </div>
                <Button className='rounded-2xl py-7 pr-2 font-bold text-xl'>
                    Next
                    <div className='size-10 bg-black rounded-2xl flex items-center justify-center'>
                        <IoMdArrowRoundForward size={50} className='text-5xl' />
                    </div>
                </Button>
            </div>
            <Check summary={summary} />
        </>
    )
}
