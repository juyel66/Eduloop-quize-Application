import type { Question } from "@/types/ArithmeticType"

export const QUESTIONS_DATA: any[] = [
  {
    id: 10,
    type: "math10",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Easy",
    metadata: {
      question: "Guess the numbers that is multiplication of the top number",
      method: "multiplication",
      data: [
        { id: 1, result: 12, answer: [[3, 4], [6, 2], [4, 3]] },
        { id: 2, result: 20, answer: [[10, 2], [5, 4], [20, 1]] },
        { id: 3, result: 50, answer: [[25, 2], [10, 5], [50, 1]] },
        { id: 4, result: 60, answer: [[30, 2], [20, 3], [15, 4]] }
      ],
      hint: "Follow this: 3 * ? = 12, 6 * ? = 12, 4 + ? = 12"
    }
  },
  {
    id: 9,
    type: "math9",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Easy",
    metadata: {
      question: "Guess the numbers that is multiplication of the top number",
      method: "multiplication",
      data: [
        { id: 1, result: 12, answer: [[3, 4], [6, 2], [4, 3]] },
        { id: 2, result: 20, answer: [[10, 2], [5, 4], [20, 1]] },
        { id: 3, result: 50, answer: [[25, 2], [10, 5], [50, 1]] },
        { id: 4, result: 60, answer: [[30, 2], [20, 3], [15, 4]] }
      ],
      hint: "Follow this: 3 * ? = 12, 6 * ? = 12, 4 + ? = 12"
    }
  },
  {
    id: 8,
    type: "math8",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Easy",
    metadata: {
      question: "Guess the numbers that is addition of the top number",
      method: "addition",
      data: [
        { id: 1, result: 10, answer: [[5, 5], [8, 2], [6, 4]] },
        { id: 2, result: 20, answer: [[10, 10], [18, 2], [15, 5]] },
        { id: 3, result: 50, answer: [[25, 25], [30, 20], [42, 8]] },
        { id: 4, result: 60, answer: [[30, 30], [40, 20], [49, 11]] }
      ],
      hint: "Follow this: 5 + ? = 10, 8 + ? = 10, 6 + ? = 10"
    }
  },
  {
    id: 7,
    type: "math7",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Easy",
    metadata: {
      question: "Guess the number that is multiplication of the top number",
      method: "multiplication",
      data: [
        { id: 1, result: 10, option: 2, answer: 8 },
        { id: 2, result: 20, option: 10, answer: 10 },
        { id: 3, result: 50, option: 25, answer: 25 },
        { id: 4, result: 60, option: 20, answer: 15 }
      ],
      hint: "Follow this: 2 * ? = 10"
    }
  },
  {
    id: 6,
    type: "math6",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Easy",
    metadata: {
      question: "Guess the number that is addition of the top number",
      method: "addition",
      data: [
        { id: 1, result: 10, option: 2, answer: 8 },
        { id: 2, result: 20, option: 10, answer: 10 },
        { id: 3, result: 50, option: 25, answer: 25 },
        { id: 4, result: 35, option: 20, answer: 15 }
      ],
      hint: "Follow this: 2 + ? = 10"
    }
  },
  {
    id: 5,
    type: "math5",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Easy",
    metadata: {
      question: "Guess the previous number and next number.",
      data: [
        { id: 1, number: 18, firstNumber: 17, lastNumber: 19 },
        { id: 2, number: 45, firstNumber: 44, lastNumber: 46 },
        { id: 3, number: 69, firstNumber: 68, lastNumber: 70 }
      ],
      hint: "Follow this: ? 18 ?. What is the number of previous number and next number?"
    }
  },
  {
    id: 4,
    type: "math4",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Easy",
    metadata: {
      question: "Between which number?",
      data: [
        { id: 1, number: 10, from: 1, to: 15 },
        { id: 2, number: 20, from: 19, to: 29 },
        { id: 3, number: 30, from: 30, to: 39 },
        { id: 4, number: 40, from: 39, to: 49 },
        { id: 5, number: 50, from: 49, to: 69 }
      ],
      hint: "Match the number withing the range numbers."
    }
  },
  {
    id: 3,
    type: "scale2",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Advance",
    metadata: {
      question: "Which numbers are there in this boxes? Connect with the scale line.",
      options: [12, 50, 34, 43, 63, 89],
      hint: "Just count 1 by 1 of the scale line and connect with the scale line"
    }
  },
  {
    id: 2,
    type: "scale1",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Medium",
    metadata: {
      question: "Which numbers are there in this scale?",
      options: [12, 50, 34, 43, 63, 89, 99, 100, 43],
      hint: "Just count 1 by 1 of the scale line and type at the boxes"
    }
  },
  {
    id: 1,
    type: "fill_blank",
    group: "4",
    subject: "Arithmetic",
    category: "Basic",
    level: "Easy",
    metadata: {
      question: "Continue counting in jumps of 10.",
      steps: 10,
      answer1: 12,
      count: 10,
      defaultValue: 3,
      hint: "Just add 10 with every number"
    }
  }
]
