import { useTranslation } from 'react-i18next';

const HotelPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      {t('hotel_page.hotel')}
    </div>
  );
};

export default HotelPage;
