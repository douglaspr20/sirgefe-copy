import Image from 'next/image';

export const GuestHeader = () => {
  return (
    <header className="top-panel p-3 flex items-center mb-5 justify-center">
      <div>
        <Image
          src="/images/logo-full.svg"
          width={114}
          height={46}
          alt="sirge logo"
        />
      </div>
    </header>
  );
};
