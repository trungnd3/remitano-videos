export default function Logo() {
  return (
    <>
      <img
        src='/logo-white.svg'
        alt='Logo'
        className='rounded-full w-10 h-10'
      />
      <span className='ml-2 hidden text-xl font-bold sm:inline-block uppercase'>
        Funny Movies
      </span>
    </>
  );
}
