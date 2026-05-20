import Footer from './Footer';
import Navbar from './Navbar';
import styles from './PageLayout.module.css';

export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
