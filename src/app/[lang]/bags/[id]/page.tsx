import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@components/components/Breadcrumbs/Breadcrumbs';
import BagsDetailsPage from '@components/components/BagsDetailsPage/BagsDetailsPage';
//import RelatedProducts from '@components/components/shared/RelatedProducts/RelatedProducts';
import { convertToServerLocale } from '@components/helpers/convertToServerLocale';
import type { Locale } from '@i18n';
import { fetchBagsById } from '@lib/api-services/fetchBagsById';
//import { fetchSimilarProducts } from '@lib/api-services/fetchSimilarProducts';
import { getDictionary } from '@lib/utils/dictionary';

interface Params {
    lang: Locale;
    id: string;
    slug?: string; 
}

export async function generateMetadata({
    params: { lang, id, slug = 'bag' },
    }: {
    params: Params;
}) {
    const currentLang = convertToServerLocale(lang);

    const bags = await fetchBagsById({ id, currentLang, slug });

    return {
        title: `CraftedElegance | ${bags.title}`,
    };
}

const BagsDetails: FC<{ params: Params }> = async ({ params: { lang, id, slug = 'bag' } }) => {
    const {
        breadcrumbs,
        relatedProducts: { title },
        general: { buttons, messages },
        productDescription,
    } = await getDictionary(lang);

    const currentLang = convertToServerLocale(lang);

    const bags = await fetchBagsById({ id, currentLang, slug });
    //const similarProducts = await fetchSimilarProducts({ id, currentLang });

    return (
        <>
            <Breadcrumbs
                items={[
                    {
                        label: breadcrumbs.bags,
                        path: `/bags/${slug}`,
                    },
                    {
                        label: bags.name,
                        path: `/bags/${bags.id}`,
                    },
                ]}
                lang={lang}
            />
            <BagsDetailsPage
                product={bags}
                buttonsDict={buttons}
                toastMessages={messages}
                productDescriptionDict={productDescription}
            />
        </>
    );
};

export default BagsDetails;
