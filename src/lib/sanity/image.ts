import createImageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const imageBuilder = createImageUrlBuilder(client);

export const urlForImage = (source: any) => {
  if (!source || !source.asset) {
    return {
      url: 'https://via.placeholder.com/600x400?text=No+Image',
      width: () => 600,
      height: () => 400,
      quality: () => 80,
      auto: () => 'format',
      format: () => ({ url: () => 'https://via.placeholder.com/600x400?text=No+Image' }),
      crop: () => ({ url: () => 'https://via.placeholder.com/600x400?text=No+Image' }),
      fit: () => ({ url: () => 'https://via.placeholder.com/600x400?text=No+Image' }),
      url: () => 'https://via.placeholder.com/600x400?text=No+Image',
    };
  }
  return imageBuilder.image(source);
}; 