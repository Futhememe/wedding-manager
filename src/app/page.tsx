"use client";
import { css } from "@styled-system/css";
import { Actions } from "@/components/Actions";
import { List } from "@/components/List";
import { ManagerProvider } from "@/contexts/provider";
import { IGuest } from "@/contexts/types";
import { api } from "@/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";

async function getAllGuests(): Promise<IGuest[] | null> {
  try {
    const res = await api.get("/guest/all");

    return res.data ?? [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    return null;
  }
}

export default function Home() {
  const [guests, setGuests] = useState<IGuest[]>([]);

  async function handleAllGuests() {
    const res = await getAllGuests();

    setGuests(res ?? []);
  }

  useEffect(() => {
    handleAllGuests();
  }, []);

  return (
    <ManagerProvider guests={guests}>
      <main
        className={css({
          display: "flex",
          flexDir: "column",
          alignItems: "center",
        })}
      >
        <div
          className={css({
            display: "flex",
            gap: "1rem",
            w: "100%",
            maxW: "1136px",
            justifyContent: "center",
            p: "1rem",
          })}
        >
          <Actions />
          <List />
        </div>
      </main>
    </ManagerProvider>
  );
}
