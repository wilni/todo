import prisma from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
    "use server"

    const title = data.get('title')?.valueOf()
    if(typeof title !== "string" || title.length === 0){
        throw new Error("invalid Title")
    }

    await prisma.todo.create({ data: {title, complete: false}})
    redirect("/")
}


export default function Page() {
    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2x1">New</h1>
            </header>
            <form action={createTodo} className="flex gap-2 flex-col">
                <input 
                    type="text" 
                    name="title" 
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none"
                />
                <div className="flex gap-5 justify-end">
                    <Link href=".."
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none">
                        Cancel</Link>
                    <button type="submit" 
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none">
                        Create
                    </button>
                    
                </div>
            </form>
        </>
    )

}