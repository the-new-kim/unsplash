import Image from "next/image";
import { useRouter } from "next/router";
import Detail from "./detail";

export default function Modal() {
  const router = useRouter();

  const closeModal = () => {
    router.push(`${router.pathname}`, `${router.pathname}`, {
      scroll: false,
    });
  };

  return (
    <div>
      <button onClick={closeModal} className="fixed top-0 left-0 p-3 z-50">
        <Image src="/close.svg" width={25} height={25} />
      </button>
      <div className="fixed top-3 left-0 right-0 mx-auto w-3/4 h-[calc(100vh-0.75rem)] overflow-scroll bg-white rounded-md z-50">
        <Detail />
      </div>
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 cursor-zoom-out"
      ></div>
    </div>
  );
}
