// src/components/shared/Description/Description.tsx

'use client';
import { useState } from 'react';
import Typography from '@components/components/Typography/Typography';
import { IToastMessages} from "@components/types"
import AccordionSection from '../AccordionSection/AccordionSection';
import BuyButtons from '../BuyButtons/BuyButtons';
import DecorationQuantity from '../DecorationQuantity/DecorationQuantity';

import styles from './Description.module.scss';
 interface IProductDescriptionDict {
  price: string;
  quantity: string;
  topNotes: string;
  baseNotes: string;
  volume: string;
  containerVolume: string;
  matchsticks: string;
  wick: string;
  wax: string;
  color: string;
  aroma: string;
  aromaToChoose: string;
  volumeLabel: string;
}
interface DescriptionProps {
  product: EmbroideryDetailsI;
  id: string;
  buttonsDict: ButtonsDictI;
  toastMessages: IToastMessages;
  productDescriptionDict: IProductDescriptionDict;
  embroidery?: EmbroideryDetailsI[];
}

const Description: React.FC<DescriptionProps> = ({
  product,
  id,
  buttonsDict,
  toastMessages,
  productDescriptionDict,
  embroidery,
}) => {
  const [quantity, setQuantity] = useState(1);

  const { id: productId, name, description, price, slug } = product;

  const { price: priceDict, quantity: quantityDict } = productDescriptionDict;

  const isEmbroideryPage = id === 'embroidery_details';

  return (
    <div className={styles.descriptionWrapper}>
      <div className={styles.productWrapper}>
        <Typography
          variant="bodyXLHeavy"
          color="var(--cl-primary-800)"
          className={styles.title}
        >
          {name}
        </Typography>
        <Typography
          variant="bodyRegular"
          color="var(--cl-gray-500)"
          className={styles.description}
        >
          {description}
        </Typography>
        <div className={styles.costWrapper}>
          <Typography variant="button" color="var(--cl-gray-500)">
            {priceDict}:
          </Typography>
          <div className={styles.cost}>
            <Typography
              variant="subheadingMobile"
              color="var(--cl-primary-500)"
            >
              {price}
            </Typography>
            <span className={styles.costSymbol}>&#8372;</span>
          </div>
        </div>
        <div className={styles.quantity}>
          <Typography variant="button" color="var(--cl-gray-500)">
            {quantityDict}:
          </Typography>
          <DecorationQuantity qty={quantity} setQuantity={setQuantity} />
        </div>
        <BuyButtons
          product={{
            id: productId,
            slug,
            price,
            name,
            description,
            title: name,  // Assuming title is same as name here, adjust if needed
            images: [],  // You need to pass images from your product object
            aroma: 0  // Default value, adjust if necessary
          }}
          isBox={true}
          quantity={quantity}
          toastMessages={toastMessages}
        />
        {isEmbroideryPage && (
          <div className={styles.accordion}>
            {embroidery &&
              embroidery.map((component, index) => (
                <AccordionSection
                  key={index}
                  title={component.name}
                  content={component.description}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
