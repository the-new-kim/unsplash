import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Photos from "../components/photos";
import { DataResults, PhotoData } from "./api/photos/list";

const Home: NextPage = () => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<DataResults>({
    results: [],
    error: false,
    isLoading: true,
  });
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/photos/list?page=${page}`);
      const data: DataResults = await res.json();
      // console.log("data fetched", data);
      setData(data);

      setPhotos((prev) => {
        return [...prev, ...data.results];
      });
    })();
  }, [page]);

  return (
    <>
      {data.isLoading ? (
        "loading"
      ) : (
        <Photos photos={photos} setPage={setPage} />
      )}
    </>
  );
};

export default Home;
