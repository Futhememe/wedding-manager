import { Client } from "faunadb";

export const fauna = new Client({
  secret: `${process.env.FAUNA_SECRET}`,
  domain: "db.us.fauna.com",
  port: 443,
  scheme: "https",
});
