import { fauna } from "@/lib/fauna";
import { AxiosResponse } from "axios";
import { query as Q } from "faunadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { invite } = await req.json();

  if (!invite) {
    return NextResponse.json(
      {
        message: "invite is required",
      },
      { status: 400 }
    );
  }

  try {
    const response: AxiosResponse<
      { data: { name: string }; ref: { "@ref": { id: string } } }[]
    > = await fauna.query(
      Q.Create(Q.Collection("invites"), {
        data: {
          id: crypto.randomUUID(),
          ...invite,
        },
      })
    );

    if (response?.data?.length > 0) {
      const transformedArray = response?.data?.map((faunaItem) => ({
        ...faunaItem?.data,
      }));

      return NextResponse.json(transformedArray, { status: 200 });
    }

    // @ts-ignore
    return NextResponse.json([], { status: 200 });
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
  const { inviteId }: { inviteId: string } = await req.json();

  try {
    const response: AxiosResponse<
      { data: { name: string }; ref: { "@ref": { id: string } } }[]
    > = await fauna.query(
      Q.Delete(
        Q.Select("ref", Q.Get(Q.Match(Q.Index("invite_by_id"), inviteId)))
      )
    );

    // @ts-ignore
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "invite not found",
      },
      { status: 404 }
    );
  }
}

export async function PATCH(req: Request) {
  const invite = await req.json();

  if (!invite) {
    return NextResponse.json(
      {
        message: "id is required",
      },
      { status: 400 }
    );
  }

  try {
    const updateResponse = await fauna.query(
      Q.Update(
        Q.Select("ref", Q.Get(Q.Match(Q.Index("invite_by_id"), invite.id))),
        {
          data: invite,
        }
      )
    );
    // @ts-ignore
    return NextResponse.json(updateResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "fail to create invite",
        error,
      },
      { status: 400 }
    );
  }
}
