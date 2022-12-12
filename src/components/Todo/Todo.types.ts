interface TodoItemTypes {
    id: string,
    item: string,
    isCompleted: boolean,
}

interface TodoItemActions {
    alterTodoItem: (id: string, actionType: string) => void
}

export type {
    TodoItemTypes,
    TodoItemActions
}
