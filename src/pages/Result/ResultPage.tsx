
export default function ResultPage() {
    return (
        <div className=''>
            <div className='bg-primary py-2 px-5 rounded-lg text-white mb-5'>
                <h1 className='font-bold mb-3 text-5xl text-center'>Result Summary</h1>
            </div>
            <div className='p-5 bg-white rounded-lg'>
                <p className='font-semibold mb-3 rounded-lg py-1 px-3 inline-flex bg-primary/20'>Your Score: 4/6</p>
                <div className='flex items-center justify-between gap-10'>
                    <div className='w-full'>
                        <h1 className='font-bold text-green-500 text-xl mb-3'>Right Answers</h1>
                        <div className='border border-green-500 flex items-center gap-3 bg-green-100 rounded-lg p-5'>
                            <p className='font-bold'>Q1:</p>
                            <p className=''>this is right answer</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <h1 className='font-bold text-red-500 text-xl mb-3'>Wrong Answers</h1>
                        <div className='border border-red-500 flex items-center gap-3 bg-red-100 rounded-lg p-5'>
                            <p className='font-bold'>Q1:</p>
                            <p className=''>this is right answer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
