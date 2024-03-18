interface HeadingProps {
  title: string;
  description: string;
  className?: string;
}

export default function Heading({
  title,
  description,
  className,
}: HeadingProps) {
  return (
    <div className={className}>
      <h1 className='font-bold text-lg'>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
