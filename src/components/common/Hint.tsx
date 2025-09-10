export default function Hint({hint}: {hint: string}) {
    return (
        <div className="w-full border p-5 rounded-lg mt-5 flex gap-1">
            <p className="font-semibold">Hint: </p>
            <p className="text-muted-foreground font-semibold">{hint}</p>
        </div>
    )
}
