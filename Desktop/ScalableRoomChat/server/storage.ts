import { rooms, messages, type Room, type Message, type InsertRoom, type InsertMessage } from "@shared/schema";
import crypto from 'crypto';

export interface IStorage {
  createRoom(): Promise<Room>;
  getRoom(code: string): Promise<Room | undefined>;
  getRoomMessages(roomId: number): Promise<Message[]>;
  addMessage(message: InsertMessage): Promise<Message>;
  deleteRoom(roomId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private rooms: Map<number, Room>;
  private messages: Map<number, Message[]>;
  private currentRoomId: number;
  private currentMessageId: number;

  constructor() {
    this.rooms = new Map();
    this.messages = new Map();
    this.currentRoomId = 1;
    this.currentMessageId = 1;
  }

  generateRoomCode(): string {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
  }

  async createRoom(): Promise<Room> {
    const id = this.currentRoomId++;
    const code = this.generateRoomCode();
    const room: Room = {
      id,
      code,
      createdAt: new Date()
    };
    this.rooms.set(id, room);
    this.messages.set(id, []);
    return room;
  }

  async getRoom(code: string): Promise<Room | undefined> {
    return Array.from(this.rooms.values()).find(room => room.code === code);
  }

  async getRoomMessages(roomId: number): Promise<Message[]> {
    return this.messages.get(roomId) || [];
  }

  async addMessage(message: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const newMessage: Message = {
      id,
      ...message,
      createdAt: new Date()
    };
    
    const roomMessages = this.messages.get(message.roomId) || [];
    roomMessages.push(newMessage);
    this.messages.set(message.roomId, roomMessages);
    
    return newMessage;
  }

  async deleteRoom(roomId: number): Promise<void> {
    this.rooms.delete(roomId);
    this.messages.delete(roomId);
  }
}

export const storage = new MemStorage();
