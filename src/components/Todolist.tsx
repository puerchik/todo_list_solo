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
    changeTaskStatus: (id: string, isDone: boolean) => void
    currentButton: (value: FilterTasksType) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [inputValue, setInputValue] = useState('')
    let [errorInput, setErrorInput] = useState(false);
    let [buttonValue, setbuttonValue] = useState<FilterTasksType>('all')

    const onClickHandler = (id: string) => {
        props.removeTask(id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let currentInputValue = e.currentTarget.value
        setInputValue(currentInputValue)
        setErrorInput(false)
    }

    const onClickInputHandler = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim())
            setInputValue('')
        } else {
            setErrorInput(true)
        }

    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickInputHandler()
        }
    }

    const buttonValueHandler = (value: FilterTasksType) => {
        setbuttonValue(value)
        props.currentButton(value)
    }

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input className={errorInput ? 'error' : ''} value={inputValue} onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />
                <button onClick={onClickInputHandler}>+</button>
                {errorInput && <div className="errorMessage">Title is required!</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                    const checkboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked)
                    }
                    return (
                        <li className={el.isDone ? 'isDone' : ''} key={el.id}>
                            <input type="checkbox" checked={el.isDone} onChange={checkboxChangeHandler} />
                            <span>{el.title}</span>
                            <button onClick={() => onClickHandler(el.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <button className={buttonValue === 'all' ? 'activeFilter' : ''} onClick={() => buttonValueHandler('all')}>All</button>
            <button className={buttonValue === 'active' ? 'activeFilter' : ''} onClick={() => buttonValueHandler('active')}>Active</button>
            <button className={buttonValue === 'completed' ? 'activeFilter' : ''} onClick={() => buttonValueHandler('completed')}>Completed</button>
        </div>
    )
}