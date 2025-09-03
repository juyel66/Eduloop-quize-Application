import React from 'react'
import ArrTypeOne from './components/ArrTypeOne'
import QuestionAnswerLayout from '@/components/layout/QuestionAnswerLayout'
import ArrTypeTwo from './components/ArrTypeTwo'

export default function ArithmeticPage() {
    return (
        <QuestionAnswerLayout>
            {/* <ArrTypeOne /> */}
            <ArrTypeTwo/>
        </QuestionAnswerLayout>
    )
}
