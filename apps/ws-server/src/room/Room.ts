import { User } from "../user/User";

export class Room {
  id: string;
  members: User[] = [];
  constructor(id: string, members: User[] = []) {
    this.id = id;
    this.members = members;
  }
}
