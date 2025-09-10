import React, { useState } from 'react'
import Controllers from '@/components/common/Controllers'
import Hint from '@/components/common/Hint'
import Check from '@/components/common/Check'

export default function ArrTypeEight({ data, hint }: any) {
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
              className="size-10 border-2 !border-primary text-2xl font-semibold text-center"
              readOnly
            />
            <div className="flex flex-col gap-5">
              <input
                type="text"
                value={3}
                className="size-10 border-2 !border-primary text-2xl font-semibold text-center"
                readOnly
              />
              <input
                type="text"
                value={3}
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