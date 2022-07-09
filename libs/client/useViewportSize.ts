import { useEffect, useState } from "react";

interface Size {
  width?: number;
  height?: number;
}

const useViewportSize = () => {
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (!window) return;
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    if (!window) return;
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useViewportSize;
