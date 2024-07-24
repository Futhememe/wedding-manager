import { z } from "zod";

export type IGuestSchema = z.infer<typeof guestSchema>;

export const guestSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  type: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" })
    .default("convidado"),
  pair: z.string({ required_error: "Campo obrigatório" }).optional(),
});
