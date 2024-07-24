import { fauna } from "@/lib/fauna";
import { AxiosResponse } from "axios";
import { query as Q } from "faunadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    name,
    type,
    pair,
  }: { name: string; type?: string | null; pair?: string | null } =
    await req.json();

  const newGuest = {
    id: crypto?.randomUUID() ?? "",
    name: name,
    status: "Waiting",
    type: type != null ? [type] : [],
    pair: type != null ? pair : null,
  };

  try {
    const response: AxiosResponse<
      { data: { name: string }; ref: { "@ref": { id: string } } }[]
    > = await fauna.query(
      Q.Create(Q.Collection("guests"), {
        data: newGuest,
      })
    );

    // @ts-ignore
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "guest not found",
      },
      { status: 404 }
    );
  }
}

export async function PUT(req: Request) {
  const {
    guestId,
    name,
    type,
    pair,
  }: {
    name: string;
    type?: string | null;
    pair?: string | null;
    guestId: string;
  } = await req.json();

  try {
    const response: AxiosResponse<
      { data: { name: string }; ref: { "@ref": { id: string } } }[]
    > = await fauna.query(
      Q.Update(
        Q.Select("ref", Q.Get(Q.Match(Q.Index("guest_by_id"), guestId))),
        {
          data: {
            name,
            type: type ? [type] : [],
            pair: type ? (pair ? pair : null) : null,
          },
        }
      )
    );

    // @ts-ignore
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "guest not found",
      },
      { status: 404 }
    );
  }
}

export async function DELETE(req: Request) {
  const { guestId }: { guestId: string } = await req.json();

  try {
    const response: AxiosResponse<
      { data: { name: string }; ref: { "@ref": { id: string } } }[]
    > = await fauna.query(
      Q.Delete(Q.Select("ref", Q.Get(Q.Match(Q.Index("guest_by_id"), guestId))))
    );

    // @ts-ignore
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "guest not found",
      },
      { status: 404 }
    );
  }
}
