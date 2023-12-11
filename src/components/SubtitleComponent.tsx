import React, { FC } from 'react';
import localFont from 'next/font/local';

interface Props {
  subtitle: string;
}

const sohneBreit = localFont({
  src: [
    {
      path: '../fonts/TestSöhneBreit-Fett.otf',
      weight: '700', // Font weight: Bold (700)
    },
  ],
  variable: '--font-sohne-breit',
});

const SubtitleComponent: FC<Props> = ({ subtitle }) => {
  return (
    <div className="px-5 text-center mt-5">
      <span className={`text-black text-4xl font-bold ${sohneBreit.className}`}>
        {subtitle}
      </span>
    </div>
  );
};

export default SubtitleComponent;
