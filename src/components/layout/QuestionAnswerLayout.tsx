import { type ReactNode } from 'react'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'
import { IoMdArrowRoundForward } from 'react-icons/io'

export default function QuestionAnswerLayout({ children }: { children: ReactNode }) {
    return (
        <div className=''>
            
            {/* content  */}
            <div className='flex-1 py-10 rounded-[30px]'>
                {/* <QuestionAnswerLayout> */}
                    {children}
                {/* </QuestionAnswerLayout> */}
            </div>
            {/* footer  */}
            <div>
                
                
            </div>
        </div>
    )
}
