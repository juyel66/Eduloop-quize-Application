import QuestionAnswerLayout from '@/components/layout/QuestionAnswerLayout'
import ArrScaleQuiz from './components/ArrScaleQuiz'
import ArrFill from './components/ArrFill'
import useSetQuestion from '@/hooks/useSetQuestion'

export default function ArithmeticPage() {
  const { question, handleNext } = useSetQuestion()

  const questions = [
    <ArrFill
      key={1}
      onNext={handleNext}
      rows={[
        { start: 40, step: 20, maxLength: 5, prefilledCount: 2, inputMaxLength: 3 },
        { start: 35, step: 10, maxLength: 5, prefilledCount: 3 },
        { start: 120, step: 10, maxLength: 5, prefilledCount: 2, inputMaxLength: 3 },
      ]}
    />,
    <ArrScaleQuiz
      key={2}
      onNext={handleNext}
      mode='preConnected'
      presetLineNums={[
        { dotIndex: 0, lineNum: 12 },
        { dotIndex: 1, lineNum: 50 },
        { dotIndex: 2, lineNum: 45 },
        { dotIndex: 3, lineNum: 84 },
        { dotIndex: 4, lineNum: 97 },
      ]}
    />,
    <ArrScaleQuiz
      key={3}
      onNext={handleNext}
      mode="preFilledBoxes"
      presetBoxNumbers={[12, 50, 97, 3, 88]}
    />,
    <ArrScaleQuiz key={4} onNext={handleNext} mode='connectThenType' />,
  ]

  return (
    <QuestionAnswerLayout>
      {questions[question]}
    </QuestionAnswerLayout>
  )
}
