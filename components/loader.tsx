interface LoaderProps {
  text: string;
}
export default function Loader({ text }: LoaderProps) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-10 bg-white">
      <h3 className="text-xl">{text}</h3>
    </div>
  );
}
