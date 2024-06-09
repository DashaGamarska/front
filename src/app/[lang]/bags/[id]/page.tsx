'use client';
import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@components/components/Breadcrumbs/Breadcrumbs';
import { convertToServerLocale } from '@components/helpers/convertToServerLocale';
import type { Locale } from '@i18n';
import { fetchBagsById } from '@lib/api-services/fetchBagsById';
import { getDictionary } from '@lib/utils/dictionary';

const BagsDetailsPage = dynamic(() => import('@components/components/BagsDetailsPage/BagsDetailsPage'), { ssr: false });

interface BagsDetailsProps {
  lang: Locale;
  id: string;
}

const BagsDetails: FC<BagsDetailsProps> = ({ lang, id }) => {
  const { data: bagsData } = fetchBagsById({ id, slug: 'some-slug-value', currentLang: convertToServerLocale(lang) });
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
