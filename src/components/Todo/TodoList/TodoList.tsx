import type { TodoListTypes } from "../Todo.types";
import TodoItem from "../TodoItem/TodoItem";
import './todolist.css';

const TodoList = ({ list }: TodoListTypes) => {
    return (
        <div className="todo-list-wrapper">
            <div className="todo-list-search">
                <input type="text" placeholder="What's your thought?" />
                <button className="glass">Add</button>
                <select>
                    <option value="completed">Completed</option>
                    <option value="wip">In Progress</option>
                </select>
            </div>
            {
                list.map((listItem, index) => <TodoItem key={`list-item-${index}`} item={listItem.item} isCompleted={listItem.isCompleted} />)
            }
        </div>
    );
}

export default TodoList;
