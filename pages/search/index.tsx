import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Photos from "../../components/photos";
import { ListResult, PhotoData } from "../api/photos/list";

const Search: NextPage = () => {
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
      const res = await fetch(
        `/api/photos/search?query=${router.query.keyword}&page=${page}`
      );
      const data: ListResult = await res.json();
      // console.log("data fetched", data);
      setListData(data);
      console.log(data);

      setPhotos((prev) => {
        return [...prev, ...data.results];
      });
    })();
  }, [page]);

  return (
    <>
      {router.query.keyword}

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

export default Search;
