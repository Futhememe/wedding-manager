import { Tabs } from "@ark-ui/react";
import { Box } from "../Box";
import { Content, TabList, Trigger } from "../Ark/Tabs";
import { useManager } from "@/contexts/provider";
import { Guest } from "../Guest";

export const List = () => {
  const { guests } = useManager();

  return (
    <Box w="100%">
      <Tabs.Root defaultValue="inviteds">
        <TabList>
          <Trigger value="inviteds">Convidados</Trigger>
          <Trigger value="invite">Convites</Trigger>
        </TabList>
        <Content value="inviteds">
          {guests?.map((guest) => (
            <Guest key={guest.id} guest={guest} />
          ))}
        </Content>
        <Content value="invite">invite</Content>
      </Tabs.Root>
    </Box>
  );
};
