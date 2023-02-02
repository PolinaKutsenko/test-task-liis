import { Carousel } from 'react-bootstrap';
import _ from 'lodash';

import HotelCarouselPicture1 from '../../../assets/HotelCarouselPicture1.png';
import HotelCarouselPicture2 from '../../../assets/HotelCarouselPicture2.png';
import HotelCarouselPicture3 from '../../../assets/HotelCarouselPicture3.png';

const picturesCarousel = [HotelCarouselPicture1, HotelCarouselPicture2, HotelCarouselPicture3];

const HotelCarousel = () => (
  <Carousel>
    {picturesCarousel.map((picture, index) => (
      <Carousel.Item key={_.uniqueId()}>
        <img
          className="d-block w-100"
          src={picture}
          alt={`${index + 1} slide`}
        />
      </Carousel.Item>
    ))}
  </Carousel>
);

export default HotelCarousel;
