import { z } from "zod";

export type IInviteInput = z.input<typeof inviteSchema>
export type IInviteOutput = z.output<typeof inviteSchema>

export const inviteSchema = z.object({
  description: z.string(),
  guestSearch: z.string().optional(),
  guests: z.array(z.object({
    id: z.string(),
    name: z.string(),
    enabled: z.boolean().default(false)
  }))
  .transform(guests => guests.filter(guest => guest.enabled))
})