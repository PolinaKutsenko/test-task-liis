import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import '../../css/HotelPage.css';
import { useAuth } from '../../hooks/index.js';
import formatDateToStringByFullDate from '../../formatters/formatDateToStringByFullDate.js';
import HotelCalendar from './components/HotelCalendar.jsx';
import HotelItem from './components/HotelItem.jsx';
import HotelCarousel from './components/HotelCarousel.jsx';
import HotelFavorites from './components/HotelFavorites.jsx';
import HotelSearchForm from './components/HotelSearchForm.jsx';

const HotelPage = () => {
  const { t } = useTranslation();
  const hotelListId = useSelector((state) => state.hotels.hotelList.ids);
  const favoriteHotelListId = useSelector((state) => state.favorites.favoriteHotels.ids);
  const city = useSelector(({ searchParams }) => searchParams.searchParams.location);
  const { date: checkInDate } = useSelector((state) => state.calendar);
  const formattedCheckInDate = formatDateToStringByFullDate(checkInDate);
  const auth = useAuth();

  return (
    <>
      <HotelCalendar />
      <div>
        <nav className="hotel-page-nav">
          <div className="hotel-page-nav-name">{t('hotel_page.nameNavBar')}</div>
          <button className="hotel-page-nav-exit" type="button" onClick={() => auth.logOut()}>
            <span>{t('hotel_page.signOut')}</span>
            <i className="fas fa-arrow-right-from-bracket" />
          </button>
        </nav>
        <main className="hotel-page-main">
          <div className="hotel-page-left-column">
            <div className="hotel-page-search-form">
              <HotelSearchForm />
            </div>
            <div className="hotel-page-favorites">
              <HotelFavorites />
            </div>
          </div>
          <div className="hotel-page-right-column">
            <div className="hotel-page-title">
              <span className="hotel-page-left-content">
                <span id="title">{`${t('hotel_page.hotels')}`}</span>
                <i className="fas fa-angle-right fa-2x" />
                <span id="city">{`${city}`}</span>
              </span>
              <span id="date">{formattedCheckInDate}</span>
            </div>
            <div className="hotel-page-carousel-container"><HotelCarousel /></div>
            <div className="hotel-page-list-hotel-container">
              <div className="hotel-page-add-in-fav">{t('hotel_page.favoritesHotelCount', { count: favoriteHotelListId.length })}</div>
              <div className="overflow-element-hotels">{hotelListId.map((id) => (<HotelItem key={id} hotelId={id} />))}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HotelPage;
