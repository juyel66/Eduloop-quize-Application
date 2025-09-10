import React, { useState } from 'react'
import Controllers from '@/components/common/Controllers'
import Hint from '@/components/common/Hint'
import Check from '@/components/common/Check'

export default function ArrTypeEight({ data, hint }: any) {
  const [showHint, setShowHint] = useState(false)
  const handleShowHint = () => setShowHint((v) => !v)

  return (
    <div>
      <div>ArrTypeEight</div>
      {/* controllers  */}
      <div>
        <Controllers handleCheck={() => { }} handleShowSolution={() => { }} handleShowHint={handleShowHint} />
        {showHint && <Hint hint={hint} />}
        <Check />
      </div>
    </div>
  )
}