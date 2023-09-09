import { TodoItem } from "@/components/TodoItem";
import prisma from "@/db";
import Link from "next/link";
import { toEditorSettings } from "typescript";

// prisma.todo.create({data: {title: 'test', complete: false}})

function getTodos() {
  return prisma.todo.findMany()
}

export default async function Home() {

  const todos = await getTodos()


  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2x1">Todos</h1>
        <Link href="/new">New</Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  )
}
