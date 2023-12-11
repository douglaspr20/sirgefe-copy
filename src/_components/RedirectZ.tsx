'use client';

import { useRouter } from 'next/navigation';

type Props = {
  to: string;
};

export function RedirectZ(props: Props) {
  const router = useRouter();
  return (
    <div>
      <button
        className="border border-red-600 p-6 bg-primaryColorHover text-white"
        onClick={() => {
          router.push(`/greatness/${props.to}`);
        }}
      >
        go to {props.to}
      </button>
    </div>
  );
}
