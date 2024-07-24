import { create } from "zustand";

export type GuestDTO = {
  id: string;
  name: string;
  status: "Waiting" | "Accepted" | "Denied";
  pair: string | null;
  type: string[];
  slug?: string;
  ref?: string;
};

interface GuestStoreDTO {
  guests: GuestDTO[];
  setAllGuests: ({ guests }: { guests: GuestDTO[] }) => void;
  addGuest: ({ guest }: { guest: GuestDTO }) => void;
  removeGuest: (id: string) => void;
  editGuest: ({ id, guest }: { id: string; guest: GuestDTO }) => void;
  getGuestById: (id: string) => GuestDTO | undefined;
}

const addGuest = (state: any, guest: GuestDTO) => {
  let oldState = [...state.guests];

  oldState.push(guest);

  return oldState;
};

const removeGuest = (state: any, id: string) => {
  let oldState = [...state.guests];

  const index = oldState.findIndex((item) => item.id == id);
  oldState.splice(index, 1);

  return oldState;
};

const editGuest = (state: any, id: string, guest: GuestDTO) => {
  let oldState = [...state.guests];

  const index = oldState.findIndex((item) => item.id == id);
  oldState[index] = guest;

  return oldState;
};

// @ts-ignore
export const useGuestStore = create<GuestStoreDTO>((set, get) => ({
  guests: [],
  setAllGuests: ({ guests }: { guests: GuestDTO[] }) =>
    set((state) => ({ guests: guests })),
  addGuest: ({ guest }: { guest: GuestDTO }) =>
    set((state) => ({ guests: addGuest(state, guest) })),
  removeGuest: (id) => set((state) => ({ guests: removeGuest(state, id) })),
  editGuest: ({ id, guest }) =>
    set((state) => ({ guests: editGuest(state, id, guest) })),
  getGuestById: (id) => get().guests.find((guest) => guest.id === id),
}));
