import { useGuestStore } from "@/stores/guestStore";
import { Badge, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Pencil, Trash, TrashSimple } from "@phosphor-icons/react";
import { css } from "@/styled-system/css";

interface IGuest {
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
  id: string;
  name: string;
  type: string[];
  pair?: string | null;
  status?: "Waiting" | "Accepted" | "Denied";
}

export const Guest = ({
  onClickDelete,
  onClickEdit,
  name,
  pair,
  type = [],
  id,
  status,
}: IGuest) => {
  const { getGuestById } = useGuestStore();

  return (
    <Flex
      p={"8px 0 16px"}
      flexDir={"column"}
      w={"100%"}
      borderBottom={"1px solid #e9eaef"}
      gap={"0.25rem"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading fontSize={"large"}>{name}</Heading>
        <Flex>
          <IconButton
            aria-label="edit"
            variant="ghost"
            onClick={() => onClickEdit(id)}
          >
            <Pencil size={20} />
          </IconButton>
          <IconButton
            aria-label="delete"
            variant="ghost"
            onClick={() => onClickDelete(id)}
          >
            <Trash size={20} />
          </IconButton>
        </Flex>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        {pair && (
          <Text>
            {type[0]} com: <b>{getGuestById(pair)?.name}</b>
          </Text>
        )}
        <div className={css({ display: "flex", gap: "8px" })}>
          {type.map((guestType, index) => (
            <Badge
              key={index}
              h={"fit-content"}
              w="fit-content"
              variant={"subtle"}
              colorScheme="whatsapp"
            >
              {guestType}
            </Badge>
          ))}
          {status && status !== "Waiting" && (
            <Badge
              h={"fit-content"}
              w="fit-content"
              variant={"solid"}
              colorScheme={status === "Accepted" ? "green" : "red"}
            >
              {status === "Accepted" ? "Confirmado" : "Não vai"}
            </Badge>
          )}
        </div>
      </Flex>
    </Flex>
  );
};
