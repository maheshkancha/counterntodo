type TodoListTypes = {
    list: TodoItemTypes[]
}

type TodoItemTypes = {
    item: string,
    isCompleted: boolean
}

export type {
    TodoListTypes,
    TodoItemTypes
}
