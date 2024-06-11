import { BagsDetailsI, ButtonsDictI } from '../../types';
import Container from '../Container/Container';
import Section from '../Section/Section';
import ProductImgGallery from '../shared/ProductImgGallery/ProductImgGallery';
import Description from '../../shared/Description/Description';
import {ButtonsDictI, DecorationDetailsI, IToastMessages} from '@components/types';

import styles from './BagsDetailsPage.module.scss';
import {IProductDescriptionDict} from "../../../../type";
interface BagsDetailsPageI {
  product: BagsDetailsI;
  buttonsDict: ButtonsDictI;
  toastMessages: IToastMessages;
  productDescriptionDict: IProductDescriptionDict;
 
}

const BagsDetailsPage: React.FC<BagsDetailsPageI> = ({
  product,
  buttonsDict,
  toastMessages,
  productDescriptionDict,
  
}) => {
  return (
    <>
      <Section id={styles.gallery_details_section}>
        <Container>
          <div className={styles.flexContainer}>
            <ProductImgGallery images={product.images} />
            <Description
              product={product}
              id="bags_details"
              buttonsDict={buttonsDict}
              toastMessages={toastMessages}
              productDescriptionDict={productDescriptionDict}
              
            />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default BagsDetailsPage;
