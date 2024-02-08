import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import paintingsAPI from '../../services/api';
import Painting from '../Painting/Painting';
import styles from './Paintings.module.scss';
import Pagination from '../Pagination';
import { useTheme } from '../../Providers/ThemeProvider';
import { RootState } from '../../state/store';

function Paintings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    search,
    authorId,
    locationId,
    range,
  } = useSelector((state: RootState) => state.filter);

  const { isDarkTheme } = useTheme();

  const { data: paintingsPagination } = paintingsAPI.useFetchPaitingsQuery({
    limit: 100,
    page: 1,
    q: search,
    authorId,
    locationId,
    created_gte: range?.from,
    created_lte: range?.before,
  });

  const { data: paintings } = paintingsAPI.useFetchPaitingsQuery({
    limit: 12,
    page: currentPage,
    q: search,
    authorId,
    locationId,
    created_gte: range?.from,
    created_lte: range?.before,
  });

  useEffect(() => {
    if (paintingsPagination) {
      const pages = Math.ceil(paintingsPagination.length / 12);
      setTotalPages(pages);
    }
  }, [paintingsPagination]);

  return (
    <>
      <div className={styles.paintingGallery}>
        {paintings && paintings.map(painting =>
          <Painting key={painting.id} painting={painting} />,
        )}
      </div>
      <Pagination currentPage={currentPage} isDarkTheme={isDarkTheme}
        onChange={(somePage) => setCurrentPage(somePage)}
        pagesAmount={totalPages} />
    </>
  );
}

export default Paintings;
