import { ReactNode } from "react";
import { TagContainer } from "./styles";

interface ITag {
  children: ReactNode | ReactNode[];
}

export const Tag = ({ children }: ITag) => {
  return <TagContainer>{children}</TagContainer>;
};
