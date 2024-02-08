import React from 'react';
import styles from './App.module.scss';
import Header from '../Header/Header';
import { useTheme } from '../../Providers/ThemeProvider';
import Filters from '../Filters/Filters';
import Paintings from '../Paintings/Paintings';

function App() {

  const { isDarkTheme } = useTheme();

  return (
    <div className={isDarkTheme ? styles.darkTheme : styles.lightTheme}>
      <div className={styles.content}>
        <Header />
        <Filters />
        <Paintings />
      </div>
    </div>
  );
}

export default App;
