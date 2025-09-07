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
