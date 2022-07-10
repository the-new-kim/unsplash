interface TestProps {
  title: string;
}

export default function Test({ title }: TestProps) {
  return <h1>{title}</h1>;
}
