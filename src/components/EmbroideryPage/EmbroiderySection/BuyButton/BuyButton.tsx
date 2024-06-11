'use client';
import Button from '@components/components/Button/Button';
import { useCartActionsContext } from '@context/CartContext';

interface BuyButtonProps {
  product: {
    id: string;
    price: number;
    images: string[]; 
    description: string; 
    slug: string; 
    name: string; 
    title: string; 
  };
  buyBtn: string;
  toastMessage: string;
}

const BuyButton: React.FC<BuyButtonProps> = ({
  product,
  buyBtn,
  toastMessage,
}) => {
  const { addEmbroideryToCart } = useCartActionsContext();
  const { id, price, images, description, slug, name, title } = product;

  console.log("product buy", product);
  return (
    <Button
      variant="primary"
      type="button"
      onClick={() =>
        addEmbroideryToCart({
          id,
          toastMessage,
          quantity: 1,
          price,
          images, 
          description, 
          slug, 
          name, 
          title, 
        })
      }
    >
      {buyBtn}
    </Button>
  );
};

export default BuyButton;
