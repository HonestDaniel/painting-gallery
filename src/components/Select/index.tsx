import React, { useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import cn from 'classnames/bind';
import useOutsideClick from '../../hooks/useOutsideClick';
import Arrow from '../Arrow';
import { ReactComponent as Union } from '../../images/Union.svg';
import './SimpleBar.scss';
import styles from './Select.module.scss';
import { IAuthor } from '../../models/IAuthor';
import { ILocation } from '../../models/ILocation';
import { useAppDispatch } from '../../state/store';
import { setAuthorId, setLocationId } from '../../state/filterSlice';

const cx = cn.bind(styles);

export interface ISelect<T extends IAuthor | ILocation> {
  /**
   * Specify an optional className to be applied to the select box
   */
  // eslint-disable-next-line react/require-default-props
  className?: string;
  /**
   * Specify whether the control is disabled
   */
  disabled: boolean;
  /**
   * Provide the contents of your Select
   */
  options: T[];
  /**
   * Current theme
   */
  isDarkTheme: boolean;
  /**
   * The value of the `<select>`
   */
  value: string;
  /**
   * The callback function that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange: (name: string) => void;

  type: string;
}

function Select<T extends IAuthor | ILocation>({
  className = '',
  disabled = false,
  options,
  isDarkTheme = false,
  value,
  onChange,
  type,
}: ISelect<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  useOutsideClick(ref, toggleOpen);

  const dispatch = useAppDispatch();

  const handleUnionClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    if (type === 'author') {
      dispatch(setAuthorId(null));
    } else if (type === 'location') {
      dispatch(setLocationId(null));
    }
  };

  return (
    <div
      ref={isOpen ? ref : null}
      className={cx(className, 'Select', {
        'Select--open': isOpen,
        'Select--dark': isDarkTheme,
      })}
      onClick={!disabled ? toggleOpen : () => {
      }}
      aria-hidden='true'>
      {!value && <span className={cx('Select__title')}>Choose an option</span>}
      <span className={cx('Select__title')}>{value}</span>
      <Union onClick={handleUnionClick} className={cx('Union', {
        'Union--dark': isDarkTheme,
      })} />
      <Arrow isOpen={isOpen} className={cx('Select__arrow')} isDarkTheme={isDarkTheme} />
      {isOpen && options && (
        <ul
          className={cx('Select__optionContainer', {
            'Select__optionContainer--open': isOpen,
            'Select__optionContainer--dark': isDarkTheme,
          })}>
          <SimpleBar style={{ maxHeight: 'inherit' }}>
            {options.map((option) => (
              <li
                onClick={() => onChange((option as IAuthor).name || (option as ILocation).location)}
                className={cx('Select__option', {
                  'Select__option--dark': isDarkTheme,
                })}
                key={option.id}
                aria-hidden='true'>
                <p
                  className={cx('Select__optionName')}>{(option as IAuthor).name || (option as ILocation).location}</p>
              </li>
            ))}
          </SimpleBar>
        </ul>
      )}
    </div>
  );
};

export default Select;
