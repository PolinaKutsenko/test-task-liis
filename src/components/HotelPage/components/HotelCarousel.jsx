import _ from 'lodash';
import { useState } from 'react';

import '../../../css/HotelCarousel.css';
import HotelCarouselPicture1 from '../../../assets/HotelCarouselPicture1.png';
import HotelCarouselPicture2 from '../../../assets/HotelCarouselPicture2.png';
import HotelCarouselPicture3 from '../../../assets/HotelCarouselPicture3.png';
import HotelCarouselPicture4 from '../../../assets/HotelCarouselPicture4.png';

const picturesCarousel = [
  { id: 1, picture: HotelCarouselPicture1 },
  { id: 2, picture: HotelCarouselPicture2 },
  { id: 3, picture: HotelCarouselPicture3 },
  { id: 4, picture: HotelCarouselPicture4 },
];

const countVisiblePictures = 3;

const initialPictures = picturesCarousel.slice(0, countVisiblePictures);

const HotelCarousel = () => {
  const [visiblePictures, setVisiblePictures] = useState(initialPictures);

  const handlePrevPicture = () => {
    const listOfIndex = visiblePictures.map((el) => el.id);
    const newListOfIndex = listOfIndex.map((id) => (
      id > 1 ? id - 1 : 4
    ));
    const newPictureCarousel = newListOfIndex.map((id) => (
      { id, picture: picturesCarousel[id - 1].picture }
    ));
    console.log(visiblePictures);
    console.log(newPictureCarousel);
    setVisiblePictures(newPictureCarousel);
  };
  const handleNextPicture = () => {
    const listOfIndex = visiblePictures.map((el) => el.id);
    const newListOfIndex = listOfIndex.map((id) => (
      id < 4 ? id + 1 : 1
    ));
    const newPictureCarousel = newListOfIndex.map((id) => (
      { id, picture: picturesCarousel[id - 1].picture }
    ));
    setVisiblePictures(newPictureCarousel);
  };

  return (
    <>
      <button type="button" onClick={handlePrevPicture} className="hotel-carousel-icon">
        <i className="fas fa-angle-left" />
        {}
      </button>
      {visiblePictures.map(({ picture }, index) => (
        <span key={_.uniqueId()} className="carousel-picture-item">
          <img
            className="d-block w-100"
            src={picture}
            alt={`${index + 1} slide`}
          />
        </span>
      ))}
      <button type="button" onClick={handleNextPicture} className="hotel-carousel-icon">
        <i className="fas fa-angle-right" />
        {}
      </button>
    </>
  );
};

export default HotelCarousel;
