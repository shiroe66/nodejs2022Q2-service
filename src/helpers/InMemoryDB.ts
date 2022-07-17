import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDB<T extends { id: string }> {
  list: T[] = [];

  findAll() {
    return this.list;
  }

  findOne(id: string) {
    const item = this.list.find((item) => item && item.id === id);

    return item || null;
  }

  create(item: T) {
    this.list.push(item);
    return item;
  }

  update(id: string, updatedItem: Partial<T>) {
    const item = this.findOne(id);

    return Object.assign(item, updatedItem) || null;
  }

  delete(id: string) {
    const length = this.list.length;

    this.list = this.list.filter((item) => item && item.id !== id);
    return length === this.list.length;
  }
}
