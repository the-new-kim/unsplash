import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface SearchForm {
  keyword: string;
}

export default function NavBar() {
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<SearchForm>();

  const onValid = ({ keyword }: SearchForm) => {
    router.push(`/search?keyword=${keyword}`);
    setValue("keyword", "");
  };

  return (
    <nav className="bg-white sm:fixed w-screen px-5 h-16 flex justify-between items-center z-10">
      <Link href="/">
        <a>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            version="1.1"
            aria-labelledby="home"
            aria-hidden="false"
          >
            <title id="home">Home</title>
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
          </svg>
        </a>
      </Link>
      <div className="px-6 w-full">
        <div className="relative w-full flex">
          <form className="w-full" onSubmit={handleSubmit(onValid)}>
            <input
              className="bg-[#F5F5F5] py-3 px-12 rounded-3xl w-full text-black outline-none text-sm"
              {...register("keyword", { required: true })}
              type="text"
              placeholder="Search photos"
            />
          </form>
          <div className="absolute left-0 top-0 h-full flex justify-center items-center px-3">
            <Image src="/search.svg" width={15} height={15} />
          </div>
        </div>
      </div>
    </nav>
  );
}
