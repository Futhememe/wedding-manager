import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { IInviteOutput, inviteSchema } from "./schema";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { useGuestStore } from "@/stores/guestStore";

export const useInviteForm = () => {
  const { guests } = useGuestStore();

  const { control, setValue, getValues, ...rest } = useForm({
    resolver: zodResolver(inviteSchema),
  });

  const { fields: guestsFields } = useFieldArray({
    control,
    name: "guests",
  });

  const guestSearch = useWatch({
    name: "guestSearch",
    control,
  });

  const normalizeText = (text: string) => {
    return (
      text
        ?.toLowerCase()
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") ?? ""
    );
  };

  function include(textToCompare: string, search: string) {
    return normalizeText(textToCompare).includes(normalizeText(search));
  }

  // async function handleConfirm({ guestSearch, ...rest }: IInviteOutput) {
  //   if (selectedInvite) {
  //     await api.patch("/invite", {
  //       invite: {
  //         ...rest,
  //         id: selectedInvite,
  //       },
  //     });
  //   } else {
  //     await api.post("/invite", {
  //       invite: rest,
  //     });
  //   }

  //   setOpenInvite(false);
  // }

  useEffect(() => {
    setValue(
      "guests",
      guests.map((guest) => ({
        id: guest.id,
        name: guest.name,
        enabled: false,
      }))
    );
  }, [guests]);

  // useEffect(() => {
  //   if (selectedInvite) {
  //     const invite = getInviteById(selectedInvite);

  //     setValue("description", invite?.description);
  //     setValue(
  //       "guests",
  //       guests.map((guest) => {
  //         const invitedGuest = invite?.guests.find(
  //           (inviteGuest) => inviteGuest.id === guest.id
  //         );

  //         if (invitedGuest) {
  //           return { id: guest.id, name: guest.name, enabled: true };
  //         } else {
  //           return { id: guest.id, name: guest.name, enabled: false };
  //         }
  //       })
  //     );
  //   }
  // }, [selectedInvite]);

  return {
    ...rest,
    guestsFields,
    control,
    getValues,
    include,
    guestSearch,
    // handleConfirm,
    // setOpenInvite,
  };
};
