const images = {
  1: require('../../../assets/images/1.webp'),
  2: require('../../../assets/images/2.webp'),
  3: require('../../../assets/images/3.webp'),
  4: require('../../../assets/images/4.webp'),
  5: require('../../../assets/images/5.webp'),
  6: require('../../../assets/images/6.webp'),
  7: require('../../../assets/images/7.webp'),
  8: require('../../../assets/images/8.webp'),
  9: require('../../../assets/images/9.webp'),
  10: require('../../../assets/images/10.webp'),
  11: require('../../../assets/images/11.webp'),
  12: require('../../../assets/images/12.webp'),
  13: require('../../../assets/images/13.webp'),
};

const mapCompanyImages = new Map();

export default function getImage(companyName) {
  if (mapCompanyImages.has(companyName))
    return mapCompanyImages.get(companyName);
  const img = images[Math.ceil(Math.random() * 13)];
  mapCompanyImages.set(companyName, img);
  return img;
}
