import { TodoItemModel } from "../model/TodoItemModel.js";
import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
  createElement(
    todoItems: Array<TodoItemModel>,
    {
      onUpdateTodo,
      onDeleteTodo,
    }: {
      onUpdateTodo: ({
        id,
        completed,
      }: {
        id: number;
        completed: boolean;
      }) => void;
      onDeleteTodo: ({ id }: { id: number }) => void;
    }
  ) {
    const todoListElement = element`<ul />`;
    todoItems.forEach((todoItem) => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onDeleteTodo,
        onUpdateTodo,
      });
      if (!todoListElement) throw new Error("todoListElementがnullです。");
      if (!todoItemElement) throw new Error("todoItemElementがnullです。");
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
