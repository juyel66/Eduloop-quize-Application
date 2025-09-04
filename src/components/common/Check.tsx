export default function Check({ summary }: any) {
    return (
        <div >

            {summary && (
                <div className={`w-full ${summary.color} ${summary.bgColor} border ${summary.borderColor} p-5 rounded-lg mt-3`}>
                    <p className="font-semibold text-lg">
                        {summary.text}
                    </p>
                </div>
            )}

        </div>
    )
}
