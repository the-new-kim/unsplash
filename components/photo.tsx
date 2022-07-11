import Link from "next/link";
import { ForwardedRef, forwardRef, useRef } from "react";
import tw from "tailwind-styled-components";
import { PhotoData } from "../pages/api/photos/list";

const Info = tw.div`
absolute top-0 left-0 w-full h-full 
flex flex-col justify-between 
bg-gradient-to-t
from-black/30 via-transparent to-black/30



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
interface PhotoProps {
  photo: PhotoData;
  rowNumber: number;
  photoIndex: number;
}

function Photo(props: PhotoProps, ref: ForwardedRef<HTMLDivElement>) {
  const { photo, rowNumber, photoIndex } = props;

  return (
    <div ref={ref} className="relative" key={photo.id}>
      <img
        className="w-full"
        src={rowNumber === 1 ? photo.urls.regular : photo.urls.small}
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
                src={photo.user.profile_image.small}
              />
            </span>
            <span className="text-white">{photo.user.name}</span>
          </div>
          <Btn>
            <Link href={photo.links.download}>
              <a>↓</a>
            </Link>
          </Btn>
          <div className="p-4 bg-slate-100">{photoIndex}</div>
        </div>
      </Info>
    </div>
  );
}

export default forwardRef(Photo);
