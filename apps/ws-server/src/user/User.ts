import { Room } from "../room/Room.js";

export class User {
  id: string;
  username: string;
  room: Room;
  constructor(id: string, username: string, room: Room) {
    this.id = id;
    this.username = username;
    this.room = room;
  }
}
