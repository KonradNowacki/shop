import { Base64Image } from '@shop/common-utils';

export const buildBase64Image = (imageContent: string): Base64Image =>
  `data:image/jpg;base64,${imageContent}`;
