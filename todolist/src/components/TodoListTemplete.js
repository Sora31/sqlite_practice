import React from 'react'
import './TodoListTemplete.css'

const TodoListTemplete = ({form, children, palette}) => {
    return (
        <main className= 'todo-list-templete'>
            <div className="title">
                오늘 할 일
            </div>
            <section className="palette-wrapper">
                { palette }
            </section>
            <section className="form-wrapper">
                { form }
            </section>
            <section className="todos-wrapper">
                { children }
            </section>
        </main>
    )
}

export default TodoListTemplete;