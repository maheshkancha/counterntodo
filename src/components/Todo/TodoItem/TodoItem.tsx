import type { TodoItemTypes, TodoItemActions } from "../Todo.types";
import './todoitem.css';

const TodoItem: React.FC<TodoItemTypes & TodoItemActions> = ({ id, item, isCompleted, alterTodoItem }) => {
    const handleAction = (actionType: string) => {
        switch (actionType) {
            case 'complete': 
                alterTodoItem(id, actionType);
                break;
            case 'delete':
                alterTodoItem(id, actionType);
            case 'default': break;
        }
    }

    return (
        <div className="todo-item-wrapper">
            <div className={isCompleted ? "striked-text" : ""}>🚩 {item}</div>
            <div className="todo-item-action-button">
                <button className="glass" title="Mark complete" onClick={() => handleAction('complete')}>✅</button>
                <button className="glass" title="Delete item" onClick={() => handleAction('delete')}>🗑️</button>
            </div>
        </div>
    );
}

export default TodoItem;
