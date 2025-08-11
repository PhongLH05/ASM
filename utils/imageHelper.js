// Helper function để load image
export const getImageSource = (imageName) => {
  switch (imageName) {
    case 'product.jpg':
      return require('../assets/product.jpg');
    case 'product2.jpg':
      return require('../assets/product2.jpg');
    case 'product3.jpg':
      return require('../assets/product3.jpg');
    case 'product4.jpg':
      return require('../assets/product4.jpg');
    case 'ic1.png':
      return require('../assets/ic1.png');
    case 'ic2.png':
      return require('../assets/ic2.png');
    case 'ic4.png':
      return require('../assets/ic4.png');
    case 'ic5.png':
      return require('../assets/ic5.png');
    case 'avatar.jpg':
      return require('../assets/avatar.jpg');
    case 'Logo.png':
      return require('../assets/Logo.png');
    case 'startpic.jpg':
      return require('../assets/startpic.jpg');
    case 'splash-icon.png':
      return require('../assets/splash-icon.png');
    case 'favicon.png':
      return require('../assets/favicon.png');
    case 'icon.png':
      return require('../assets/icon.png');
    case 'adaptive-icon.png':
      return require('../assets/adaptive-icon.png');
    default:
      return require('../assets/product.jpg'); // fallback image
  }
}; 