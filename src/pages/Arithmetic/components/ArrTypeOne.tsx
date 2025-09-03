import QuestionAnswerLayout from '@/components/layout/QuestionAnswerLayout'
import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"


export default function ArrTypeOne() {
    return (
        <QuestionAnswerLayout>
            <div className='border-2 border-primary w-full h-full rounded-bl-[40px]'>
                <div className='flex items-center gap-3'>
                    <div className='pt-1 pb-2 pl-5 pr-6 text-center bg-primary text-white text-2xl font-semibold'>Start</div>
                    <h1 className='font-bold text-xl'>Continue counting in jumps of 10.</h1>
                </div>
                <div className='py-5 pl-25 space-y-5'>
                    <InputOTP maxLength={10}>
                        <InputOTPGroup>
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={0} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={1} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={2} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={3} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={4} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={5} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={6} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={7} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={8} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={9} />
                            <div className='w-3 bg-primary h-1'></div>
                        </InputOTPGroup>
                    </InputOTP>
                    <InputOTP maxLength={10}>
                        <InputOTPGroup>
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={0} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={1} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={2} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={3} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={4} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={5} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={6} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={7} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={8} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={9} />
                            <div className='w-3 bg-primary h-1'></div>
                        </InputOTPGroup>
                    </InputOTP>
                    <InputOTP maxLength={10}>
                        <InputOTPGroup>
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={0} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={1} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={2} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={3} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={4} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={5} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={6} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={7} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={8} />
                            <div className='w-3 bg-primary h-1'></div>
                            <InputOTPSlot className='!border-3 border-primary p-5' index={9} />
                            <div className='w-3 bg-primary h-1'></div>
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </div>
        </QuestionAnswerLayout>
    )
}
