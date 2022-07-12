// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PhotoData } from "./list";

export interface DetailData {
  errors?: string[];
  id: "Dwu85P9SOIk";

  color: "#6E633A";
  blur_hash: "LFC$yHwc8^$yIAS$%M%00KxukYIp";
  downloads: 1345;
  likes: 24;
  liked_by_user: false;
  public_domain: false;
  description: "A man drinking a coffee.";
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    city: string;
    country: string;
    position: {
      latitude: number;
      longitude: number;
    };
  };
  tags: { title: string }[];
  current_user_collections: {
    id: number;
    title: string;
    published_at: string;
    last_collected_at: string;
    updated_at: string;
    cover_photo: string;
    user: string;
  }[];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    portfolio_url: string;
    bio: string;
    location: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    total_likes: number;
    total_photos: number;
    total_collections: number;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
  };
  views: number;
  related_collections: {
    results: {
      id: string;
      cover_photo: PhotoData;
    }[];
  };
}

export interface DetailResult {
  results: DetailData;
  isLoading: boolean;
  error: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DetailResult>
) {
  const { id } = req.query;

  const response = await fetch(
    `${
      process.env.DATABASE_URL! +
      "photos/" +
      id +
      "?client_id=" +
      process.env.ACCESS_KEY
    }`
  );

  const data = await response.json();

  if (!data) {
    res.status(200).json({ results: data, isLoading: false, error: true });
  }
  res.status(200).json({
    results: data,
    isLoading: false,
    error: false,
  });
}
