let todoIdx = 0;

export class TodoItemModel {
  id: number;
  title: string;
  completed: boolean;

  constructor({ title, completed }: { title: string; completed: boolean }) {
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }
}
