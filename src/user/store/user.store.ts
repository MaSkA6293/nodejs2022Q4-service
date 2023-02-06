import { UserEntity } from '../entities/user.entity';
import { UserStore } from '../interfaces/user-storage.interface';
import { Injectable } from '@nestjs/common';

Injectable();
export class InMemoryUserStore implements UserStore {
  private users: UserEntity[];

  constructor() {
    this.users = [];
  }
  findOne = (id: string) => this.users.find((user) => user.id === id);

  findAll = (): UserEntity[] | [] => this.users;

  create = (user: UserEntity): UserEntity => {
    this.users = [...this.users, user];
    return user;
  };

  update = (id: string, update: UserEntity): UserEntity => {
    this.users = this.users.map((item) => {
      if (item.id === id) return update;
      return item;
    });
    return update;
  };

  remove = (id: string): void => {
    this.users = this.users.filter((item) => item.id !== id);
  };
}
