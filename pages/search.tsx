import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "../components/modal";
import Photos from "../components/photos";
import { ListResult, PhotoData } from "./api/photos/list";

const Search: NextPage = () => {
  const router = useRouter();
  const { keyword } = router.query;

  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState<ListResult>({
    results: [],
    error: false,
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `/api/photos/search?query=${keyword}&page=${page}`
      );
      const data: ListResult = await res.json();
      setListData(data);

      setPhotos((prev) => {
        return [...prev, ...data.results];
      });
    })();
  }, [page, keyword]);

  const closeModal = () => {
    router.push(`${router.pathname}`, `${router.pathname}`, {
      scroll: false,
    });
  };

  return (
    <>
      <div className="px-3 w-full flex justify-start items-center my-4">
        <h1 className="text-4xl font-bold">{router.query.keyword}</h1>
      </div>

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

export default Search;
