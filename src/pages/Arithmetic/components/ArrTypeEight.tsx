import React, { useState } from 'react'
import Controllers from '@/components/common/Controllers'
import Hint from '@/components/common/Hint'

export default function ArrTypeEight({ data, hint }: any) {
  const [showHint, setShowHint] = useState(false)
  const handleShowHint = () => setShowHint((v) => !v)

  return (
    <div>
      <div>ArrTypeEight</div>
      <Controllers handleCheck={() => {}} handleShowSolution={() => {}} handleShowHint={handleShowHint} />
      {showHint && <Hint hint={hint} />}
    </div>
  )
}
