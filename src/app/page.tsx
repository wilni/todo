
import { TodoItem } from "@/components/TodoItem";
import prisma from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { toEditorSettings } from "typescript";
import { useState } from "react";



function getTodos() {
  let todos = prisma.todo.findMany()
  return todos
}

async function toggleTodo(id: string, complete: boolean){
  "use server"
  await prisma.todo.update({where: {id}, data: {complete}})
}

// async function deleteTodo(id: string){
//   "use server"
//   await prisma.todo.delete({where: {id}})
// }

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
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
        ))}
      </ul>
    </>
  )
}
