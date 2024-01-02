import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import { IInviteOutput, inviteSchema } from "./schema"
import { useManager } from "@/contexts/provider"
import { useEffect } from "react"
import { normalizeText } from "@/utils/normalize"
import { api } from "@/lib/axios"

export const useInviteForm = () => {
  const { control, setValue, getValues, ...rest } = useForm({
    resolver: zodResolver(inviteSchema)
  })

  const { guests, setOpenInvite, selectedInvite, getInviteById } = useManager()

  const { fields: guestsFields } = useFieldArray({
    control,
    name: 'guests',
  })

  const guestSearch = useWatch({
    name: 'guestSearch',
    control
  })

  function include(textToCompare: string, search: string) {
    return normalizeText(textToCompare).includes(normalizeText(search))
  }

  async function handleConfirm({guestSearch, ...rest}: IInviteOutput) {
    if(selectedInvite) {
      await api.patch('/invite', {
        invite: {
          ...rest,
          id: selectedInvite
        }
      })
    } else {
      await api.post('/invite', {
        invite: rest
      })
    }

    setOpenInvite(false)
  }

  useEffect(() => {
    setValue('guests', guests.map(guest => ({ id: guest.id, name: guest.name, enabled: false })))
  }, [guests])

  useEffect(() => {
    if(selectedInvite) {
      const invite = getInviteById(selectedInvite)

      setValue('description', invite?.description)
      setValue('guests', guests.map(guest => {
        const invitedGuest = invite?.guests.find(inviteGuest => inviteGuest.id === guest.id)

        if(invitedGuest) {
          return { id: guest.id, name: guest.name, enabled: true }
        }else {
          return { id: guest.id, name: guest.name, enabled: false }
        }
      }))
    } 
  }, [selectedInvite])

  return {
    ...rest,
    guestsFields,
    control,
    getValues,
    include,
    guestSearch,
    handleConfirm,
    setOpenInvite
  }
}