import Link from "next/link";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import useViewportSize from "../libs/client/useViewportSize";
import { ImageData } from "../pages/api/photos/list";

const GridCol = tw.div`
grid gap-6
w-full
max-w-7xl
`;

const GridRow = tw.div`
grid grid-cols-1 gap-6 h-fit
`;

const Info = tw.div`
absolute top-0 left-0 w-full h-full 
flex flex-col justify-between 
bg-gradient-to-t
from-black/30 via-transparent to-black/30
opacity-0


hover:opacity-100
duration-300

[&>div]:w-full [&>div]:p-5
`;

const Btn = tw.button`
bg-[#FFFFFF]
h-8
px-3
rounded-md
text-[#767676]

hover:text-black
duration-300
`;

interface DataResult {
  result: ImageData[];
}

export default function Photos() {
  const [perPage, setPerPage] = useState(30);
  const [data, setData] = useState<DataResult>();
  const { width: screenWidth } = useViewportSize();
  const [rowNumber, setRowNumber] = useState(1);

  useEffect(() => {
    if (!screenWidth) return;

    if (screenWidth > 1024) {
      setRowNumber(3);
    } else if (screenWidth > 768) {
      setRowNumber(2);
    } else {
      setRowNumber(1);
    }
  }, [screenWidth, rowNumber]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/photos/list");
      const data = await res.json();

      setData(data);
    })();
  }, []);

  console.log(data);

  const loading = !data;

  return (
    <div className="px-3 w-full flex justify-center">
      {loading ? (
        "loading..."
      ) : (
        <GridCol className={"grid-cols-" + rowNumber}>
          {Array.from(Array(rowNumber)).map((_, rowIndex) => (
            <GridRow key={"girdRow" + rowIndex}>
              {data.result.map(
                (image, imageIndex) =>
                  imageIndex % rowNumber === rowIndex && (
                    <div className="relative" key={image.id}>
                      <img
                        className="w-full"
                        src={
                          rowNumber === 1
                            ? image.urls.regular
                            : image.urls.small
                        }
                      />
                      <Info>
                        <div className="flex justify-end items-center">
                          <Btn className="mr-2">♥</Btn>
                          <Btn>+</Btn>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex justify-start items-center">
                            <span className="pr-2">
                              <img
                                className="rounded-full"
                                src={image.user.profile_image.small}
                              />
                            </span>
                            <span className="text-white">
                              {image.user.name}
                            </span>
                          </div>
                          <Btn>
                            <Link href={image.links.download}>
                              <a>↓</a>
                            </Link>
                          </Btn>
                        </div>
                      </Info>
                    </div>
                  )
              )}
            </GridRow>
          ))}

          <div>hi</div>
        </GridCol>
      )}
    </div>
  );
}
