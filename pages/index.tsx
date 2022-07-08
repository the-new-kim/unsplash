import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageLinks {
  download: string;
  download_location: string;
  html: string;
  self: string;
}

interface ImageUrl {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
}

interface ImageData {
  blur_hash: string;
  color: string;
  created_at: string;
  height: 6000;
  id: string;
  likes: 4;
  links: ImageLinks;
  promoted_at: string;
  updated_at: string;
  urls: ImageUrl;
  user: object;
  width: number;
  errors?: string[];
}

const Home: NextPage = () => {
  const [dataImages, setDataImages] = useState<{
    data: ImageData[];
    loading: boolean;
    error: boolean;
  }>();

  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const params = {
      client_id: process.env.ACCESS_KEY!,
      per_page: perPage + "",
    };
    const searchParams = new URLSearchParams(params).toString();

    const fetchImages = async () => {
      const res = await fetch(
        `${process.env.DATABASE_URL! + "/?" + searchParams}`,
        {}
      );

      console.log(res);

      const data = await res.json();

      console.log(data);

      setDataImages({
        data: data.errors ? null : data,
        loading: false,
        error: data.errors ? data.errors : false,
      });
    };

    fetchImages();
  }, [perPage]);

  const loading = dataImages?.loading;
  const error = dataImages?.error || !dataImages?.data;

  return (
    <div>
      <h1>Images</h1>
      {loading ? (
        "loading"
      ) : error ? (
        <div>{dataImages?.error}</div>
      ) : (
        dataImages.data.map((image) => (
          <img key={image.id} src={image.urls.small} width={100} height={100} />
          // <div key={image.id}>{image.id}</div>
        ))
      )}

      <button
        onClick={() => {
          setPerPage((prev) => prev + 1);
        }}
      >
        increase page
      </button>
    </div>
  );
};

export default Home;
