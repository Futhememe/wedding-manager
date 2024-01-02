import { IGuest } from "@/contexts/types";
import { fauna } from "@/lib/fauna";
import { query as Q } from "faunadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const updateResponse = await fauna.query(
      Q.Map(
        Q.Paginate(
          Q.Match(Q.Index('all_invites')), { size: 200 }
        ),
        Q.Lambda('X', Q.Get(Q.Var('X')))
      )
    )
    
    // @ts-ignore
    const guests = updateResponse?.data?.map((guest: {data: IGuest}) => guest.data)

    // @ts-ignore
    return NextResponse.json(guests, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      message: error
    }, { status: 404 })
  }
}