import { type ReactNode } from 'react'
import { Button } from '../ui/button'
import { ChevronLeft } from 'lucide-react'
import { IoMdArrowRoundForward } from 'react-icons/io'

export default function QuestionAnswerLayout({ children }: { children: ReactNode }) {
    return (
        <div className='p-10 rounded-[30px]  w-full h-full border flex flex-col bg-white'>
            {/* header  */}
            <div>
                <h1 className='font-bold'>Question 1</h1>
                <p>Continue counting in jumps of 10</p>
            </div>
            {/* content  */}
            <div className='flex-1 py-10 rounded-[30px]'>
                {/* <QuestionAnswerLayout> */}
                    {children}
                {/* </QuestionAnswerLayout> */}
            </div>
            {/* footer  */}
            <div>
                
                <Button className='mt-5 py-6 bg-[#e8edff] hover:bg-[#e8edff]/70 text-black border]'><ChevronLeft /> Switch Category</Button>
            </div>
        </div>
    )
}
