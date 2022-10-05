import { EventEmitter } from "../EventEmitter.js";
import { TodoItemModel } from "./TodoItemModel.js";

export class TodoListModel extends EventEmitter {
  #items: Array<TodoItemModel>;

  constructor(items = []) {
    super();
    this.#items = items;
  }

  getTotalCount() {
    return this.#items.length;
  }

  getTodoItems() {
    return this.#items;
  }

  onChange(listener: () => void) {
    this.addEventListener("change", listener);
  }

  emitChange() {
    this.emit("change");
  }

  addTodo(todoItem: TodoItemModel) {
    this.#items.push(todoItem);
    this.emitChange();
  }

  updateTodo({ id, completed }: { id: number; completed: boolean }) {
    const todoItem = this.#items.find((todo) => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  deleteTodo({ id }: { id: number }) {
    this.#items = this.#items.filter((todo) => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}
