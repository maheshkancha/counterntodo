import type { TodoItemTypes } from "../Todo.types";
import './todoitem.css';

const TodoItem = ({ item, isCompleted }: TodoItemTypes) => {
    return (
        <div className="todo-item-wrapper">
            <div>{item}</div>
            <div className="todo-item-action-button">
                <button className="glass">Done</button>
                <button className="glass">Edit</button>
            </div>
        </div>
    );
}

export default TodoItem;
