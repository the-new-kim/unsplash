// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface PhotoLinks {
  download: string;
  download_location: string;
  html: string;
  self: string;
}

export interface PhotoUrl {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
}

interface UserSocial {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: string;
}

interface UserProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface UserLinks {
  followers: string;
  following: string;
  html: string;
  likes: string;
  photos: string;
  portfolio: string;
  self: string;
}

export interface UserData {
  accepted_tos: boolean;
  bio: string;
  first_name: string;
  for_hire: boolean;
  id: string;
  instagram_username: string;
  last_name: string;
  links: UserLinks;
  location: string;
  name: string;
  portfolio_url: string;
  profile_image: UserProfileImage;
  social: UserSocial;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  twitter_username: string;
  updated_at: string;
  username: string;
}

export interface PhotoData {
  blur_hash: string;
  color: string;
  created_at: string;
  height: 6000;
  id: string;
  likes: 4;
  links: PhotoLinks;
  promoted_at: string;
  updated_at: string;
  urls: PhotoUrl;
  user: UserData;
  width: number;
  errors?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await fetch(
    `${
      process.env.DATABASE_URL! +
      "/?client_id=" +
      process.env.ACCESS_KEY +
      "&per_page=30"
    }`
  );

  const data = await response.json();

  if (!data) {
    res.status(200).json({ result: null });
  }
  res.status(200).json({
    results: data,
    remaining: response.headers.get("X-Ratelimit-Remaining"),
  });
}
