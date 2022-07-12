import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import tw from "tailwind-styled-components";
import useViewportSize from "../libs/client/useViewportSize";
import { PhotoData } from "../pages/api/photos/list";
import Photo from "./photo";

const GridCol = tw.div`
grid gap-6
w-full
max-w-7xl
`;

const GridRow = tw.div`
grid grid-cols-1 gap-6 h-fit
`;

interface PhotosProps {
  photos: PhotoData[];
  setPage?: Dispatch<SetStateAction<number>>;
}

export default function Photos({ photos, setPage }: PhotosProps) {
  const { width: screenWidth } = useViewportSize();
  const [rowNumber, setRowNumber] = useState(1);

  const observer = useRef<IntersectionObserver>();

  const lastPhotoElement = useCallback((node: HTMLDivElement) => {
    if (!node || !setPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPage((prev) => prev + 1);
    });
    observer.current.observe(node);
  }, []);

  useEffect(() => {
    if (!screenWidth) return;

    if (screenWidth > 1024) {
      setRowNumber(3);
    } else if (screenWidth > 768) {
      setRowNumber(2);
    } else {
      setRowNumber(1);
    }
  }, [screenWidth]);

  return (
    <div className="sm:px-3 w-full flex justify-center">
      {/* is there any way to get this with Tailwind CSS ??? ⬇⬇⬇ */}
      <GridCol style={{ gridTemplateColumns: `repeat(${rowNumber},1fr)` }}>
        {/* <GridCol className={`grid-cols-${rowNumber}`}> */}
        {Array.from(Array(rowNumber)).map((_, rowIndex) => (
          <GridRow key={"girdRow" + rowIndex}>
            {photos.map((photo, photoIndex) => {
              if (photoIndex % rowNumber === rowIndex) {
                if (photoIndex === photos.length - 1) {
                  return (
                    <Photo
                      ref={lastPhotoElement}
                      key={photo.id}
                      photo={photo}
                      photoIndex={photoIndex}
                      rowNumber={rowNumber}
                    />
                  );
                } else {
                  return (
                    <Photo
                      key={photo.id}
                      photo={photo}
                      photoIndex={photoIndex}
                      rowNumber={rowNumber}
                    />
                  );
                }
              }
            })}
          </GridRow>
        ))}
      </GridCol>
    </div>
  );
}
