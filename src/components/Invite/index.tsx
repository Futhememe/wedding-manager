import { IGuest, IInvite } from "@/contexts/types";
import { Actions, Container, Name, Pair } from "./styles";
import { Row } from "../Layout";
import { useManager } from "@/contexts/provider";
import { Tag } from "../Tag";
import { IconButton } from "../Button";
import { Link, PencilLine, Trash } from "@phosphor-icons/react";
import { useClipboard } from "./hooks/useClipboard";

interface IInviteComponent {
  invite: IInvite;
}

export const Invite = ({ invite }: IInviteComponent) => {
  const { setOpenInvite } = useManager();
  const { hasCopied, onCopy } = useClipboard(
    `Queridos amigos e familiares,\nÉ com muita alegria que convidamos para celebrar esse momento especial conosco. Nosso casamento!✨\n\nPara facilitar a organização, optamos por utilizar um site como convite oficial. Nele, vocês encontrarão todas as informações necessárias, incluindo, o horário da cerimônia, o local da festa, a lista de presentes, detalhes sobre como ir de van e outras informações importantes.\n\nAcessem nosso site https://wedding.withgu.com/${invite.id} para confirmar presença e obter todos os detalhes. Esperamos ansiosamente por esse dia e pela presença de cada um de vocês!\n\nEsther e Gustavo🤍`
  );

  return (
    <Container>
      <Row justifyContent="space-between">
        <Name>{invite.description}</Name>
        <Actions>
          <IconButton onClick={() => onCopy()}>
            <Link size={20} />
          </IconButton>
          <IconButton onClick={() => setOpenInvite(true, invite.id)}>
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
