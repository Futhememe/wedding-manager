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
  openInvite: boolean;
  setOpenInvite: (open: boolean) => void;
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
  const getGuestById = (id: string): IGuest | null => {
    const guest = guests?.find((guest) => guest.id === id);

    return guest ?? null;
  };

  function handleOpenInvite(open: boolean) {
    setinviteopen(open);
  }

  return (
    <ManagerContext.Provider
      value={{
        guests,
        invites,
        getGuestById,
        openInvite: inviteopen,
        setOpenInvite: handleOpenInvite,
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
