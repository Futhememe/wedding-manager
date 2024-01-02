import { fauna } from "@/lib/fauna";
import { randomUUID } from "crypto";
import { query as Q } from "faunadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { invite } = await req.json()

  if(!invite) {
    return NextResponse.json({
      message: 'id is required'
    }, { status: 400 })
  }

  try {
    const guestResponse = await fauna.query(
      Q.Create(
        Q.Collection('invites'),
        {
          data: {
            id: randomUUID(),
            ...invite
          }
        }
      )
    )
    // @ts-ignore
    return NextResponse.json(guestResponse.data, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      message: 'fail to create invite',
      error
    }, { status: 400 })
  }
}