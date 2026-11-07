'use client';

import type { ImgHTMLAttributes } from 'react';

export const DEFAULT_CONTENT_IMAGE = '/assets/img/blog-default.svg';

export default function ContentImage({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} src={src || DEFAULT_CONTENT_IMAGE} alt={alt || ''} onError={event => {
    const image = event.currentTarget;
    if (image.getAttribute('src') !== DEFAULT_CONTENT_IMAGE) image.src = DEFAULT_CONTENT_IMAGE;
  }} />;
}
