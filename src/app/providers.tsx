// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Toaster, toast } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider resetCSS>
      <Toaster richColors />
      {children}
    </ChakraProvider>
  );
}
