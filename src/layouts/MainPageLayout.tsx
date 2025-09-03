import Navbar from '@/components/layout/Navbar'
import { Outlet } from 'react-router'
import bg from '@/assets/images/bg.jpg'
import { Button } from '@/components/ui/button'
import { IoIosArrowForward, IoMdArrowRoundBack } from 'react-icons/io'
import Footer from '@/components/layout/Footer'

export default function MainPageLayout() {
    return (
        <div style={{ background: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} className='w-full h-full p-2'>
            {/* navbar  */}
            <Navbar />
            <main className='bg-white/10 backdrop-blur-md border-white/20 rounded-[30px] p-10 border'>
                <div className='flex items-center justify-between mb-5'>
                    <div className='flex items-center gap-3'>
                        <Button className='rounded-2xl py-7 pl-2 font-bold text-xl'>
                            <div className='size-10 bg-white text-black rounded-2xl flex items-center justify-center'>
                                <IoMdArrowRoundBack size={50} className='text-5xl' />
                            </div>
                            Back
                        </Button>
                        <div className='text-primary flex gap-3 items-center'>
                            <p>Group 5</p>
                            <IoIosArrowForward/>
                            <p>Arithmetic</p>
                            <IoIosArrowForward/>
                            <p>Fractions</p>
                        </div>
                    </div>
                    <div className='bg-white p-1 rounded-lg flex items-center'>
                        <div className='py-2 px-5 bg-primary rounded-lg font-semibold text-white'>Easy</div>
                        <div className='py-2 px-5  rounded-lg font-semibold text-black'>Medium</div>
                        <div className='py-2 px-5  rounded-lg font-semibold text-black'>Advance</div>
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
                {/* <Footer/> */}
                <div className='flex items-center justify-between text-white w-full mt-10'>
                    <div>© Extra Handen--- School-safe. No personal data</div>
                    <div>Privacy Policy</div>
                </div>
            </main>
        </div>
    )
}
