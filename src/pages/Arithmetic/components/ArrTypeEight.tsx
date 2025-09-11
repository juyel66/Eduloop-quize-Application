import React, { useState } from 'react'
import Controllers from '@/components/common/Controllers'
import Hint from '@/components/common/Hint'
import Check from '@/components/common/Check'

const data = [
  {
    id: 1,
    top: 5,
    bottoms: [2, null],
    answers: ["2 + 3 = 5", "3 + 2 = 5", "5 - 2 = 3", "5 - 3 = 2"],
  },
  {
    id: 2,
    top: 7,
    bottoms: [2, 5],
    answers: ["2 + 5 = 7", "5 + 2 = 7", "7 - 2 = 5", "7 - 5 = 2"],
  },
  {
    id: 3,
    bottoms: [4, 5],
    top: null,
    answers: ["4 + 5 = 9", "5 + 4 = 9", "9 - 4 = 5", "9 - 5 = 4"],
  },
  {
    id: 4,
    top: 8,
    bottoms: [2, 6],
    answers: ["2 + 6 = 8", "6 + 2 = 8", "8 - 2 = 6", "8 - 6 = 2"],
  },
]

const hints = "dkjfdkfjk"

export default function ArrTypeEight() {
  const [showHint, setShowHint] = useState(false)
  const handleShowHint = () => setShowHint((v) => !v)

  return (
    <div>
      <div>
        {/* box  */}
        <div className=''>
          <div className="flex relative items-center gap-5">
            <div className="absolute left-10 top-14">
              <div className="relative">
                <div className="w-5 absolute top-0 left-0 h-0.5 rotate-45 bg-primary"></div>
                <div className="w-5 h-0.5 absolute bottom-3 left-0 -rotate-45 bg-primary"></div>
              </div>
            </div>
            <input
              type="text"
              value={3}
              maxLength={3}
              className="size-10 border-2 !border-primary text-2xl font-semibold text-center"
              readOnly
            />
            <div className="flex flex-col gap-5">
              <input
                type="text"
                value={3}
                maxLength={3}
                className="size-10 border-2 !border-primary text-2xl font-semibold text-center"
                readOnly
              />
              <input
                type="text"
                value={3}
                maxLength={3}
                className="size-10 border-2 !border-primary text-2xl font-semibold text-center"
                readOnly
              />
            </div>
          </div>
        </div>
        {/* options  */}
        <div className='mt-5 flex items-center gap-1'>
          <input type="text" className='border-b border-primary w-10 focus:outline-none border-dashed' />
          <p className='font-bold'>+</p>
          <input type="text" className='border-b border-primary w-10 focus:outline-none border-dashed' />
          <p className='font-bold'>=</p>
          <input type="text" className='border-b border-primary w-10 focus:outline-none border-dashed' />
        </div>

      </div>
      {/* controllers  */}
      <div>
        <Controllers handleCheck={() => { }} handleShowSolution={() => { }} handleShowHint={handleShowHint} />
        {showHint && <Hint hint={hint} />}
        <Check />
      </div>
    </div>
  )
}