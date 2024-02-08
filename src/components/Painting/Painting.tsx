import React, { useEffect, useState } from 'react';
import { IPainting } from '../../models/IPainting';
import styles from './Painting.module.scss';
import paintingsAPI from '../../services/api';
import { ILocation } from '../../models/ILocation';
import { IAuthor } from '../../models/IAuthor';

interface IPaintingProps {
  painting: IPainting;
}

function Painting({ painting }: IPaintingProps) {

  const { data: authors } = paintingsAPI.useFetchAuthorsQuery('');
  const { data: locations } = paintingsAPI.useFetchLocationsQuery('');

  const [authorInfo, setAuthorInfo] = useState<IAuthor | null>(null);
  const [locationInfo, setLocationInfo] = useState<ILocation | null>(null);

  useEffect(() => {

    const findAuthorInfo = authors.find((author: IAuthor) => author.id === painting.authorId);
    const findLocationInfo = locations.find((location: ILocation) => location.id === painting.locationId);

    setAuthorInfo(findAuthorInfo);
    setLocationInfo(findLocationInfo);

  }, [authors, locations, painting.authorId, painting.locationId]);

  if (!authorInfo || !locationInfo) {
    return null;
  }

  return (
    <div className={styles.paintingContainer}>
      <img className={styles.paintingImage} src={painting.imageUrl} alt='' />
      <div className={styles.paintingDescription}>
        <p className={styles.paintingDescription__header}>{painting.name}</p>
        <p className={styles.paintingDescription__field}>
          <span className={styles.paintingDescription__field__param}>Author: </span>
          <span>{authorInfo.name}</span>
        </p>
        <p className={styles.paintingDescription__field}>
          <span className={styles.paintingDescription__field__param}>Created: </span>
          <span>{painting.created}</span>
        </p>
        <p className={styles.paintingDescription__field}>
          <span className={styles.paintingDescription__field__param}>Location: </span>
          <span>{locationInfo.location}</span>
        </p>
      </div>
    </div>
  );
}

export default Painting;

