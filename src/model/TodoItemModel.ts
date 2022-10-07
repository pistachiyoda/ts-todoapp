import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";

export class TodoItemModel {
  id: string;
  title: string;
  completed: boolean;

  constructor({ title, completed }: { title: string; completed: boolean }) {
    this.id = uuidv4();
    this.title = title;
    this.completed = completed;
  }
}
