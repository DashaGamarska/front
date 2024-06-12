import type {  BagsSectionProps } from '@components/types';

import BagsCard from '../BagsCard/BagsCard';

import styles from './BagsList.module.scss';
interface ComponentI {
  title: string;
  content: string;
}
interface BoxDetailsI {
  id: string;
  images: string[];
  title: string;
  name: string;
  price: number;
  components: ComponentI[];
  description: string;
  slug: string;
  volume: string;  
  text: string;    
  kit: string;
}
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
