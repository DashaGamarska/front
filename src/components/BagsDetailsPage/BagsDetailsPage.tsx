import {BagsDetailsI, ButtonsDictI, IToastMessages} from '../../types';
import Container from '@components/components/Container/Container';
import Section from '@components/components/Section/Section';
import Description from '../shared/Description/Description';
import ProductImgGallery from '@components/components/shared/ProductImgGallery/ProductImgGallery';

import styles from './BagsDetailsPage.module.scss';
import {IProductDescriptionDict} from "../../../type";

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
