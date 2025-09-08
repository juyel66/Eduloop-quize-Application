import Navbar from '@/components/layout/Navbar'
import { Outlet, useLocation } from 'react-router'
import bg from '@/assets/images/bg.jpg'
import { Button } from '@/components/ui/button'
import { IoIosArrowForward, IoMdArrowRoundBack } from 'react-icons/io'
import Footer from '@/components/layout/Footer'

export default function MainPageLayout() {
    const location = useLocation()
    return (
        <div style={{ background: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }} className='w-full h-full p-2'>
            {/* navbar  */}
            {
                location.pathname !== "/" && <Navbar />
            }
            <main className={`bg-white/10 backdrop-blur-md border-white/20 rounded-[30px] ${location.pathname !== "/" ? 'p-10' : 'overflow-hidden'} border`}>

                <div>
                    <Outlet />
                </div>
                {/* <Footer/> */}
                {
                    location.pathname !== "/" && <Footer />
                }
            </main>
        </div>
    )
}
