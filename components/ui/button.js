import Link from 'next/link';
import styles from './button.module.css';

function Button({ children, link }) {
  return (
    <Link href={link}>
      <a className={styles.btn}>{children}</a>
    </Link>
  );
}

export default Button;
