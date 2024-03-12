interface HeadingProps {
  title: string;
  description: string;
}

export default function Heading({ title, description }: HeadingProps) {
  return (
    <div>
      <h1 className='font-bold text-lg'>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
