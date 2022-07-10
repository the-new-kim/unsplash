import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Photos from "../components/photos";
import { PhotoData } from "./api/photos/list";

export interface DataResults {
  results: PhotoData[];
}

// const fetcher = async () => {
//   const res = await fetch("/api/photos/list");
//   const data = await res.json();

//   return data
// }

const Home: NextPage = () => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<DataResults>();
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/photos/list?page=${page}`);
      const data: DataResults = await res.json();
      console.log("data fetched", data);
      setData(data);
      setPhotos((prev) => {
        return [...prev, ...data.results];
      });
    })();
  }, [page]);

  console.log(photos, photos.length);

  const increasePage = () => {
    setPage((prev) => prev + 1);
  };

  const loading = !data;
  return (
    <>
      {loading ? "loading" : <Photos photos={photos} />}
      <button
        className="fixed top-0 right-0 z-50 bg-slate-400 p-6"
        onClick={increasePage}
      >
        click
      </button>
    </>
  );
};

export default Home;
