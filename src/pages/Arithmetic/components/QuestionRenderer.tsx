import { useMemo } from "react"
import ArrTypeOne from "./ArrType_1"
import ArrTypeTwo from "./ArrType_2"
import ArrTypeThree from "./ArrType_3"
import ArrTypeFour from "./ArrType_4"
import ArrTypeFive from "./ArrType_5"
import ArrTypeSix from "./ArrType_6"
import type { Question } from "@/types/ArithmeticType"
import ArrTypeSeven from "./ArrType_7"
import ArrTypeEight from "./ArrType_8"
import ArrTypeNine from "./ArrType_9"
import ArrTypeTen from "./ArrType_10"
import ArrTypeEleven from "./ArrType_11"
import ArrTypeTwelve from "./ArrType_12"
import ArrTypeThirteen from "./ArrType_13"
import ArrTypeFourteen from "./ArrType_14"
import ArrTypeFifteen from "./ArrType_15"
import ArrTypeSixteen from "./ArrType_16"
import ArrTypeSeventeen from "./ArrType_17"
import ArrTypeEighteen from "./ArrType_18"
import ArrTypeNineteen from "./ArrType_19"
import ArrTypeTwenty from "./ArrType_20"
import ArrType_21 from "./ArrType_21"

export default function QuestionRenderer({ q }: { q: Question }) {
    return useMemo(() => {
        if (!q) return null

        switch (q.type) {
            case "type1": {
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
            case "type2_1": {
                const opts = q.metadata.options ?? []
                const presetLineNums = opts.map((lineNum: number, i: number) => ({
                    dotIndex: i,
                    lineNum,
                }))
                return (
                    <ArrTypeTwo
                        hint={q.metadata.hint}
                        key={q.id}
                        mode={q.metedata.mode}
                        presetLineNums={presetLineNums}
                        dotCount={opts.length}
                    />
                )
            }
            case "type2_2": {
                const opts = q.metadata.options ?? []
                return (
                    <ArrTypeTwo
                        hint={q.metadata.hint}
                        key={q.id}
                        mode={q.metadata.mode}
                        presetBoxNumbers={opts}
                        dotCount={opts.length}
                    />
                )
            }
            case "type3": {
                return <ArrTypeThree hint={q.metadata.hint} key={q.id} data={q.metadata.data ?? []} />
            }
            case "type4": {
                return <ArrTypeFour hint={q.metadata.hint} key={q.id} data={q.metadata.data ?? []} />
            }
            case "type5_1": {
                return (
                    <ArrTypeFive
                        hint={q.metadata.hint}
                        key={q.id}
                        method={q.metadata.method}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type5_2": {
                return (
                    <ArrTypeFive
                        hint={q.metadata.hint}
                        key={q.id}
                        method={q.metadata.method}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type6_1": {
                return (
                    <ArrTypeSix
                        hint={q.metadata.hint}
                        key={q.id}
                        method={q.metadata.method}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type6_2": {
                return (
                    <ArrTypeSix
                        hint={q.metadata.hint}
                        key={q.id}
                        method={q.metadata.method}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type7": {
                return (
                    <ArrTypeSeven
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type8": {
                return (
                    <ArrTypeEight
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type9": {
                return (
                    <ArrTypeNine
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type10": {
                return (
                    <ArrTypeTen
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type11": {
                return (
                    <ArrTypeEleven
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type12": {
                return (
                    <ArrTypeTwelve
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type13_1": {
                return (
                    <ArrTypeThirteen
                        hint={q.metadata.hint}
                        key={q.id}
                        dataOne={q.metadata.data ?? []}
                    />
                )
            }
            case "type13_2": {
                return (
                    <ArrTypeThirteen
                        hint={q.metadata.hint}
                        key={q.id}
                        dataTwo={q.metadata.data ?? []}
                    />
                )
            }
            case "type14_1": {
                return (
                    <ArrTypeFourteen
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type14_2": {
                return (
                    <ArrTypeFourteen
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type15": {
                return (
                    <ArrTypeFifteen
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type16": {
                return (
                    <ArrTypeSixteen
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type17": {
                return (
                    <ArrTypeSeventeen
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type18": {
                return (
                    <ArrTypeEighteen
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type19": {
                return (
                    <ArrTypeNineteen
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                ) 
            }
            case "type20": {
                return (
                    <ArrTypeTwenty
                        hint={q.metadata.hint}
                        key={q.id}
                        data={q.metadata.data ?? []}
                    />
                )
            }
            case "type21": {
                return (
                    <ArrType_21
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
