import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DetailData, DetailResult } from "../pages/api/photos/detail";
import tw from "tailwind-styled-components";
import Link from "next/link";
import Image from "next/image";
import { PhotoData } from "../pages/api/photos/list";
import Photos from "./photos";

const Btn = tw.button`
bg-[#FFFFFF]
h-8
px-3
rounded-md
text-[#767676]

hover:text-black
duration-300

pointer-events-auto
border-gray-300
border-solid
border-[1px]
min-w-[40px]
`;

const MobileInfo = tw.div`
 text-black flex justify-start items-center p-3
`;

export default function Detail() {
  const router = useRouter();
  const { photoId } = router.query;
  const [photo, setPhoto] = useState<DetailData>();
  const [photos, setPhotos] = useState<PhotoData[]>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/photos/detail?id=${photoId}`);
      const data: DetailResult = await res.json();

      if (!data.results || data.error || data.isLoading || data.results.errors)
        return;

      setPhoto(data.results);
    })();
  }, [photoId]);

  useEffect(() => {
    if (!photo) return;
    setPhotos(() => {
      let photos: any = [];
      photo.related_collections.results.map((result) =>
        photos.push(result.cover_photo)
      );

      return photos;
    });
  }, [photo]);

  return (
    <>
      {photo && (
        <div className="w-full flex flex-col justify-center items-center p-4 [&>*]:w-full [&>*]:flex [&>*]:items-center [&>*]:mb-4 text-sm">
          <header className="justify-between">
            <div className="flex justify-start items-center">
              <span className="pr-2 cursor-pointer pointer-events-auto">
                <img
                  className="rounded-full"
                  src={photo.user.profile_image.small}
                />
              </span>
              <span className="cursor-pointer pointer-events-auto text-base">
                {photo.user.name}
              </span>
            </div>
            <div className="flex justify-end items-center [&>*]:ml-2">
              <Btn>♥</Btn>
              <Btn>+</Btn>
              <Btn>
                <Link href={photo.links.download}>
                  <a>Download</a>
                </Link>
              </Btn>
            </div>
          </header>
          <div className="justify-center h-[80vh]">
            <img
              className="max-h-full max-w-fu object-cover"
              src={photo.urls.regular}
            />
          </div>
          <div className="justify-between">
            <div className="flex justify-start items-center [&>*]:mr-5">
              <span>
                <div className="text-[#767676]">Views</div>
                <div>{photo.views.toLocaleString()}</div>
              </span>
              <span>
                <div className="text-[#767676]">Downloads</div>
                <div>{photo.downloads.toLocaleString()}</div>
              </span>
            </div>
            <div className="flex justify-end items-center [&>*]:ml-2">
              <Btn>Share</Btn>
              <Btn>Info</Btn>
              <Btn>...</Btn>
            </div>
          </div>
          <div className="text-[#767676]">
            <div className="flex justify-start items-center [&>*]:mr-2">
              <span className="flex justify-start items-center">
                <Image src="/camera.svg" width={15} height={15}></Image>
              </span>
              <span>{photo.exif.make + " " + photo.exif.model}</span>
            </div>
          </div>
          <h2 className="text-2xl mt-7">Related Photos</h2>
          {photos && <Photos photos={photos} />}
        </div>
      )}
    </>
  );
}
