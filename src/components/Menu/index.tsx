import { useGuestStore } from "@/stores/guestStore";
import { useInviteStore } from "@/stores/inviteStore";
import { Button, Divider, Flex, Heading } from "@chakra-ui/react";
import { MicrosoftExcelLogo, Plus } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import React from "react";
import { utils, writeFile } from "xlsx";

interface IMenu {
  onClickNewGuest: () => void;
  guestBtnRef: React.MutableRefObject<undefined>;

  onClickNewInvite: () => void;
  inviteBtnRef: React.MutableRefObject<undefined>;
}

export const Menu = ({
  guestBtnRef,
  onClickNewGuest,
  inviteBtnRef,
  onClickNewInvite,
}: IMenu) => {
  const { guests } = useGuestStore();
  const { invites } = useInviteStore();

  function createXlsx() {
    const formattedData = guests
      .filter((guest) => guest.status === "Accepted")
      .map((guest, index) => ({
        name: guest.name,
        type: guest.type[0] !== "convidado" ? guest.type[0].toUpperCase() : "",
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    /* generate worksheet and workbook */
    const worksheet = utils.json_to_sheet([
      ...formattedData,
      { name: "", type: "" },
      {
        name: "Total de convidados",
        type: guests.filter((guest) => guest.status === "Accepted").length,
      },
    ]);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet);

    /* fix headers */
    utils.sheet_add_aoa(worksheet, [["Nome", "Tipo do convidado"]], {
      origin: "A1",
    });

    /* calculate column width */
    const max_width = formattedData.reduce(
      (w, r) => Math.max(w, r.name.length),
      10
    );
    worksheet["!cols"] = [{ wch: max_width }];

    /* create an XLSX file and try to save to Presidents.xlsx */
    writeFile(workbook, "lista_de_convidados.xlsx", { compression: true });
  }

  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      border={"1px solid #e9eaef"}
      borderRadius={"xl"}
      p={"1rem"}
      color={"#262626"}
      gap={"1rem"}
      bg="white"
      zIndex={2}
    >
      <Heading fontSize={"large"} fontWeight={"500"}>
        Painel de tarefas
      </Heading>
      <Flex flexDir={"column"} gap={"0.5rem"}>
        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 2 }}>
          <Button
            ref={inviteBtnRef as any}
            onClick={onClickNewInvite}
            justifyContent={"flex-start"}
            colorScheme={"green"}
            gap={"0.5rem"}
            w={"100%"}
          >
            <Plus weight="bold" /> Adicionar convite
          </Button>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 2 }}>
          <Button
            ref={guestBtnRef as any}
            className="invite-button"
            justifyContent={"flex-start"}
            w={"100%"}
            onClick={onClickNewGuest}
          >
            Adicionar convidado
          </Button>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} whileTap={{ y: 2 }}>
          <Button
            justifyContent={"flex-start"}
            w={"100%"}
            display={"flex"}
            gap={"8px"}
            variant={"ghost"}
            colorScheme="green"
            onClick={createXlsx}
          >
            <MicrosoftExcelLogo />
            Gerar planilha
          </Button>
        </motion.div>
      </Flex>
      <Divider />
      <Flex flexDir={"column"} gap={"0.5rem"}>
        {invites.length > 0 && (
          <Button
            disabled={true}
            justifyContent={"flex-start"}
            variant={"outline"}
            cursor={"default"}
          >
            {invites?.length} convites
          </Button>
        )}
        {guests.length > 0 && (
          <Button
            disabled={true}
            justifyContent={"flex-start"}
            variant={"outline"}
            cursor={"default"}
          >
            {guests?.length} convidados
          </Button>
        )}
        {guests.filter((guest) => guest.status === "Accepted").length > 0 && (
          <Button
            disabled={true}
            justifyContent={"flex-start"}
            variant={"outline"}
            colorScheme="green"
            cursor={"default"}
          >
            {guests.filter((guest) => guest.status === "Accepted").length}{" "}
            confirmados
          </Button>
        )}
        {guests.filter((guest) => guest.status === "Denied").length > 0 && (
          <Button
            disabled={true}
            justifyContent={"flex-start"}
            variant={"outline"}
            colorScheme="red"
            cursor={"default"}
          >
            {guests.filter((guest) => guest.status === "Denied").length} não
            irão
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
