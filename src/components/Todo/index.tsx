import TodoList from "./TodoList/TodoList";

const todoList = [
    { item: 'Complete todo app', isCompleted: false },
    { item: 'Jenking training', isCompleted: true },
    { item: 'Goal settings', isCompleted: true }
];

const Todo = () => {
    return (
        <>
            <TodoList list={todoList} />
        </>
    );
}

export default Todo;
