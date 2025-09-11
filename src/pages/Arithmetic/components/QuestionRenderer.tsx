import { useMemo } from "react"
import ArrTypeOne from "./ArrTypeOne"
import ArrTypeTwo from "./ArrTypeTwo"
import ArrTypeThree from "./ArrTypeThree"
import ArrTypeFour from "./ArrTypeFour"
import ArrTypeFive from "./ArrTypeFive"
import ArrTypeSix from "./ArrTypeSix"
import type { Question } from "@/types/ArithmeticType"
import ArrTypeSeven from "./ArrTypeSeven"
import ArrTypeEight from "./ArrTypeEight"
import ArrTypeNine from "./ArrTypeNine"

export default function QuestionRenderer({ q }: { q: Question }) {
    return useMemo(() => {
        if (!q) return null

        switch (q.type) {
            case "fill_blank": {
                const { answer1, steps, count, defaultValue } = q.metadata
                return (
                    <ArrTypeOne
                        key={q.id}
                        hint={q.metadata.hint}
                        rows={[
                            {
                                start: answer1 ?? 10,
                                step: steps ?? 10,
                                maxLength: count ?? 10,
                                prefilledCount: defaultValue ?? 2,
                                inputMaxLength: 3,
                            },
                        ]}
                    />
                )
            }
            case "scale1": {
                const opts = q.metadata.options ?? []
                const presetLineNums = opts.map((lineNum: number, i: number) => ({
                    dotIndex: i,
                    lineNum,
                }))
                return (
                    <ArrTypeTwo
                        hint={q.metadata.hint}
                        key={q.id}
                        mode="preConnected"
                        presetLineNums={presetLineNums}
                        dotCount={opts.length}
                    />
                )
            }
            case "scale2": {
                const opts = q.metadata.options ?? []
                return (
                    <ArrTypeTwo
                        hint={q.metadata.hint}
                        key={q.id}
                        mode="preFilledBoxes"
                        presetBoxNumbers={opts}
                        dotCount={opts.length}
                    />
                )
            }
            case "math4": {
                return <ArrTypeThree hint={q.metadata.hint} key={q.id} data={q.metadata.data ?? []} />
            }
            case "math5": {
                return <ArrTypeFour hint={q.metadata.hint} key={q.id} data={q.metadata.data ?? []} />
            }
            case "math6": {
                return (
                    <ArrTypeFive
                        hint={q.metadata.hint}
                        key={q.id}
                        method="addition"
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "math7": {
                return (
                    <ArrTypeFive
                        hint={q.metadata.hint}
                        key={q.id}
                        method="multiplication"
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "math8": {
                return (
                    <ArrTypeSix
                        hint={q.metadata.hint}
                        key={q.id}
                        method="addition"
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "math9": {
                return (
                    <ArrTypeSix
                        hint={q.metadata.hint}
                        key={q.id}
                        method="multiplication"
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "math10": {
                return (
                    <ArrTypeSeven
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "math11": {
                return (
                    <ArrTypeEight
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "math12": {
                return (
                    <ArrTypeNine
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            
            default:
                return null
        }
    }, [q])
}
