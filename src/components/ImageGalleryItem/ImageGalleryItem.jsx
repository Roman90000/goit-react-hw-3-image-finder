export const ImageGalleryItem = ({
  image: { webformatURL, tags },
  openModal,
}) => {
  return (
    <li>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => openModal({ webformatURL, tags })}
      />
    </li>
  );
};
