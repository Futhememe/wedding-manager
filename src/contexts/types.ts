export interface IGuest {
  name: string;
  status: string;
  type: string[];
  slug: string;
  pair: string;
  van: boolean;
  id: string;
}

export interface IInvite {
  id: string
  description: string
  guests: {
    id: string
    name: string
  }[]
}