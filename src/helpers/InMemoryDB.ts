import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDB<T extends { id: string }> {
  list: T[] = [];

  private findIndex(id: string) {
    const index = this.list.findIndex((item) => item.id === id);
    return index;
  }

  findAll() {
    return this.list;
  }

  findOne(id: string) {
    return this.list.find((item) => item.id === id);
  }

  create(item: T) {
    this.list.push(item);
    return item;
  }

  update(item: T, newItem: T) {
    const index = this.findIndex(item.id);

    this.list[index] = { ...item, ...newItem };
    return this.list[index];
  }

  delete(id: string) {
    const length = this.list.length;
    this.list = this.list.filter((item) => item.id !== id);
    return length === this.list.length;
  }
}
