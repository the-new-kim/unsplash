// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PhotoData } from "./list";

export interface BannerResult {
  result?: PhotoData;
  isLoading: boolean;
  error: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await fetch(
    `${
      process.env.DATABASE_URL! + "random/?client_id=" + process.env.ACCESS_KEY
    }`
  );

  const data = await response.json();

  if (!data) {
    res.status(200).json({ isLoading: false, error: true });
  }
  res.status(200).json({
    results: data,
    isLoading: false,
    error: false,
  });
}
