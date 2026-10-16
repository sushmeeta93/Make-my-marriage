import { z } from "zod";

export const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid identifier");

export const calendarDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

export const clockTimeSchema = z.string().regex(/^\d{2}:\d{2}$/, "Use HH:mm");

export const rupeesSchema = z.number().int().nonnegative();
