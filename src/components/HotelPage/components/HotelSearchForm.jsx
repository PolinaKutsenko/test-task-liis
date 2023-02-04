import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import '../../../css/HotelSearchForm.css';
import sagaActions from '../../../slices/saga/sagaActions.js';
import { setSearchParams, setCounterDaysStay } from '../../../slices/searchSlice.js';
import { show } from '../../../slices/calendarSlice.js';
import formatDateToStringByDot from '../../../formatters/formatDateToStringByDot.js';

const HotelSearchForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.calendar.date);

  const formik = useFormik({
    initialValues: {
      location: `${t('hotel_page.form_of_found_hotels.initial_location')}`,
      date: formatDateToStringByDot(selectedDate),
      days: '1',
    },
    onSubmit: ({ location, days }) => {
      dispatch(setCounterDaysStay(days));
      dispatch(setSearchParams({ location, date: selectedDate, days }));
      dispatch({ type: sagaActions.fetch_data });
    },
  });

  useEffect(() => {
    formik.setFieldValue('date', formatDateToStringByDot(selectedDate));
  }, [selectedDate]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="HP-m-b-16">
        <label className="HP-search-form-label" htmlFor="location">{t('hotel_page.form_of_found_hotels.location')}</label>
        <input
          id="location"
          name="location"
          required
          value={formik.values.location}
          onChange={formik.handleChange}
          className="HP-form-input"
        />
      </div>
      <div>
        <label className="HP-search-form-label" htmlFor="date">{t('hotel_page.form_of_found_hotels.date')}</label>
        <div className="HP-m-b-20 HP-position">
          <input
            id="date"
            name="date"
            required
            value={formik.values.date}
            onChange={formik.handleChange}
            className="HP-form-input"
          />
          <button type="button" onClick={() => dispatch(show())} className="HP-icon-calendar">
            <i className="far fa-calendar fa-lg" />
            {}
          </button>
        </div>
      </div>
      <div>
        <label className="HP-search-form-label" htmlFor="days">{t('hotel_page.form_of_found_hotels.days')}</label>
        <input
          id="days"
          name="days"
          required
          value={formik.values.days}
          onChange={formik.handleChange}
          className="HP-form-input"
        />
      </div>
      <button className="hotel-form-button" type="submit">
        <p>{t('hotel_page.form_of_found_hotels.found')}</p>
      </button>
    </form>
  );
};

export default HotelSearchForm;
