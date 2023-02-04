import React, { useRef } from 'react';
import { useImmer } from 'use-immer';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import _ from 'lodash';

import '../../../css/HotelCalendar.css';

import { close, setDate } from '../../../slices/calendarSlice.js';

const DAYS_IN_WEEK = 7;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const areEqual = (a, b) => {
  if (!a || !b) return false;

  return (
    a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate()
  );
};

const isLeapYear = (year) => !((year % 4) || (!(year % 100) && (year % 400)));

const getDaysInMonth = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = DAYS_IN_MONTH[month];

  if (isLeapYear(year) && month === Month.February) {
    return daysInMonth + 1;
  }
  return daysInMonth;
};

const getDayOfWeek = (date) => {
  const dayOfWeek = date.getDay();

  return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
};

const getMonthData = (year, month) => {
  const result = [];
  const date = new Date(year, month);
  const daysInMonth = getDaysInMonth(date);
  const monthStartsOn = getDayOfWeek(date);
  let day = 1;

  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i += 1) {
    result[i] = [];
    for (let j = 0; j < DAYS_IN_WEEK; j += 1) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day);
        day += 1;
      }
    }
  }

  return result;
};

const Calendar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const baseProps = {
    years: [2023, 2024, 2025, 2026, 2027, 2028],
    monthNames: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    weekDayNames: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
  };
  const [state, setState] = useImmer({
    date: new Date(),
    currentDate: new Date(),
    selectedDate: null,
  });

  const selectMonthRef = useRef(null);
  const selectYearRef = useRef(null);

  const monthData = getMonthData(state.date.getFullYear(), state.date.getMonth());

  const handlePrevMonthButtonClick = () => {
    const newDate = new Date(state.date.getFullYear(), state.date.getMonth() - 1);
    setState((store) => {
      store.date = newDate;
    });
  };

  const handleNextMonthButtonClick = () => {
    const newDate = new Date(state.date.getFullYear(), state.date.getMonth() + 1);
    setState((store) => {
      store.date = newDate;
    });
  };

  const handleSelectChange = () => {
    const year = selectYearRef.current.value;
    const month = selectMonthRef.current.value;
    const newDate = new Date(year, month);
    setState((store) => {
      store.date = newDate;
    });
  };

  const handleDayClick = (date) => () => {
    console.log('DAYYYYY', date);
    setState((store) => {
      store.selectedDate = date;
    });
    dispatch(setDate(date));
  };

  const handleReturnToday = () => {
    setState((store) => ({
      ...store,
      date: store.currentDate,
    }));
    handleDayClick(state.date)();
  };

  return (
    <div className="calendar">
      <header>
        <select
          ref={selectMonthRef}
          value={state.date.getMonth()}
          onChange={handleSelectChange}
        >
          {baseProps.monthNames.map((name, index) => (
            <option key={name} value={index}>{name}</option>))}
        </select>
        <select
          ref={selectYearRef}
          value={state.date.getFullYear()}
          onChange={handleSelectChange}
        >
          {baseProps.years.map((year) => (
            <option key={year} value={year}>{year}</option>))}
        </select>
        <button type="button" onClick={handleNextMonthButtonClick} className="HC-button-up-down">
          <i className="fas fa-arrow-up-long HC-color-arrow">{}</i>
        </button>
        <button type="button" onClick={handlePrevMonthButtonClick} className="HC-button-up-down">
          <i className="fas fa-arrow-down-long HC-color-arrow">{}</i>
        </button>
      </header>

      <table>
        <thead>
          <tr>
            {baseProps.weekDayNames.map((name) => <th key={name} className="weekDay">{name}</th>)}
          </tr>
        </thead>

        <tbody>
          {monthData.map((week) => (
            <tr key={_.uniqueId()} className="week">
              {week.map((date) => {
                const day = 'day';
                return (date ? (
                  <td
                    key={_.uniqueId()}
                    className={cn(day, {
                      today: areEqual(date, state.currentDate),
                      selected: areEqual(date, state.selectedDate),
                    })}
                    onClick={handleDayClick(date)}
                  >
                    {date.getDate()}
                  </td>
                ) : <td key={_.uniqueId()} />);
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="footer" onClick={handleReturnToday}>{t('hotel_page.calendar.today')}</p>
    </div>
  );
};

const HotelCalendar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const uiState = useSelector((state) => state.calendar.uiState);
  return (
    <Modal show={uiState} onHide={() => dispatch(close())} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('hotel_page.calendar.calendar')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Calendar />
      </Modal.Body>
    </Modal>
  );
};

export default HotelCalendar;
