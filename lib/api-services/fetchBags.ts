import { BASE_URL } from '@components/constants';
type ServerLocale = 'UA' | 'EN';
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
  kit: string | undefined;
}
export const fetchBags = async (lang: ServerLocale): Promise<BoxDetailsI []> => {
  //TODO: Remove revalidate
  const response = await fetch(`${BASE_URL}/bags?lang=${lang}`, {next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch bags');
  }

  const data = await response.json();
  return data?._embedded?.bags;
};
