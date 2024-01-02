import { DialogContent } from "./DialogContent";
import { DialogTrigger } from "./DialogTrigger";
import { Dialog as DialogProvider } from "./context/provider";

export const Dialog = {
  Root: DialogProvider,
  Content: DialogContent,
  Trigger: DialogTrigger,
};
