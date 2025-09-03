import Navbar from '@/components/layout/Navbar'
import { Outlet } from 'react-router'
import bg from '@/assets/images/bg.jpg'
import { Button } from '@/components/ui/button'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function MainPageLayout() {
    return (
        <div style={{ background: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} className='w-screen h-screen p-2'>
            {/* navbar  */}
            <Navbar />
            <main className='bg-white/10 backdrop-blur-md border-b border-white/20 rounded-[30px] p-10'>
                <div className='flex items-center mb-5'>
                    <Button className='rounded-2xl py-7 font-bold text-xl'>
                        Next
                        <div className='size-10 bg-white text-black rounded-2xl flex items-center justify-center'>
                            <IoMdArrowRoundBack size={50} className='text-5xl' />
                        </div>
                    </Button>
                </div>
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
