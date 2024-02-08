import React, { useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { Input } from 'fwt-internship-uikit';
import { useSelector } from 'react-redux';
import { useTheme } from '../../Providers/ThemeProvider';
import styles from './Filters.module.scss';
import Select from '../Select';
import Range from '../Range';
import { RootState, useAppDispatch } from '../../state/store';
import { setAuthorId, setLocationId, setNameFilter, setRange } from '../../state/filterSlice';
import paintingsAPI from '../../services/api';
import { IAuthor } from '../../models/IAuthor';
import { ILocation } from '../../models/ILocation';

const cx = cn.bind(styles);

function Filters() {

  const { data: authors } = paintingsAPI.useFetchAuthorsQuery('');
  const { data: locations } = paintingsAPI.useFetchLocationsQuery('');

  const {
    authorId,
    locationId,
  } = useSelector((state: RootState) => state.filter);

  const { isDarkTheme } = useTheme();

  const dispatch = useAppDispatch();

  const [author, setAuthor] = useState('Author');
  const [location, setLocation] = useState('Location');

  const [from, setFrom] = useState('');
  const [before, setBefore] = useState('');

  useEffect(() => {
    if (authorId === null) {
      setAuthor('Author');
    }

    if (locationId === null) {
      setLocation('Location');
    }
  }, [authorId, locationId]);

  const handleRangeClose = () => {
    if (from && before) {
      dispatch(setRange({
        from,
        before,
      }));
      setFrom('');
      setBefore('');
    }
  };

  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]|(\d{5,})/g, (_, exceed) => exceed ? exceed.slice(0, 4) : '');
    setFrom(numericValue);
  };

  const handleBefore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]|(\d{5,})/g, (_, exceed) => exceed ? exceed.slice(0, 4) : '');
    setBefore(numericValue);
  };

  const onSetNameFilter = (filterValue: string) => {
    dispatch(setNameFilter(filterValue));
  };

  const onSelectLocation = (selectedOption: string) => {
    setLocation(selectedOption);
    const locationToDispatch = locations.find((item: ILocation) => item.location === selectedOption);
    if (locationToDispatch) {
      dispatch(setLocationId(locationToDispatch));
    }
  };

  const onSelectAuthor = (selectedOption: string) => {
    setAuthor(selectedOption);
    const authorToDispatch = authors.find((item: IAuthor) => item.name === selectedOption);
    if (authorToDispatch) {
      dispatch(setAuthorId(authorToDispatch));
    }
  };

  return (
    <div className={styles.FiltersWrapper}>
      <Input isDarkTheme={isDarkTheme}
        placeholder='Name'
        className={cx('Input', {
          'InputDark': isDarkTheme,
        })}
        onChange={(e) => onSetNameFilter(e.target.value)}
      />
      <Select disabled={false} isDarkTheme={isDarkTheme} onChange={(selectedOption) => {
        onSelectAuthor(selectedOption);
      }} options={authors} value={author} type='author' />
      <Select disabled={false} isDarkTheme={isDarkTheme} onChange={(selectedOption) => {
        onSelectLocation(selectedOption);
      }} options={locations} value={location} type='location' />

      <Range isDarkTheme={isDarkTheme} onClose={handleRangeClose}>
        <div className={styles.RangeWrapper}>
          <input className={cx('RangeInput', {
            'RangeInput--dark': isDarkTheme,
          })} type='text' placeholder='from' onChange={handleFrom}
          value={from} /><span className={styles.RangeDash}>—</span><input
            className={cx('RangeInput', {
              'RangeInput--dark': isDarkTheme,
            })}
            type='text'
            placeholder='before'
            onChange={handleBefore}
            value={before}
          />
        </div>
      </Range>
    </div>
  );
}

export default Filters;
