import { Carousel } from 'react-bootstrap';

import HotelCarouselPicture1 from '../../../assets/HotelCarouselPicture1.png';
import HotelCarouselPicture2 from '../../../assets/HotelCarouselPicture2.png';
import HotelCarouselPicture3 from '../../../assets/HotelCarouselPicture3.png';

const HotelCarousel = () => (
  <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={HotelCarouselPicture1}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={HotelCarouselPicture2}
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={HotelCarouselPicture3}
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
);

export default HotelCarousel;
