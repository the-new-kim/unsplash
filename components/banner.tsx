import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SearchForm {
  keyword: string;
}

export default function Banner() {
  const [bannerUrl, setBannerUrl] = useState("");
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<SearchForm>();

  const onValid = ({ keyword }: SearchForm) => {
    router.push(`/search?keyword=${keyword}`);
    setValue("keyword", "");
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("https://source.unsplash.com/random");

      setBannerUrl(res.url);
    })();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.7)), url(${bannerUrl})`,
      }}
      className="relative
    w-full h-80 sm:h-[594px] mb-12 bg-cover bg-center
    flex justify-center items-center"
    >
      <div
        // style={{
        //   backgroundImage: `url(${randomData.result.urls.regular})`,
        // }}
        className="absolute bg-slate-300 top-0 left-0 w-full h-full bg-center bg-cover -z-10"
      ></div>
      <div className="w-full sm:w-3/5 flex flex-col p-4 text-white">
        <h1 className="text-3xl sm:text-5xl font-bold mb-5">Unsplash</h1>
        <p className="mb-5 max-w-sm">
          The internet’s source of freely-usable images. Powered by creators
          everywhere.
        </p>
        <div className="relative w-full hidden sm:flex">
          <form className="w-full" onSubmit={handleSubmit(onValid)}>
            <input
              className="py-3 px-12 rounded-md w-full text-black outline-none"
              {...register("keyword", { required: true })}
              type="text"
              placeholder="Search photos"
            />
          </form>
          <div className="absolute left-0 top-0 h-full flex justify-center items-center px-3">
            <Image src="/search.svg" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
