"use client";
import { Box } from "@/components/Box";
import { DeleteModal } from "@/components/DeleteModal";
import { Guest } from "@/components/Guest";
import { GuestDrawer } from "@/components/GuestDrawer";
import { IGuestSchema } from "@/components/GuestDrawer/schema";
import { Invite } from "@/components/Invite";
import { InviteDrawer } from "@/components/InviteDrawer";
import { IInviteOutput } from "@/components/InviteDrawer/schema";
import { Menu } from "@/components/Menu";
import { api } from "@/lib/axios";
import { GuestDTO, useGuestStore } from "@/stores/guestStore";
import { InviteDTO, useInviteStore } from "@/stores/inviteStore";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { EnvelopeOpen, UserCheck } from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect } from "react";

async function createGuest({
  name,
  type,
  pair,
}: IGuestSchema): Promise<GuestDTO[] | null> {
  try {
    const res = await api.post("/guest", {
      name,
      type,
      pair,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    return null;
  }
}

async function createInvite(
  invite: IInviteOutput
): Promise<InviteDTO[] | null> {
  try {
    const res = await api.post("/invite", { invite });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    return null;
  }
}

interface IEditReq extends IGuestSchema {
  guestId: string;
}

async function editGuest({
  guestId,
  name,
  type,
  pair,
}: IEditReq): Promise<GuestDTO[] | null> {
  try {
    const res = await api.put("/guest", {
      guestId,
      name,
      type,
      pair,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    return null;
  }
}

async function editInvite(
  inviteId: string,
  invite: IInviteOutput
): Promise<InviteDTO[] | null> {
  try {
    const res = await api.patch("/invite", {
      id: inviteId,
      ...invite,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    return null;
  }
}

async function deleteGuest(guestId: string): Promise<GuestDTO[] | null> {
  try {
    const res = await api.delete("/guest", {
      data: {
        guestId,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    return null;
  }
}

async function deleteInvite(inviteId: string): Promise<InviteDTO[] | null> {
  try {
    const res = await api.delete("/invite", {
      data: {
        inviteId,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    return null;
  }
}

async function getAllGuests(): Promise<GuestDTO[] | null> {
  try {
    const res = await api.get("/guests");

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    return null;
  }
}

async function getAllInvites(): Promise<InviteDTO[] | null> {
  try {
    const res = await api.get("/invites");

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    return null;
  }
}

export default function Home() {
  const { setAllGuests, guests } = useGuestStore();
  const { setAllInvites, invites } = useInviteStore();
  const [selectedGuest, setSelectedGuest] = React.useState<string | null>(null);
  const [selectedInvite, setSelectedInvite] = React.useState<string | null>(
    null
  );
  const [guestSearch, setGuestSearch] = React.useState<string>("");
  const [inviteSearch, setInviteSearch] = React.useState<string>("");

  const [deleteVariant, setDeleteVariant] = React.useState<"guest" | "invite">(
    "guest"
  );

  const [guestLoading, setGuestLoading] = React.useState<boolean>(false);
  const [inviteLoading, setInviteLoading] = React.useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const {
    isOpen: isGuestOpen,
    onOpen: onGuestOpen,
    onClose: onGuestClose,
  } = useDisclosure();
  const guestBtnRef = React.useRef();

  const {
    isOpen: isInviteOpen,
    onOpen: onInviteOpen,
    onClose: onInviteClose,
  } = useDisclosure();
  const inviteBtnRef = React.useRef();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const deleteRef = React.useRef();

  function handleOpenDelete(variant: "guest" | "invite") {
    setDeleteVariant(variant);

    onDeleteOpen();
  }

  async function loadGuests() {
    setGuestLoading(true);
    const res = await getAllGuests();

    if (res) {
      setAllGuests({ guests: res ?? [] });
    }

    setGuestLoading(false);
  }

  async function loadInvites() {
    setInviteLoading(true);
    const res = await getAllInvites();

    if (res) {
      setAllInvites({ invites: res ?? [] });
    }

    setInviteLoading(false);
  }

  async function createNewGuest(guest: IGuestSchema) {
    const res = await createGuest(guest);

    if (res) {
      onGuestClose();
      loadGuests();
    }
  }

  async function createNewInvite(invite: IInviteOutput) {
    const res = await createInvite(invite);

    if (res) {
      onInviteClose();
      loadInvites();
    }
  }

  async function editExistingGuest(guestId: string, guest: IGuestSchema) {
    const res = await editGuest({ guestId, ...guest });

    if (res) {
      onGuestClose();
      loadGuests();
    }
  }

  async function editExistingInvite(inviteId: string, invite: IInviteOutput) {
    const res = await editInvite(inviteId, invite);

    if (res) {
      onInviteClose();
      loadInvites();
    }
  }

  async function removeExistingGuest(guestId: string) {
    setDeleteLoading(true);
    const res = await deleteGuest(guestId);

    if (res) {
      onDeleteClose();
      setSelectedGuest(null);
      loadGuests();
    }
    setDeleteLoading(false);
  }

  async function removeExistingInvite(inviteId: string) {
    setDeleteLoading(true);
    const res = await deleteInvite(inviteId);

    if (res) {
      onDeleteClose();
      setSelectedInvite(null);
      loadInvites();
    }
    setDeleteLoading(false);
  }

  useEffect(() => {
    loadGuests();
    loadInvites();
  }, []);

  useEffect(() => {
    if (!isDeleteOpen && selectedGuest) {
      onGuestOpen();
    }
  }, [isDeleteOpen, selectedGuest]);

  useEffect(() => {
    if (!isDeleteOpen && selectedInvite) {
      onInviteOpen();
    }
  }, [isDeleteOpen, selectedInvite]);

  useEffect(() => {
    if (!isGuestOpen) {
      setSelectedGuest(null);
    }
  }, [isGuestOpen]);

  useEffect(() => {
    if (!isInviteOpen) {
      setSelectedInvite(null);
    }
  }, [isInviteOpen]);

  return (
    <Flex
      flex={1}
      flexDir={["column", "column", "row"]}
      p={"1rem"}
      gap="1rem"
      position={"relative"}
    >
      <Flex
        flex={1}
        minW={"259px"}
        maxW={["100%", "100%", "259px"]}
        h={"fit-content"}
        position={"sticky"}
        top={"1rem"}
        bg={"white"}
        zIndex={2}
      >
        <Menu
          onClickNewGuest={onGuestOpen}
          guestBtnRef={guestBtnRef}
          onClickNewInvite={onInviteOpen}
          inviteBtnRef={inviteBtnRef}
        />
      </Flex>
      <Box>
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab _focus={{ color: "green.700" }} gap={"0.5rem"}>
              <UserCheck /> Convidados
            </Tab>
            <Tab _focus={{ color: "green.700" }} gap={"0.5rem"}>
              {" "}
              <EnvelopeOpen /> Convites
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="green.700"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <FormControl>
                <Input
                  value={guestSearch}
                  onChange={(e) => setGuestSearch(e.target.value)}
                  type="text"
                  placeholder="Pesquisar convidado"
                />
                <FormHelperText>Digite o nome do convidado</FormHelperText>
              </FormControl>
              {guests
                .filter((guest) =>
                  guest.name
                    ?.toLocaleLowerCase()
                    .includes(guestSearch?.toLocaleLowerCase())
                )
                .map((guest, index) => (
                  <Guest
                    key={index}
                    name={guest.name}
                    id={guest.id}
                    type={guest.type}
                    pair={guest?.pair}
                    status={guest.status}
                    onClickDelete={(id) => {
                      handleOpenDelete("guest");
                      setSelectedGuest(id);
                    }}
                    onClickEdit={(id) => setSelectedGuest(id)}
                  />
                ))}
              {guests.length <= 0 && !guestLoading && (
                <Text fontWeight={"500"} mt="1rem" textAlign={"center"}>
                  Adicione um novo convidado ao lado
                </Text>
              )}
              {guestLoading && (
                <Text fontWeight={"500"} mt="1rem" textAlign={"center"}>
                  Carregando convidados...
                </Text>
              )}
            </TabPanel>
            <TabPanel>
              <FormControl>
                <Input
                  value={inviteSearch}
                  onChange={(e) => setInviteSearch(e.target.value)}
                  type="text"
                  placeholder="Pesquisar convite"
                />
                <FormHelperText>Digite o convite</FormHelperText>
              </FormControl>
              {invites
                .filter((invite) =>
                  invite.description
                    ?.toLocaleLowerCase()
                    .includes(inviteSearch?.toLocaleLowerCase())
                )
                .map((invite, index) => (
                  <Invite
                    key={index}
                    invite={invite}
                    onClickDelete={(id) => {
                      handleOpenDelete("invite");
                      setSelectedInvite(id);
                    }}
                    onClickEdit={(id) => {
                      setSelectedInvite(id);
                    }}
                  />
                ))}
              {invites.length <= 0 && !inviteLoading && (
                <Text fontWeight={"500"} mt="1rem" textAlign={"center"}>
                  Adicione um novo convite ao lado
                </Text>
              )}
              {inviteLoading && (
                <Text fontWeight={"500"} mt="1rem" textAlign={"center"}>
                  Carregando convites...
                </Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <GuestDrawer
        placement="right"
        isOpen={isGuestOpen}
        onClose={onGuestClose}
        finalFocusRef={guestBtnRef as any}
        onSave={(guest) => {
          if (selectedGuest) {
            editExistingGuest(selectedGuest, guest);
            return;
          }
          createNewGuest(guest);
        }}
        guestId={selectedGuest}
      />
      <InviteDrawer
        placement="right"
        isOpen={isInviteOpen}
        onClose={onInviteClose}
        finalFocusRef={inviteBtnRef as any}
        guestList={guests.map((guest) => ({ name: guest.name, id: guest.id }))}
        onSave={(invite, inviteId) => {
          if (selectedInvite) {
            editExistingInvite(inviteId ?? "", invite);
            return;
          }
          createNewInvite(invite);
        }}
        inviteId={selectedInvite}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setSelectedGuest(null);
          setSelectedInvite(null);
          onDeleteClose();
        }}
        leastDestructiveRef={deleteRef as any}
        variant={deleteVariant}
        loading={deleteLoading}
        onConfirm={() => {
          if (deleteVariant === "guest") {
            removeExistingGuest(selectedGuest as any);
          }
          if (deleteVariant === "invite") {
            removeExistingInvite(selectedInvite as any);
          }
        }}
      />
    </Flex>
  );
}
