import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import Modal from "../components/modal";
import Photos from "../components/photos";
import { ListResult, PhotoData } from "./api/photos/list";

const Home: NextPage = () => {
  const router = useRouter();
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
      {router.query.photoId && <Modal />}
    </>
  );
};

export default Home;
