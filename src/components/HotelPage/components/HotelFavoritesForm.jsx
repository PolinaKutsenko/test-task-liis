import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';

import {
  sortedByPriceIncrease,
  sortedByPriceDecrease,
  sortedByStarsIncrease,
  sortedByStarsDecrease,
} from '../../../slices/favoritesSlice.js';

const HotelFavoritesForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSortedByPrice = (e) => {
    switch (e.target.value) {
      case 'price_increase':
        dispatch(sortedByPriceIncrease());
        break;
      case 'price_decrease':
        dispatch(sortedByPriceDecrease());
        break;
      default:
        console.log(e.target.value);
    }
  };
  const handleSortedByStars = (e) => {
    switch (e.target.value) {
      case 'stars_increase':
        dispatch(sortedByStarsIncrease());
        break;
      case 'stars_decrease':
        dispatch(sortedByStarsDecrease());
        break;
      default:
        console.log(e.target.value);
    }
  };

  return (
    <>
      <Form.Select onChange={handleSortedByPrice} aria-label="Default select example">
        <option>{t('hotel_page.form_of_sorted_favorites.sorted_by_price')}</option>
        <option value="price_increase">{t('hotel_page.form_of_sorted_favorites.increase')}</option>
        <option value="price_decrease">{t('hotel_page.form_of_sorted_favorites.decrease')}</option>
      </Form.Select>
      <Form.Select onChange={handleSortedByStars} aria-label="Default select example">
        <option>{t('hotel_page.form_of_sorted_favorites.sorted_by_stars')}</option>
        <option value="stars_increase">{t('hotel_page.form_of_sorted_favorites.increase')}</option>
        <option value="stars_decrease">{t('hotel_page.form_of_sorted_favorites.decrease')}</option>
      </Form.Select>
    </>
  );
};

export default HotelFavoritesForm;
