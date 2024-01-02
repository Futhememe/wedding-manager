import { IGuest, IInvite } from "@/contexts/types";
import { Actions, Container, Name, Pair } from "./styles";
import { Row } from "../Layout";
import { useManager } from "@/contexts/provider";
import { Tag } from "../Tag";
import { IconButton } from "../Button";
import { PencilLine, Trash } from "@phosphor-icons/react";

interface IInviteComponent {
  invite: IInvite;
}

export const Invite = ({ invite }: IInviteComponent) => {
  const { getGuestById } = useManager();

  return (
    <Container>
      <Row justifyContent="space-between">
        <Name>{invite.description}</Name>
        <Actions>
          <IconButton>
            <PencilLine size={20} />
          </IconButton>
          <IconButton>
            <Trash size={20} />
          </IconButton>
        </Actions>
      </Row>
      <Row justifyContent="space-between">
        <Row gap="0.5rem">
          {invite?.guests?.map((guest, index) => (
            <Tag key={guest.id}>{guest.name}</Tag>
          ))}
        </Row>
      </Row>
    </Container>
  );
};
