import { ReactNode, createContext, useContext } from "react";
import { IGuest } from "./types";

interface IManagerContext {
  guests: IGuest[];
  getGuestById: (id: string) => IGuest | null;
}

interface IManagerProvider {
  children: ReactNode | ReactNode[];
  guests: IGuest[];
}

const ManagerContext = createContext<IManagerContext>({} as any);

export const ManagerProvider = ({ children, guests }: IManagerProvider) => {
  const getGuestById = (id: string): IGuest | null => {
    const guest = guests?.find((guest) => guest.id === id);

    return guest ?? null;
  };

  return (
    <ManagerContext.Provider
      value={{
        guests,
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
