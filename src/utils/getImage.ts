const imageNotFound = require('@assets/images/clothing.png');

export const getImage = (imageUrl: string) => {
  if (imageUrl) {
    return {uri: imageUrl.replace('https', 'http')};
  }

  return imageNotFound;
};
