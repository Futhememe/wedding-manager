import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IGuest, IInvite } from "./types";
import { useDialog } from "@/components/Dialog/context/hook";

interface IManagerContext {
  guests: IGuest[];
  invites: IInvite[];
  getGuestById: (id: string) => IGuest | null;
  getInviteById: (id: string) => IInvite | null;
  openInvite: boolean;
  setOpenInvite: (open: boolean, invite?: string) => void;
  selectedInvite: string;
}

interface IManagerProvider {
  children: ReactNode | ReactNode[];
  guests: IGuest[];
  invites: IInvite[];
}

const ManagerContext = createContext<IManagerContext>({} as any);

export const ManagerProvider = ({
  children,
  guests,
  invites,
}: IManagerProvider) => {
  const [inviteopen, setinviteopen] = useState<boolean>(false);
  const [selectedInvite, setSelectedInvite] = useState<string>("");

  const getGuestById = (id: string): IGuest | null => {
    const guest = guests?.find((guest) => guest.id === id);

    return guest ?? null;
  };

  const getInviteById = (id: string): IInvite | null => {
    const invite = invites?.find((invite) => invite.id === id);

    return invite ?? null;
  };

  function handleOpenInvite(open: boolean, invite?: string) {
    setSelectedInvite(invite ?? "");
    setinviteopen(open);
  }

  return (
    <ManagerContext.Provider
      value={{
        guests,
        invites,
        getGuestById,
        getInviteById,
        openInvite: inviteopen,
        setOpenInvite: handleOpenInvite,
        selectedInvite,
      }}
    >
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => {
  const context = useContext(ManagerContext);

  return context;
};
