import React, { useState, useEffect } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { PrevIcon, NextIcon } from './assets/icons';

import css from './styles.module.scss';

const currentYear = moment().year();
const monthIndicator = { year: null, month: null };
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MonthPicker = ({
  className,
  darkMode,
  onChange,
  initialRange = {
    start: { ...monthIndicator },
    end: { ...monthIndicator },
  },
  id,
  ...attrs
}) => {
  const [year, setYear] = useState(initialRange?.start?.year || currentYear);
  const [selectedRange, setSelectedRange] = useState(initialRange);

  useEffect(() => {
    if (typeof onChange === 'function' && selectedRange.end.year)
      onChange(selectedRange);
  }, [selectedRange.end]); // eslint-disable-line

  const onMonthClick = index => {
    const selectedData = { year, month: index };
    const { start, end } = selectedRange;

    const isBeforeStart = () =>
      selectedData.year < start.year ||
      (selectedData.year === start.year && selectedData.month < start.month);

    /* check if date-range has been selected, selected date is before prev star
    date or none date has been selected yet as make it as start date. */
    if (!start.year || end.year || isBeforeStart())
      setSelectedRange({ start: selectedData, end: { ...monthIndicator } });
    else setSelectedRange(range => ({ ...range, end: selectedData }));
  };

  const isSelected = index => {
    const {
      start: { year: startYear, month: startMonth },
      end: { year: endYear, month: endMonth },
    } = selectedRange;

    const isAfterStart = index >= startMonth;
    const isBeforeEnd = index <= endMonth;

    if (endYear)
      return year === startYear && startYear === endYear
        ? isAfterStart && isBeforeEnd
        : year === startYear
          ? isAfterStart
          : year === endYear
            ? isBeforeEnd
            : year > startYear && year < endYear;
  };

  const isSelectedHead = (index, isFirst) => {
    const { start, end } = selectedRange;
    const comparisonObj = isFirst ? start : end;

    return year === comparisonObj.year && index === comparisonObj.month;
  };

  return (
    <div
      id={id}
      className={classNames(css.container_MonthPickerTis, { [css.dark_MonthPickerTis]: darkMode }, className)}
      {...attrs}
    >
      <header className={css.header_MonthPickerTis}>
        <span className={css.year_MonthPickerTis} data-testid='year'>
          {year}
        </span>

        <div className={css.navigation_MonthPickerTis}>
          <button
            className={css.navIcon_MonthPickerTis}
            onClick={() => {
              setYear(y => y - 1);
            }}
          >
            <PrevIcon />
          </button>{' '}
          <button
            className={css.navIcon_MonthPickerTis}
            onClick={() => setYear(y => y + 1)}
          >
            <NextIcon />
          </button>
        </div>
      </header>

      <div className={css.months_MonthPickerTis}>
        {months.map((month, index) => (
          <div
            key={index}
            className={classNames(css.month_MonthPickerTis, {
              [css.selected_MonthPickerTis]: isSelected(index),
              [css.selectedFirst_MonthPickerTis]: isSelectedHead(index, true),
              [css.selectedLast_MonthPickerTis]: isSelectedHead(index, false),
            })}
            onClick={() => onMonthClick(index)}
          >
            <span>{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

MonthPicker.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  initialRange: PropTypes.shape({
    start: PropTypes.shape({
      year: PropTypes.number,
      month: PropTypes.number,
    }),
    end: PropTypes.shape({
      year: PropTypes.number,
      month: PropTypes.number,
    })
  }),
};
