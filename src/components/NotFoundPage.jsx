import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundPicture from '../assets/notFoundPicture.png';
import routes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img src={notFoundPicture} alt="NotFoundPage" className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('not_found_page.page_not_found')}</h1>
      <p className="text-muted">
        {t('not_found_page.but_you_can_go')}
        <Link to={routes.hotelsPagePath()}>{t('not_found_page.to_home_page')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
