import { z } from "zod";

export type IInviteSchema = z.infer<typeof inviteSchema>;
export type IInviteOutput = z.output<typeof inviteSchema>;

export const inviteSchema = z
  .object({
    description: z
      .string({ required_error: "Campo obrigatório" })
      .min(1, { message: "Campo obrigatório" }),
    phone: z
      .string({ required_error: "Campo obrigatório" })
      .min(1, { message: "Campo obrigatório" })
      .max(11, { message: "Numero invalido" }),
    guests: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          enabled: z.boolean().default(false),
        }),
        { required_error: "Selecione um convidado para o convite" }
      )
      .transform((guests) => guests.filter((guest) => guest.enabled)),
  })
  .superRefine((invite, ctx) => {
    if (invite.guests.length <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione pelo menos um convidado",
        path: ["guests"],
      });
    }
  });
