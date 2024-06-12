import type { BoxDetailsI, BagsSectionProps } from '@components/types';

import BagsCard from '../BagsCard/BagsCard';

import styles from './BagsList.module.scss';

const BagsList = async ({
  dict,
  bags,
  toastMessage,
  lang,
}: BagsSectionProps) => {
  const items = await bags;
  return (
    <ul className={styles.list}>
      {items.map((box: BoxDetailsI) => (
        <BagsCard
          key={box.id}
          box={box}
          dict={dict}
          toastMessage={toastMessage}
          lang={lang}
        />
      ))}
    </ul>
  );
};

export default BagsList;
