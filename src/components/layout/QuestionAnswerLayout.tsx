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
                {children}
            </div>
            {/* footer  */}
            <div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <Button className='bg-[#dbeafe] hover:bg-[#dbeafe]/70 text-black border'>Check</Button>
                        <Button className='bg-[#ffedd5] hover:bg-[#ffedd5]/70 text-black border'>Hint</Button>
                        <Button className='bg-[#f3e8ff] hover:bg-[#f3e8ff]/70 text-black border'>Show Solution</Button>
                    </div>
                    <Button className='rounded-2xl py-7 font-bold text-xl'>
                        Next
                        <div className='size-10 bg-black rounded-2xl flex items-center justify-center'>
                            <IoMdArrowRoundForward size={50} className='text-5xl' />
                        </div>
                    </Button>
                </div>
                <Button className='mt-5 py-6 bg-[#e8edff] hover:bg-[#e8edff]/70 text-black border]'><ChevronLeft /> Switch Category</Button>
            </div>
        </div>
    )
}
