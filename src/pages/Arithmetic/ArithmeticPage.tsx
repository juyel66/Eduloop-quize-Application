import React from 'react'
import ArrTypeOne from './components/ArrTypeOne'
import QuestionAnswerLayout from '@/components/layout/QuestionAnswerLayout'
import ArrTypeTwo from './components/ArrTypeTwo'
import ArrTypeThree from './components/ArrTypeThree'

export default function ArithmeticPage() {
    return (
        <QuestionAnswerLayout>
            {/* <ArrTypeOne /> */}
            {/* <ArrTypeTwo/> */}
            <ArrTypeThree presetLineNums={[
                { dotIndex: 0, lineNum: 12 }, 
                { dotIndex: 1, lineNum: 50 }, 
                { dotIndex: 2, lineNum: 45 },
                { dotIndex: 3, lineNum: 84 },
                { dotIndex: 4, lineNum: 97 },
            ]} />

        </QuestionAnswerLayout>
    )
}
