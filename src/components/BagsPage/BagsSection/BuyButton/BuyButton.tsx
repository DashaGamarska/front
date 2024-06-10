import React from 'react';
import Button from '@components/components/Button/Button';
import { useCartActionsContext } from '@context/CartContext';

interface Product {
  id: string;
  price: number;
  images: string[];
  description: string;
  slug: string;
  name: string;
  title: string;
}

interface BuyButtonProps {
  product: Product;
  buyBtn: string;
  toastMessage: string;
}

const BuyButton: React.FC<BuyButtonProps> = ({
  product,
  buyBtn,
  toastMessage,
}) => {
  const { addBoxToCart } = useCartActionsContext();
  const { id, price, images, description, slug, name, title } = product;

  return (
    <Button
      variant="primary"
      type="button"
      onClick={() =>
        addBoxToCart({
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
