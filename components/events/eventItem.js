import Button from '../ui/button';
import styles from './eventItem.module.css';

function EventItem({ title, image, data, location, id }) {
  const humanReadableData = new Date(data).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <img src={'/' + image} alt={title} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <time>{humanReadableData}</time>
          </div>
          <div className={styles.address}>
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>Explore events</Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
