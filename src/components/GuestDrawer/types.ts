import { DrawerProps } from "@chakra-ui/react";
import { IGuestSchema } from "./schema";

export interface IGuestDrawer extends Omit<DrawerProps, "children"> {
  onSave: (guest: IGuestSchema) => void;
  guestId?: string | null;
}
