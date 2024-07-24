import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useFieldArray, useWatch } from "react-hook-form";
import { IInviteSchema, inviteSchema } from "./schema";
import { useInviteStore } from "@/stores/inviteStore";

interface IInviteDrawer extends Omit<DrawerProps, "children"> {
  guestList?: {
    id: string;
    name: string;
  }[];
  onSave: (invite: IInviteSchema, inviteId?: string) => void;
  inviteId?: string | null;
}

export const InviteDrawer = ({
  guestList = [],
  onSave,
  inviteId,
  ...rest
}: IInviteDrawer) => {
  const [search, setSearch] = React.useState<string>("");
  const { getInviteById } = useInviteStore();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(inviteSchema),
  });

  function handleInvite(data: IInviteSchema) {
    if (inviteId) {
      onSave(data, inviteId);
      return;
    }
    onSave(data);
  }

  function populateGuest() {
    setValue(
      "guests",
      guestList.map((guest) => ({ ...guest, enabled: false }))
    );
  }

  useEffect(() => {
    if (rest.isOpen === false) {
      reset();
      setSearch("");
    }
  }, [rest.isOpen]);

  useEffect(() => {
    populateGuest();
    if (inviteId) {
      const invite = getInviteById(inviteId);

      setValue("description", invite?.description);
      setValue("phone", invite?.phone);
      setValue(
        "guests",
        guestList.map((guest) => {
          const invitedGuest = invite?.guests.find(
            (inviteGuest) => inviteGuest.id === guest.id
          );

          if (invitedGuest) {
            return { id: guest.id, name: guest.name, enabled: true };
          } else {
            return { id: guest.id, name: guest.name, enabled: false };
          }
        })
      );
    }
  }, [inviteId, guestList]);

  const guests: {
    id: string;
    name: string;
    enabled: boolean;
  }[] = useWatch({ control, name: "guests" });

  return (
    <Drawer {...rest} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Novo convite</DrawerHeader>

        <DrawerBody>
          <Flex flexDir="column" gap="1rem">
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <FormControl isInvalid={!!errors.description}>
                  <FormLabel>Nome do convite</FormLabel>
                  <Input type="text" {...field} />
                  <FormHelperText>
                    {errors.description
                      ? (errors.description.message as any)
                      : "Esse será o nome que aparecerá no site do convite"}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <FormControl isInvalid={!!errors.phone}>
                  <FormLabel>Número para contato</FormLabel>
                  <Input type="number" max={11} {...field} />
                  <FormHelperText>
                    {errors.phone
                      ? (errors.phone.message as any)
                      : "Número de contato onde o convite será enviado"}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Divider />
            <FormControl>
              <FormLabel>Buscar convidado</FormLabel>
              <Input
                type="text"
                placeholder="Nome do convidado"
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <CheckboxGroup
                colorScheme="orange"
                value={guests
                  ?.filter?.((guest) => guest.enabled)
                  .map((guest) => {
                    return guest.id;
                  })}
              >
                <FormLabel>Selecione os convidados do convite</FormLabel>
                <FormHelperText color="red" mt={-2} mb="8px">
                  {errors.guests ? (errors.guests.message as any) : ""}
                </FormHelperText>
                <Stack spacing={[1]} direction={"column"}>
                  {guestList
                    .filter((guest) =>
                      guest.name
                        ?.toLocaleLowerCase()
                        .includes(search?.toLocaleLowerCase())
                    )
                    .map((guest, index) => (
                      <Checkbox
                        onChange={(e) => {
                          setValue(
                            `guests.${index}.enabled`,
                            !getValues(`guests.${index}.enabled`)
                          );
                        }}
                        key={guest.id}
                        value={guest.id}
                      >
                        {guest.name}
                      </Checkbox>
                    ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </Flex>
        </DrawerBody>

        <DrawerFooter justifyContent={"space-between"}>
          <Button variant="outline" mr={3} onClick={rest.onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="orange"
            onClick={handleSubmit(handleInvite as any)}
          >
            Salvar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
