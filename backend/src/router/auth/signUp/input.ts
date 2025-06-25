import { z } from 'zod'

export const zSignUpTrpcInput = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(1),
    confirm_password: z.string().min(1),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must be the same',
        path: ['confirm_password'],
      })
    }
  })
