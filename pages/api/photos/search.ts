// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PhotoData } from "./list";

export interface SearchResult {
  results: PhotoData[];
  isLoading: boolean;
  error: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult>
) {
  const { page, query } = req.query;

  // console.log(page?.toString());

  const searchParams = new URLSearchParams({
    page: `${page}`,
    query: `${query}`,
  }).toString();

  // console.log(searchParams.toString());

  const response = await fetch(
    `${
      process.env.DATABASE_URL! +
      "search/photos/?client_id=" +
      process.env.ACCESS_KEY +
      "&per_page=30&" +
      searchParams
    }`
  );

  const data = await response.json();

  if (!data) {
    res.status(200).json({ results: [], isLoading: false, error: true });
  }
  res.status(200).json({
    results: data.results,
    isLoading: false,
    error: false,
  });
}
