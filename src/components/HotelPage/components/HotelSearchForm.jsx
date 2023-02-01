import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';

import sagaActions from '../../../slices/saga/sagaActions.js';
import { setSearchParams, setCounterDaysStay } from '../../../slices/searchSlice.js';
import { show } from '../../../slices/calendarSlice.js';
import formatDateToStringByDot from '../../../formatters/formatDateToStringByDot.js';

const HotelSearchForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hotelList = useSelector((state) => state.hotels.hotelList);
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
      console.log(hotelList);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="location">{t('hotel_page.form_of_found_hotels.location')}</Form.Label>
        <Form.Control
          id="location"
          name="location"
          required
          value={formik.values.location}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="date">{t('hotel_page.form_of_found_hotels.date')}</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            id="date"
            name="date"
            required
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          <Button variant="secondary" onClick={() => dispatch(show())}><i className="far fa-calendar" /></Button>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="days">{t('hotel_page.form_of_found_hotels.days')}</Form.Label>
        <Form.Control
          id="days"
          name="days"
          required
          value={formik.values.days}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Button variant="secondary" type="submit">{t('hotel_page.form_of_found_hotels.found')}</Button>
    </Form>
  );
};

export default HotelSearchForm;
