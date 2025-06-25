import z from "zod";

export const zCreatePostTrpcInput = z.object({
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters.')
    .max(254, 'Slug must be less than 254 characters.')
    .regex(/^[a-z0-9-]+$/, 'Slug may contain only lowercase letters, numbers and dashes'),
  title: z.string().min(2, 'Title must be at least 2 characters.').max(254, 'Title must be less than 254 characters.'),
  excerpt: z
    .string()
    .min(2, 'Excerpt must be at least 2 characters.')
    .max(254, 'Excerpt must be less than 254 characters.'),
  content: z.string().min(2, 'Content must be at least 2 characters.'),
  createdAt: z.date(),
})
