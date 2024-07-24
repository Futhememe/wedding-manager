import { fauna } from "@/lib/fauna";
import { AxiosResponse } from "axios";
import { query as Q } from "faunadb";
import { NextResponse } from "next/server";
export const revalidate = 0;

export async function GET() {
  try {
    const response: AxiosResponse<
      { data: { name: string }; ref: { "@ref": { id: string } } }[]
    > = await fauna.query(
      Q.Map(
        Q.Paginate(Q.Match(Q.Index("all_invites")), { size: 200 }),
        Q.Lambda("X", Q.Get(Q.Var("X")))
      )
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
