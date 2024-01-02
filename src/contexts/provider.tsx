import { ReactNode, createContext, useContext } from "react";
import { IGuest, IInvite } from "./types";

interface IManagerContext {
  guests: IGuest[];
  invites: IInvite[];
  getGuestById: (id: string) => IGuest | null;
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
  const getGuestById = (id: string): IGuest | null => {
    const guest = guests?.find((guest) => guest.id === id);

    return guest ?? null;
  };

  return (
    <ManagerContext.Provider
      value={{
        guests,
        invites,
        getGuestById,
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
