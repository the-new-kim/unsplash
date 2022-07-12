import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import Detail from "../components/detail";
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

  const closeModal = () => {
    router.push(`${router.pathname}`, `${router.pathname}`, {
      scroll: false,
    });
  };

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
      {router.query.photoId && (
        <div>
          <button onClick={closeModal} className="fixed top-0 left-0 p-3 z-50">
            <Image src="/close.svg" width={25} height={25} />
          </button>
          <div className="fixed top-3 left-0 right-0 m-auto w-3/4 h-screen bg-white rounded-md z-50">
            <Detail />
          </div>
          <div
            onClick={closeModal}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          ></div>
        </div>
      )}
    </>
  );
};

export default Home;
