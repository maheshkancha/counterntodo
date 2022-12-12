import { useEffect, useState } from "react";
import type { TodoItemTypes } from "../Todo.types";
import TodoItem from "../TodoItem/TodoItem";
import './todolist.css';

const filterOptions: string[] = ['All', 'Completed', 'In Progress'];

const initialTodoList: TodoItemTypes[] = [];

const TodoList = () => {
    const [todoItem, setTodoItem] = useState('');
    const [todoList, setTodoList] = useState(initialTodoList);
    const [isAddBtnDisabled, disableAddButton] = useState(true);
    const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
    const key = 'todolist';

    useEffect(() => {
        const localTodoList = getLocalTodoList(key);
        if (localTodoList) {
            setTodoList(localTodoList);
        }
    }, []);

    useEffect(() => {
        const txtTodoItem = document.querySelector('input[name="todo-item"]') as HTMLInputElement;
        disableAddButton(txtTodoItem.value === "");
    }, [todoItem]);

    const addTodoItem = () => {
        const localTodoList = getLocalTodoList(key);
        const date = new Date();
        const id = date.toLocaleDateString() + date.toLocaleTimeString();

        if (localTodoList) {
            const updatedTodoList = [...localTodoList, { id, item: todoItem, isCompleted: false}];
            setTodoList(updatedTodoList);

            localStorage.setItem(key, JSON.stringify(updatedTodoList));
        } else {
            let value = JSON.stringify([]);

            if (todoItem) {
                const initialTodoItemArr = [{ id, item: todoItem, isCompleted: false }];
                setTodoList(initialTodoItemArr);
                value = JSON.stringify(initialTodoItemArr);
            }

            localStorage.setItem(key, value);
        }

        const txtTodoItem = document.querySelector('input[name="todo-item"]') as HTMLInputElement;
        txtTodoItem.value = "";
        disableAddButton(true);
    }

    const alterTodoItem = (id: string, actionType: string) => {
        let localTodoList: TodoItemTypes[] = [...getLocalTodoList(key)];
        const todoIndex = localTodoList.findIndex(item => item.id === id);

        if (todoIndex >= 0) {
            switch (actionType) {
                case 'complete': {
                    localTodoList[todoIndex] = {...localTodoList[todoIndex], isCompleted: true };
                }
                break;
                case 'delete': {
                    localTodoList = localTodoList.filter(item => item.id !== id);
                }
                default: break;
            }
        }

        setTodoList(localTodoList);
        localStorage.setItem(key, JSON.stringify(localTodoList));
    }

    const filterTodoList = (event: any) => {
        const filterBy = event?.target?.value;
        setSelectedOption(filterBy);

        let filteredList = getLocalTodoList(key) as TodoItemTypes[];

        if(filterBy === "Completed") {
            filteredList = getLocalTodoList(key).filter((item: TodoItemTypes) => item.isCompleted === true)
        } else if (filterBy === "In Progress") {
            filteredList = getLocalTodoList(key).filter((item: TodoItemTypes) => item.isCompleted === false)
        }

        setTodoList(filteredList);
    }

    const getLocalTodoList = (key: string) => {
        const strLocalTodoList = localStorage.getItem(key);
        if (strLocalTodoList === null)
            return null
        return JSON.parse(strLocalTodoList);
    }

    return (
        <div className="todo-list-wrapper">
            <div className="todo-list-search">
                <input type="text" name="todo-item" placeholder="What's your thought?" onChange={(event) => setTodoItem(event?.target.value)} />
                <button className="glass" onClick={addTodoItem} disabled={isAddBtnDisabled}>Add</button>
                <select value={selectedOption} onChange={(e) => filterTodoList(e)}>
                    {filterOptions.map(foption => <option key={foption.toLocaleLowerCase()} value={foption}>{foption}</option>)}
                </select>
            </div>
            <div className="todo-item-container">
            {
                todoList.map((listItem) => <TodoItem key={listItem.id} id={listItem.id} item={listItem.item} isCompleted={listItem.isCompleted} alterTodoItem={alterTodoItem} />)
            }
            </div>
        </div>
    );
}

export default TodoList;
