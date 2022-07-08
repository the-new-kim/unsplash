// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

console.log(process.env.DATABASE_URL);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = await (
    await fetch(
      `${process.env.DATABASE_URL! + "/?client_id=" + process.env.ACCESS_KEY}`,
      {}
    )
  ).json();

  if (!data) {
    res.status(200).json({ ok: false });
  }
  res.status(200).json(data);
}
