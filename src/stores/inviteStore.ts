import { create } from "zustand";

export type InviteDTO = {
  id: string;
  description: string;
  phone: string;
  guests: {
    id: string;
    name: string;
  }[];
};

interface InviteStoreDTO {
  invites: InviteDTO[];
  setAllInvites: ({ invites }: { invites: InviteDTO[] }) => void;
  addInvite: ({ invite }: { invite: InviteDTO }) => void;
  removeInvite: (id: string) => void;
  editInvite: ({ id, invite }: { id: string; invite: InviteDTO }) => void;
  getInviteById: (id: string) => InviteDTO | undefined;
}

const addInvite = (state: any, invite: InviteDTO) => {
  let oldState = [...state.invites];

  oldState.push(invite);

  return oldState;
};

const removeInvite = (state: any, id: string) => {
  let oldState = [...state.invites];

  const index = oldState.findIndex((item) => item.id == id);
  oldState.splice(index, 1);

  return oldState;
};

const editInvite = (state: any, id: string, invite: InviteDTO) => {
  let oldState = [...state.invites];

  const index = oldState.findIndex((item) => item.id == id);
  oldState[index] = invite;

  return oldState;
};

// @ts-ignore
export const useInviteStore = create<InviteStoreDTO>((set, get) => ({
  invites: [],
  setAllInvites: ({ invites }: { invites: InviteDTO[] }) =>
    set((state) => ({ invites: invites })),
  addInvite: ({ invite }: { invite: InviteDTO }) =>
    set((state) => ({ invites: addInvite(state, invite) })),
  removeInvite: (id) => set((state) => ({ invites: removeInvite(state, id) })),
  editInvite: ({ id, invite }) =>
    set((state) => ({ invites: editInvite(state, id, invite) })),
  getInviteById: (id) => get().invites.find((invite) => invite.id === id),
}));
