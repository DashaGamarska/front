// src/components/shared/BuyButtons/BuyButtons.tsx

'use client';
import React from 'react';
import Button from '@components/components/Button/Button';
import { useCartActionsContext } from '@context/CartContext';
import { IToastMessages } from '@components/types';

interface Product {
  id: string;
  price: number;
  images: string[];
  description: string;
  slug: string;
  name: string;
  title: string;
  aroma: number;
}

interface BuyButtonsProps {
  product: Product;
  isBox: boolean;
  quantity: number;  // Add quantity here
  toastMessages: IToastMessages;  // Ensure this is passed as well
}

const BuyButtons: React.FC<BuyButtonsProps> = ({ product, isBox, quantity, toastMessages }) => {
  const { addBoxToCart } = useCartActionsContext();
  const { id, price, images, description, slug, name, title, aroma } = product;

  return (
    <div>
      {isBox && typeof aroma === 'number' && (
        <Button
          variant="primary"
          type="button"
          onClick={() =>
            addBoxToCart({
              id,
              toastMessage: toastMessages.itemAdded,
              aroma,
              quantity,
              price,
              images,
              description,
              slug,
              name,
              title,
            })
          }
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default BuyButtons;
