import QuestionAnswerLayout from '@/components/layout/QuestionAnswerLayout'
import ArrScaleQuiz from './components/ArrScaleQuiz'

export default function ArithmeticPage() {
    return (
        <QuestionAnswerLayout>
            {/* <ArrScaleQuiz
                mode='preConnected'
                presetLineNums={[
                    { dotIndex: 0, lineNum: 12 },
                    { dotIndex: 1, lineNum: 50 },
                    { dotIndex: 2, lineNum: 45 },
                    { dotIndex: 3, lineNum: 84 },
                    { dotIndex: 4, lineNum: 97 },
                ]}
            /> */}

            <ArrScaleQuiz
                mode="preFilledBoxes"
                presetBoxNumbers={[12, 50, 97, 3, 88]}
            />

            {/* <ArrScaleQuiz mode='connectThenType' /> */}

        </QuestionAnswerLayout>
    )
}
