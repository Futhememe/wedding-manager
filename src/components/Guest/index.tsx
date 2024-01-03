import { IGuest } from "@/contexts/types";
import { Container, Name, Pair } from "./styles";
import { Row } from "../Layout";
import { useManager } from "@/contexts/provider";
import { Tag } from "../Tag";

interface IGuestComponent {
  guest: IGuest;
}

const status = {
  Waiting: "Aguardando",
  Denied: "Ausente",
  Accepted: "Confirmado",
};

const statusColor = {
  Waiting: "yellow.100",
  Denied: "red.100",
  Accepted: "green.100",
};

export const Guest = ({ guest }: IGuestComponent) => {
  const { getGuestById } = useManager();

  return (
    <Container>
      <Row>
        <Name>{guest.name}</Name>
      </Row>
      <Row justifyContent="space-between">
        {guest?.pair && (
          <Pair>
            {guest?.type[0]} com: <b>{getGuestById(guest.pair)?.name}</b>
          </Pair>
        )}
        <Row gap="0.5rem">
          {guest?.type?.map((type, index) => (
            <Tag key={index}>{type}</Tag>
          ))}
          {guest.status && (
            // @ts-ignore
            <Tag bgColor={statusColor[guest.status]}>
              {/* @ts-ignore */}
              {status[guest.status]}
            </Tag>
          )}
          {guest?.van && <Tag bgColor={"red.300"}>Quer ir de van</Tag>}
        </Row>
      </Row>
    </Container>
  );
};
