import {
  ArrowClockwise,
  Envelope,
  Plus,
  User,
  UserPlus,
} from "@phosphor-icons/react";
import { Box, BoxButton } from "../Box";
import { Heading } from "../Layout";
import { Dialog } from "../Dialog";
import { InviteForm } from "../Forms/Invite";
import { useManager } from "@/contexts/provider";

interface IActions {
  reload: () => void;
}

export const Actions = ({ reload }: IActions) => {
  const { guests, invites, openInvite, setOpenInvite } = useManager();

  return (
    <Box w="343px" position={["relative", "sticky"]} top="1rem">
      <Heading>Lista de casamento</Heading>
      <Dialog.Root
        open={openInvite}
        initialOpen={false}
        onOpenChange={(open) => setOpenInvite(open)}
      >
        <Dialog.Trigger asChild>
          <BoxButton variant="primary" onClick={() => setOpenInvite(true)}>
            {" "}
            <Plus size={20} />
            Adicionar convite
          </BoxButton>
        </Dialog.Trigger>
        <Dialog.Content>
          <InviteForm />
        </Dialog.Content>
      </Dialog.Root>
      <BoxButton disabled>
        <UserPlus size={20} />
        Adicionar convidado
      </BoxButton>
      <Box p="0.75rem" mt="1rem" flexDir="row">
        <Envelope size={20} />
        {invites.length} convites
      </Box>
      <Box p="0.75rem" flexDir="row">
        <User size={20} />
        {guests.length} convidados
      </Box>
      <BoxButton onClick={reload}>
        <ArrowClockwise size={20} />
        Recarregar
      </BoxButton>
    </Box>
  );
};
