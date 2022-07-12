import { NextPage } from "next";
import { useRouter } from "next/router";
import Detail from "../../components/detail";

const Photo: NextPage = () => {
  const router = useRouter();

  return <Detail />;
};

export default Photo;
