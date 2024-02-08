import React from 'react';
import styles from './Header.module.scss';
import { useTheme } from '../../Providers/ThemeProvider';

function Header() {

  const {
    isDarkTheme,
    setIsDarkTheme,
  } = useTheme();

  return (
    <div className={styles.header}>
      <img src='fwt.svg' alt='logo' />
      <button onClick={() => setIsDarkTheme ? setIsDarkTheme(!isDarkTheme) : ''} type='button'
        className={styles.toggleThemeButton}>
        <img src={isDarkTheme ? 'sun-white.svg' : 'sun-black.svg'} alt='theme-toggle' />
      </button>
    </div>
  );
}

export default Header;
