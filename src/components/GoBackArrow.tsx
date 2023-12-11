'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const GoBackArrow = () => {
  const router = useRouter();
  return (
    <a
      className="inline-flex text-2xl text-darkGrade50 mr-1 hover:text-primaryColor cursor-pointer"
      onClick={() => router.back()}
    >
      <i className="icon-chevron-left"></i>
    </a>
  );
};

export default GoBackArrow;
