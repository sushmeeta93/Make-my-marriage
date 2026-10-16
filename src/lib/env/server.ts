import { z } from "zod";

const serverEnvSchema = z.object({
  AUTH_SECRET: z.string().min(32).optional(),
  MONGODB_URI: z.string().min(1).optional(),
  MONGODB_DB: z.string().min(1).default("makemymarriage-dev"),
  R2_ACCOUNT_ID: z.string().min(1).optional(),
  R2_ACCESS_KEY_ID: z.string().min(1).optional(),
  R2_SECRET_ACCESS_KEY: z.string().min(1).optional(),
  R2_PRIVATE_BUCKET: z.string().min(1).default("mmm-private"),
  R2_PUBLIC_BUCKET: z.string().min(1).default("mmm-public"),
  R2_PUBLIC_BASE_URL: z.url().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().min(1).optional(),
  GOOGLE_PLACES_API_KEY: z.string().min(1).optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let parsedEnv: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  parsedEnv ??= serverEnvSchema.parse(process.env);
  return parsedEnv;
}
