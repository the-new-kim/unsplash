import Link from "next/link";
import { useRouter } from "next/router";
import { ForwardedRef, forwardRef, useRef } from "react";
import tw from "tailwind-styled-components";
import { PhotoData } from "../pages/api/photos/list";

const Info = tw.div`
absolute top-0 left-0 w-full h-full 
flex-col justify-between 
bg-gradient-to-t
from-black/30 via-transparent to-black/30
pointer-events-none


group-hover:opacity-100

opacity-0

duration-300


[&>div]:w-full [&>div]:p-5

hidden sm:flex
`;

const Btn = tw.button`
bg-[#FFFFFF]
h-8
px-3
rounded-md
text-[#767676]

hover:text-black
duration-300

pointer-events-auto
`;

const MobileBtn = tw(Btn)`
border-gray-300
border-solid
border-[1px]
min-w-[40px]
`;

const MobileInfo = tw.div`
sm:hidden text-black flex justify-start items-center p-3
`;

interface PhotoProps {
  photo: PhotoData;
  rowNumber: number;
  photoIndex: number;
}

function Photo(props: PhotoProps, ref: ForwardedRef<HTMLDivElement>) {
  const router = useRouter();
  const { photo, rowNumber, photoIndex } = props;

  const onClick = (id: string) => {
    router.push(`${id}`);
  };

  return (
    <div ref={ref} className="relative group" key={photo.id}>
      <MobileInfo>
        <span className="pr-2">
          <img className="rounded-full" src={photo.user.profile_image.small} />
        </span>
        <span>{photo.user.name}</span>
      </MobileInfo>
      <Link
        href={`?photoId=${photo.id}`}
        as={`/photo/${photo.id}`}
        scroll={false}
      >
        <a>
          <img
            // onClick={() => {
            //   onClick(photo.id);
            // }}
            className="w-full cursor-zoom-in"
            src={rowNumber === 1 ? photo.urls.regular : photo.urls.small}
          />
        </a>
      </Link>
      <MobileInfo className="justify-between">
        <div className="flex justify-end items-center">
          <MobileBtn className="mr-2">♥</MobileBtn>
          <MobileBtn>+</MobileBtn>
        </div>
        <div className="flex justify-end items-center">
          <MobileBtn className="mr-2 text-sm">
            <Link href={photo.links.download}>
              <a>Download</a>
            </Link>
          </MobileBtn>
        </div>
      </MobileInfo>
      <Info>
        <div className="flex justify-end items-center">
          <Btn className="mr-2">♥</Btn>
          <Btn>+</Btn>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <span className="pr-2 cursor-pointer pointer-events-auto">
              <img
                className="rounded-full"
                src={photo.user.profile_image.small}
              />
            </span>
            <span className="text-white cursor-pointer pointer-events-auto">
              {photo.user.name}
            </span>
          </div>
          <Btn>
            <Link href={photo.links.download}>
              <a>↓</a>
            </Link>
          </Btn>
        </div>
      </Info>
    </div>
  );
}

export default forwardRef(Photo);
