import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Photos from "../components/photos";
import Test from "../components/test";
import { PhotoData } from "./api/photos/list";

export interface DataResults {
  results: PhotoData[];
}

const Home: NextPage = () => {
  const [data, setData] = useState<DataResults>();
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/photos/list");
      const data = await res.json();

      setData(data);
    })();
  }, []);

  // console.log("results", data?.results);

  const loading = !data;
  return <>{loading ? "loading" : <Photos photos={data.results} />}</>;
};

export default Home;
