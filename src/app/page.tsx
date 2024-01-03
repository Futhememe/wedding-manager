"use client";
import { css } from "@styled-system/css";
import { Actions } from "@/components/Actions";
import { List } from "@/components/List";
import { ManagerProvider } from "@/contexts/provider";
import { IGuest, IInvite } from "@/contexts/types";
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

export async function getAllInvites(): Promise<IInvite[] | null> {
  try {
    const res = await api.get("/invite/all");

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
  const [invites, setInvites] = useState<IInvite[]>([]);

  async function handleAllGuests() {
    const res = await getAllGuests();

    setGuests(res ?? []);
  }

  async function handleAllInvites() {
    const res = await getAllInvites();

    setInvites(res ?? []);
  }

  function handleReset() {
    handleAllGuests();
    handleAllInvites();
  }

  useEffect(() => {
    handleAllGuests();
    handleAllInvites();
  }, []);

  return (
    <ManagerProvider guests={guests} invites={invites}>
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
            flexDir: ["column", "row"],
            gap: "1rem",
            w: "100%",
            maxW: "1136px",
            justifyContent: "center",
            p: "1rem",
          })}
        >
          <Actions reload={handleReset} />
          <List />
        </div>
      </main>
    </ManagerProvider>
  );
}
