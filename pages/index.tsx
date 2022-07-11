import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import Photos from "../components/photos";
import { ListResult, PhotoData } from "./api/photos/list";

const Home: NextPage = () => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState<ListResult>({
    results: [],
    error: false,
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/photos/list?page=${page}`);
      const data: ListResult = await res.json();
      // console.log("data fetched", data);
      setListData(data);

      setPhotos((prev) => {
        return [...prev, ...data.results];
      });
    })();
  }, [page]);

  return (
    <>
      <Banner />

      {listData.isLoading ? (
        "loading"
      ) : listData.error ? (
        "error"
      ) : (
        <Photos photos={photos} setPage={setPage} />
      )}
    </>
  );
};

export default Home;
