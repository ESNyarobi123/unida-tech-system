import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message too short"),
});

export const subscribeSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type SubscribeInput = z.infer<typeof subscribeSchema>;
