"user client";
import Image from 'next/image';
import React from 'react';

const Avatar = () => {
  return (
    <Image 
      className='rounded-full'
      height="20"
      width="20"
      alt='Avatar'
      src='/images/placeholder.png'
    />
  );
}

export default Avatar;