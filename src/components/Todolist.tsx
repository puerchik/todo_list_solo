import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import '../App.css'
import { TasksType } from "../App";
import { FilterTasksType } from "../App";

type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    filterTasks: (filter: FilterTasksType) => void
    addTask: (value: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [inputValue, setInputValue] = useState('')

    const onClickHandler = (id: string) => {
        props.removeTask(id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let currentInputValue = e.currentTarget.value
        setInputValue(currentInputValue)
    }

    const onClickInputHandler = () => {
        props.addTask(inputValue.trim())
        setInputValue('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickInputHandler()
        }
    }

    const onActiveClickHandler = () => props.filterTasks('active')
    const onAllClickHandler = () => props.filterTasks('all')
    const onCompletedClickHandler = () => props.filterTasks('completed')

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />
                <button onClick={onClickInputHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone} />
                            <span>{el.title}</span>
                            <button onClick={() => onClickHandler(el.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    )
}