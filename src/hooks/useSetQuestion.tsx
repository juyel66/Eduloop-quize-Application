import { useState } from "react"

export default function useSetQuestion() {
  const [question, setQuestion] = useState(0)

  const handleNext = () => setQuestion((prev) => prev + 1)

  return { question, handleNext, setQuestion }
}
