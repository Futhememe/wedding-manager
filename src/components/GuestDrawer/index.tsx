"use client";
import { useGuestStore } from "@/stores/guestStore";
import {
  Button,
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
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IGuestSchema, guestSchema } from "./schema";
import { IGuestDrawer } from "./types";

export const GuestDrawer = ({ onSave, guestId, ...rest }: IGuestDrawer) => {
  const { guests, getGuestById } = useGuestStore();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(guestSchema),
  });

  const type = useWatch({ control, name: "type", defaultValue: "convidado" });

  const padrinhos = useMemo(
    () => guests.filter((guest) => guest.type.includes("padrinho")),
    [guests]
  );
  const madrinhas = useMemo(
    () => guests.filter((guest) => guest.type.includes("madrinha")),
    [guests]
  );

  function handleFormSubmit(data: IGuestSchema) {
    onSave(data);
  }

  useEffect(() => {
    if (guestId) {
      const guest = getGuestById(guestId);

      setValue("name", guest?.name);
      setValue("type", guest?.type?.[0]);
      setValue("pair", guest?.pair);
    } else {
      reset();
    }
  }, [guestId]);

  return (
    <Drawer {...rest} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Adicionar convidado</DrawerHeader>

        <DrawerBody>
          <Flex flexDir="column" gap="1rem">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Nome do convidado</FormLabel>
                  <Input className="guest-name" type="text" {...field} />
                  <FormHelperText>
                    {errors.name
                      ? (errors.name.message as any)
                      : "Digite o nome completo do convidado"}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              defaultValue={"convidado"}
              name="type"
              render={({ field }) => (
                <FormControl as="fieldset">
                  <FormLabel as="legend">Tipo do convidado</FormLabel>
                  <RadioGroup colorScheme="orange" {...field}>
                    <HStack spacing="24px">
                      <Radio
                        value="convidado"
                        checked={field.value === "convidado"}
                      >
                        Convidado
                      </Radio>
                      <Radio
                        value="padrinho"
                        checked={field.value === "padrinho"}
                      >
                        Padrinho
                      </Radio>
                      <Radio
                        value="madrinha"
                        checked={field.value === "madrinha"}
                      >
                        Madrinha
                      </Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText>Selecione o tipo do convidado</FormHelperText>
                </FormControl>
              )}
            />
            {type !== "convidado" && (
              <Controller
                control={control}
                name="pair"
                render={({ field }) => (
                  <FormControl>
                    <Select
                      placeholder="Selecione a pessoa que fará par com ela(e)"
                      {...field}
                    >
                      {type === "madrinha" &&
                        padrinhos.map((guest) => (
                          <option value={guest.id} key={guest.id}>
                            {guest.name}
                          </option>
                        ))}
                      {type === "padrinho" &&
                        madrinhas.map((guest) => (
                          <option value={guest.id} key={guest.id}>
                            {guest.name}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                )}
              />
            )}
          </Flex>
        </DrawerBody>

        <DrawerFooter justifyContent={"space-between"}>
          <Button variant="outline" mr={3} onClick={rest.onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="orange"
            className="guest-save-button"
            onClick={handleSubmit(handleFormSubmit as any)}
          >
            Salvar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
