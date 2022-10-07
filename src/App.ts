import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";
import { Status } from "./interfaces";

export class App {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel([]);

  handleAdd(title: string) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  handleUpdate({ id, completed }: Status) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  handleDelete({ id }: { id: string }) {
    this.#todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.querySelector<HTMLFormElement>("#js-form");
    const inputElement =
      document.querySelector<HTMLInputElement>("#js-form-input");
    const containerElement =
      document.querySelector<HTMLDivElement>("#js-todo-list");
    const todoItemCountElement =
      document.querySelector<HTMLSpanElement>("#js-todo-count");

    this.#todoListModel.onChange(() => {
      const todoItems = this.#todoListModel.getTodoItems();
      const todoListElement = this.#todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }: Status) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }: { id: string }) => {
          this.handleDelete({ id });
        },
      });
      render(todoListElement, containerElement);
      if (!todoItemCountElement)
        throw new Error("todoItemCountElementがnullです。");

      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    });
    if (!formElement) throw new Error("formElementがnullです。");

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!inputElement) throw new Error("inputElementがnullです。");
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });
  }
}
