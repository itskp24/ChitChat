import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  roomId: serial("room_id").references(() => rooms.id),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  username: text("username").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRoomSchema = createInsertSchema(rooms).pick({
  code: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  roomId: true,
  content: true,
  imageUrl: true,
  username: true,
});

export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Room = typeof rooms.$inferSelect;
export type Message = typeof messages.$inferSelect;