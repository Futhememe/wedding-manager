import { InviteDTO } from "@/stores/inviteStore";
import { Badge, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Link, Pencil, Trash } from "@phosphor-icons/react";
import { useInvite } from "./hooks/useInvite";

interface IInvite {
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
  invite: InviteDTO;
}

export const Invite = ({ onClickDelete, onClickEdit, invite }: IInvite) => {
  const { onCopy, sendWhatsapp } = useInvite({ inviteId: invite.id });

  return (
    <Flex
      p={"8px 0 16px"}
      flexDir={"column"}
      w={"100%"}
      borderBottom={"1px solid #e9eaef"}
      gap={"0.25rem"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading fontSize={"large"}>{invite?.description ?? ""}</Heading>
        <Flex>
          <IconButton
            aria-label="edit"
            variant="ghost"
            onClick={() => {
              if (invite?.phone) {
                sendWhatsapp(invite?.phone);
                return;
              }
              onCopy();
            }}
          >
            <Link size={20} />
          </IconButton>
          <IconButton
            aria-label="edit"
            variant="ghost"
            onClick={() => onClickEdit(invite.id)}
          >
            <Pencil size={20} />
          </IconButton>
          <IconButton
            aria-label="delete"
            variant="ghost"
            onClick={() => onClickDelete(invite.id)}
          >
            <Trash size={20} />
          </IconButton>
        </Flex>
      </Flex>
      <Flex alignItems={"center"} gap={"0.5rem"} flexWrap={"wrap"}>
        <Text>Número de contato: </Text>
        <Text fontWeight={"bold"}>{invite?.phone}</Text>
      </Flex>
      <Flex alignItems={"center"} gap={"0.5rem"} flexWrap={"wrap"}>
        <Text>Pessoas no convite: </Text>
        {invite?.guests?.map((guest, index) => (
          <Badge
            key={index}
            h={"fit-content"}
            w="fit-content"
            variant="subtle"
            colorScheme="green"
          >
            {guest?.name}
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
};
