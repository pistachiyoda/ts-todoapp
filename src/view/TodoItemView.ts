import { TodoItemModel } from "../model/TodoItemModel.js";
import { element } from "./html-util.js";
import { Status } from "../interfaces";

export class TodoItemView {
  createElement(
    todoItem: TodoItemModel,
    {
      onUpdateTodo,
      onDeleteTodo,
    }: {
      onUpdateTodo: ({ id, completed }: Status) => void;
      onDeleteTodo: ({ id }: { id: string }) => void;
    }
  ) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
                                    <s>${todoItem.title}</s>
                                    <button class="delete">x</button>
                                </li>`
      : element`<li><input type="checkbox" class="checkbox">
                                    ${todoItem.title}
                                    <button class="delete">x</button>
                                </li>`;
    if (!todoItemElement) throw new Error("todoItemElementがnullです");
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    if (!inputCheckboxElement)
      throw new Error("inputCheckboxElementがnullです");
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
      });
    });
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    if (!deleteButtonElement)
      throw new Error("deleteButtonElementはnullです。");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id,
      });
    });
    return todoItemElement;
  }
}
