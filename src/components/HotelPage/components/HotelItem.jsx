import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import _ from 'lodash';

import formatDateToStringByFullDate from '../../../formatters/formatDateToStringByFullDate';
import { addFavoriteHotel, deleteFavoriteHotel } from '../../../slices/favoritesSlice.js';
import '../../../css/HotelItem.css';

const Stars = ({ starCount }) => {
  const emptyArray = [0, 1, 2, 3, 4];
  const starArray = emptyArray.map((index) => (index + 1 <= starCount ? 1 : 0));
  const starsClassNames = starArray.map((star) => (
    cn({
      star: star === 0,
      'active-star': star === 1,
    })));
  return (
    <span>
      {starsClassNames.map((starClassName) => (
        <span key={_.uniqueId()} className={starClassName}>★</span>))}
    </span>
  );
};

const HotelItem = ({ hotelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const hotelData = useSelector((state) => {
    const hotelDataFromHotelList = state.hotels.hotelList.entities[hotelId];
    const hotelDataFromFavoritesList = state.favorites.favoriteHotels.entities[hotelId];
    return hotelDataFromHotelList ?? hotelDataFromFavoritesList;
  });
  const favoriteHotels = useSelector((state) => state.favorites.favoriteHotels.ids);
  const { counterDaysStay } = useSelector((state) => state.searchParams);
  const { date: checkInDate } = useSelector((state) => state.calendar);
  const formattedCheckInDate = formatDateToStringByFullDate(checkInDate);

  const handleFavoriteHotel = () => {
    const isTheHotelFavorite = favoriteHotels.includes(hotelId);
    if (isTheHotelFavorite) {
      dispatch(deleteFavoriteHotel(hotelData));
      return;
    }
    dispatch(addFavoriteHotel(hotelData));
  };

  const isFavorite = favoriteHotels.includes(hotelId);

  return (
    <>
      <div className={isFavorite ? 'hotel-item-fav-container' : 'hotel-item-container'}>
        {!isFavorite && (
        <div className="hotel-item-house-container">
          <div className="house-roof" />
          <div className="house-main"><p className="house-main-door" /></div>
        </div>
        )}
        <div className={isFavorite ? 'hotel-item-fav-name' : 'hotel-item-name'}>
          {hotelData.hotelName}
        </div>
        <div className={isFavorite ? 'hotel-item-fav-dash' : 'hotel-item-dash'} />
        <div className={isFavorite ? 'hotel-item-fav-date' : 'hotel-item-date'}>
          {formattedCheckInDate}
        </div>
        <div className={isFavorite ? 'hotel-item-count-of-days-fav' : 'hotel-item-count-of-days'}>
          {t('hotel_page.hotel_item.daysCount', { count: Number(counterDaysStay) })}
        </div>
        <div className={isFavorite ? 'stars-fav' : 'stars'}>
          <Stars starCount={hotelData.stars} />
        </div>
        <div className={isFavorite ? 'hotel-item-fav-price' : 'hotel-item-price'}>{`${t('hotel_page.hotel_item.price')} :`}</div>
        <div className={isFavorite ? 'hotel-item-fav-price-value' : 'hotel-item-price-value'}>
          {`${Math.round(hotelData.priceAvg)} ${t('hotel_page.hotel_item.currency')}`}
        </div>
        <button onClick={handleFavoriteHotel} type="button" className="hotel-item-button-heart">
          <div className={isFavorite ? 'heart-active' : 'heart'}> </div>
        </button>
      </div>
      <div className={isFavorite ? 'hotel-item-fav-divide-line' : 'hotel-item-divide-line'} />
    </>
  );
};

export default HotelItem;
