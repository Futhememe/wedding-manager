import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IBox {
  children: ReactNode | ReactNode[];
}

export const Box = ({ children }: IBox) => {
  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      border={"1px solid #e9eaef"}
      borderRadius={"xl"}
      p={"1rem"}
      color={"#262626"}
      gap={"1rem"}
    >
      {children}
    </Flex>
  );
};
