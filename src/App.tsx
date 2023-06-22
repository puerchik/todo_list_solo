import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { v1 } from 'uuid';

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterTasksType = 'all' | 'active' | 'completed'

function App() {

  let [tasks, setTasks] = useState<TasksType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false }
  ])

  let [filter, setFilter] = useState<FilterTasksType>('all')

  let tasksForTodolist = tasks;

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }

  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter(el => el.id !== id)
    setTasks(filteredTasks)
  }

  const addTask = (value: string) => {
    let newTask = { id: v1(), title: value, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const changeTaskStatus = (id: string, newIsDone: boolean) => {
    setTasks(tasks.map(el => el.id === id ? {...el, isDone: newIsDone} : el))
  }

  const currentButton =(value: FilterTasksType)=>{
    setFilter(value)
  }

  return (
    <div className="App">
      <div className="container wrapper">
        <Todolist title={"What to learn"}
          tasks={tasksForTodolist}
          filterTasks={setFilter}
          removeTask={removeTask}
          addTask={(value) => addTask(value)}
          changeTaskStatus={changeTaskStatus}
          currentButton={currentButton} />
      </div>
    </div>
  );
}

export default App;
