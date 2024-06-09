
'use client';
import BagsDetailsPage from '@components/components/BagsDetailsPage/BagsDetailsPage';
import Breadcrumbs from '@components/components/Breadcrumbs/Breadcrumbs';
//import RelatedProducts from '@components/components/shared/RelatedProducts/RelatedProducts';
import { convertToServerLocale } from '@components/helpers/convertToServerLocale';
import type { Locale } from '@i18n';
import { fetchBagsById } from '@lib/api-services/fetchBagsById';
//import { fetchSimilarProducts } from '@lib/api-services/fetchSimilarProducts';
import { getDictionary } from '@lib/utils/dictionary';

interface BagsDetailsProps {
  lang: Locale;
  id: string;
}

const BagsDetails: FC<BagsDetailsProps> = ({ lang, id }) => {
const { data: bagsData } = fetchBagsById({ id, slug: 'some-slug-value', currentLang: convertToServerLocale(lang) });
   // const { data: similarProductsData } = fetchSimilarProducts({ id, slug: 'some-slug-value', currentLang: convertToServerLocale(lang) });
    const { data: dictionaryData } = getDictionary(lang);

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: dictionaryData.breadcrumbs.bags,
            path: '/bags',
          },
          {
            label: bagsData.name,
            path: `/bags/${bagsData.id}`,
          },
        ]}
        lang={lang}
      />
      <BagsDetailsPage
        product={bagsData}
        buttonsDict={dictionaryData.general.buttons}
        toastMessages={dictionaryData.general.messages}
        productDescriptionDict={dictionaryData.productDescription}
        configuratorDict={dictionaryData.page.embroidery?.configurator || {}}
      />
     
    </>
  );
};

export default BagsDetails;
