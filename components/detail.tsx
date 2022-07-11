import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface DetailProps {
  photoId: string;
}

export default function Detail({ photoId }: DetailProps) {
  const router = useRouter();

  const closeModal = () => {
    router.push(`${router.pathname}`, `${router.pathname}`, {
      scroll: false,
    });
  };

  return (
    <>
      <button onClick={closeModal} className="fixed top-0 left-0 p-3 z-50">
        <Image src="/close.svg" width={25} height={25} />
      </button>

      <div className="fixed top-3 left-0 right-0 m-auto w-3/4 h-screen bg-white rounded-md z-50">
        {photoId}
      </div>

      <div
        onClick={closeModal}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
      ></div>
    </>
  );
}
