import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import React from 'react';
import { ILazyLoadImageProps } from './lazy-load-image.type';
import { LazyLoadImage as ReactLazyLoadImage } from 'react-lazy-load-image-component';

export const LazyLoadImage: React.FC<ILazyLoadImageProps> = (props) => {
  return <ReactLazyLoadImage threshold={0} effect="opacity" {...props} />;
};
