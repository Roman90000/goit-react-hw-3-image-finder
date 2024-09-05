import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul>
      {images.map(image => (
        <ImageGalleryItem openModal={openModal} key={image.id} image={image} />
      ))}
    </ul>
  );
};
