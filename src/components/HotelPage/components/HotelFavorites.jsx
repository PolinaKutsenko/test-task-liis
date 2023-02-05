import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import {
  sortedByPriceIncrease,
  sortedByPriceDecrease,
  sortedByStarsIncrease,
  sortedByStarsDecrease,
} from '../../../slices/favoritesSlice.js';
import HotelItem from './HotelItem.jsx';
import '../../../css/HotelFavorites.css';

const HotelFavorites = () => {
  const { t } = useTranslation();
  const [activeSelect, setActiveSelect] = useState('');
  const dispatch = useDispatch();
  const favoriteHotelListId = useSelector((state) => state.favorites.favoriteHotels.ids);

  const handleSortedByPrice = (sorting) => () => {
    switch (sorting) {
      case 'increase':
        dispatch(sortedByPriceIncrease());
        setActiveSelect('price-increase');
        break;
      case 'decrease':
        dispatch(sortedByPriceDecrease());
        setActiveSelect('price-decrease');
        break;
      default:
        break;
    }
  };
  const handleSortedByStars = (sorting) => () => {
    switch (sorting) {
      case 'increase':
        dispatch(sortedByStarsIncrease());
        setActiveSelect('stars-increase');
        break;
      case 'decrease':
        dispatch(sortedByStarsDecrease());
        setActiveSelect('stars-decrease');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="hotel-page-fav-container"><span>{t('hotel_page.favorites')}</span></div>
      <div className="hotel-page-fav-select-container">
        <div className={activeSelect.includes('stars') ? 'fav-select-input-active' : 'fav-select-input-inactive'}>
          <span>
            {t('hotel_page.form_of_sorted_favorites.sorted_by_stars')}
          </span>
          <button
            type="button"
            onClick={handleSortedByStars('increase')}
            className={activeSelect === 'stars-increase' ? 'fav-icon-increase-active' : 'fav-icon-increase'}
          >
            <i className="fas fa-angle-up" />
            {}
          </button>
          <button
            type="button"
            onClick={handleSortedByStars('decrease')}
            className={activeSelect === 'stars-decrease' ? 'fav-icon-decrease-active' : 'fav-icon-decrease'}
          >
            <i className="fas fa-angle-down" />
            {}
          </button>
        </div>
        <div className={activeSelect.includes('price') ? 'fav-select-input-active' : 'fav-select-input-inactive'}>
          <span>{t('hotel_page.form_of_sorted_favorites.sorted_by_price')}</span>
          <button
            type="button"
            onClick={handleSortedByPrice('increase')}
            className={activeSelect === 'price-increase' ? 'fav-icon-increase-active' : 'fav-icon-increase'}
          >
            <i className="fas fa-angle-up" />
            {}
          </button>
          <button
            type="button"
            onClick={handleSortedByPrice('decrease')}
            className={activeSelect === 'price-decrease' ? 'fav-icon-decrease-active' : 'fav-icon-decrease'}
          >
            <i className="fas fa-angle-down" />
            {}
          </button>
        </div>
      </div>
      <div className="overflow-element-favorites">
        {favoriteHotelListId.map((id) => (
          <HotelItem key={id} hotelId={id} />))}
      </div>
    </>
  );
};

export default HotelFavorites;
