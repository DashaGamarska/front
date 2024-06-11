'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { DECREMENT, INCREMENT } from '@components/constants';
import { getInitialCartProducts } from '@components/helpers';
import { showToast } from '@components/helpers/showToast';
import { useLocalStorage } from '@components/hooks/useLocalStorage';

interface IAddDecorationsToCartParams {
  id: string;
  toastMessage?: string;
  quantity?: number;
  price: number;
  images: string[];
  description: string;
  slug: string;
  name: string;
  title: string;
  aroma?: number;
}

interface IAddEmbroideryToCartParams {
  id: string;
  toastMessage?: string;
  quantity?: number;
  price: number;
  images: string[];
  description: string;
  slug: string;
  name: string;
  title: string;
}

interface IToggleQuantityParams {
  id: string;
  value: typeof INCREMENT | typeof DECREMENT;
  type: 'embroidery' | 'decorations';
}

interface IDeleteCartItemParams {
  id: string;
  type: 'embroidery' | 'decorations';
  toastMessage: string;
}

interface CartContextProps {
  children: React.ReactNode;
}

interface CartContextI {
  cartProducts: ICartProducts;
  totalCartProducts: number;
  cartTotalPrice: number;
}

interface CartActionsContextProps {
  addDecorationsToCart: (params: IAddDecorationsToCartParams) => void;
  addEmbroideryToCart: (params: IAddEmbroideryToCartParams) => void;
  addBoxToCart: (params: IAddDecorationsToCartParams) => void;
  toggleQuantity: (params: IToggleQuantityParams) => void;
  deleteCartItem: (params: IDeleteCartItemParams) => void;
  clearCartProducts: () => void;
}

const CartContext = createContext<CartContextI | null>(null);
const CartActionsContext = createContext<CartActionsContextProps | null>(null);

export const CartContextProvider = ({ children }: CartContextProps) => {
  const initCartProducts = getInitialCartProducts();

  const [cartProducts, setCartProducts] = useLocalStorage<ICartProducts>(
    'cartProducts',
    initCartProducts
  );

  const addBoxToCart = useCallback(
    ({
      id,
      toastMessage,
      quantity = 1,
      price,
      images,
      description,
      slug,
      name,
      title
    }: IAddDecorationsToCartParams) => {
      setCartProducts(prevItems => {
        const isBoxInCart = prevItems.decorations?.find(
          box => box.id === id
        );
        const updatedItems = isBoxInCart
          ? {
              ...prevItems,
              decorations: prevItems.decorations.map(box => {
                if (box.id === id) {
                  return {
                    ...box,
                    quantity: box.quantity + quantity,
                  };
                }
                return box;
              }),
            }
          : {
              ...prevItems,
              decorations: [
                ...prevItems.decorations,
                { id, quantity, price, images, description, slug, name, title }
              ],
            };
        return updatedItems;
      });

      showToast(`${toastMessage}`);
    },
    [setCartProducts]
  );

  const decorationsQuantity =
    cartProducts.decorations.length > 0
      ? cartProducts.decorations.reduce((acc, item) => acc + item.quantity, 0)
      : 0;
  const embroideryQuantity =
    cartProducts.embroidery.length > 0
      ? cartProducts.embroidery.reduce((acc, item) => acc + item.quantity, 0)
      : 0;

  const totalCartProducts = decorationsQuantity + embroideryQuantity ?? 0;

  const decorationsTotalPrice =
    cartProducts.decorations.length > 0
      ? cartProducts.decorations.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        )
      : 0;

  const embroideryTotalPrice =
    cartProducts.embroidery.length > 0
      ? cartProducts.embroidery.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        )
      : 0;

  const cartTotalPrice = decorationsTotalPrice + embroideryTotalPrice ?? 0;

  const addDecorationsToCart = useCallback(
    ({
      id,
      toastMessage,
      quantity = 1,
      price,
      images,
      description,
      slug,
      name,
      title
    }: IAddDecorationsToCartParams) => {
      setCartProducts(prevItems => {
        const isDecorationsInCart = prevItems.decorations?.find(
          decorations => decorations.id === id
        );
        const updatedItems = isDecorationsInCart
          ? {
              ...prevItems,
              decorations: prevItems.decorations.map(decoration => {
                if (decoration.id === id) {
                  return {
                    ...decoration,
                    quantity: decoration.quantity + quantity,
                  };
                }
                return decoration;
              }),
            }
          : {
              ...prevItems,
              decorations: [
                ...prevItems.decorations,
                { id, quantity, price, images, description, slug, name, title }
              ],
            };
        return updatedItems;
      });

      showToast(`${toastMessage}`);
    },
    [setCartProducts]
  );

  const addEmbroideryToCart = useCallback(
    ({
      id,
      toastMessage,
      quantity = 1,
      price,
      images,
      description,
      slug,
      name,
      title
    }: IAddEmbroideryToCartParams) => {
      setCartProducts(prevItems => {
        const isEmbroideryInCart = prevItems.embroidery.find(
          embroidery => embroidery.id === id
        );
        const updatedItems = isEmbroideryInCart
          ? {
              ...prevItems,
              embroidery: prevItems.embroidery.map(embroidery => {
                if (embroidery.id === id) {
                  return {
                    ...embroidery,
                    quantity: embroidery.quantity + quantity,
                  };
                }
                return embroidery;
              }),
            }
          : {
              ...prevItems,
              embroidery: [
                ...prevItems.embroidery,
                { id, quantity, price, images, description, slug, name, title }
              ],
            };
        return updatedItems;
      });

      showToast(`${toastMessage}`);
    },
    [setCartProducts]
  );

  const toggleQuantity = useCallback(
    ({ id, value, type }: IToggleQuantityParams) => {
      if (type === 'decorations') {
        setCartProducts(prevItems => {
          const updatedDecorations = prevItems.decorations.map(item => {
            if (item.id === id && value === INCREMENT) {
              return { ...item, quantity: item.quantity + 1 };
            }
            if (item.id === id && value === DECREMENT) {
              return {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              };
            }
            return item;
          });

          return { ...prevItems, decorations: updatedDecorations };
        });
      }

      if (type === 'embroidery') {
        setCartProducts(prevItems => {
          const updatedEmbroidery = prevItems.embroidery.map(item => {
            if (item.id === id && value === INCREMENT) {
              return { ...item, quantity: item.quantity + 1 };
            }
            if (item.id === id && value === DECREMENT) {
              return {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              };
            }
            return item;
          });

          return { ...prevItems, embroidery: updatedEmbroidery };
        });
      }
    },
    [setCartProducts]
  );

  const deleteCartItem = ({
    id,
    type,
    toastMessage,
  }: IDeleteCartItemParams) => {
    if (type === 'decorations') {
      setCartProducts(prevItems => {
        const updatedDecorations = prevItems.decorations.filter(
          item => item.id !== id
        );
        return {
          ...prevItems,
          decorations: updatedDecorations,
        };
      });
    }

    if (type === 'embroidery') {
      setCartProducts(prevItems => {
        const embroideryIndex = prevItems.embroidery.findIndex(
          item => item.id === id
        );

        const updatedEmbroidery =
          embroideryIndex !== -1
            ? prevItems.embroidery.filter(
                (_, index) => index !== embroideryIndex
              )
            : prevItems.embroidery;

        return {
          ...prevItems,
          embroidery: updatedEmbroidery,
        };
      });
    }

    showToast(`${toastMessage}`);
  };

  const clearCartProducts = useCallback(() => {
    setCartProducts(initCartProducts);
  }, [initCartProducts, setCartProducts]);

  const contextValue = useMemo(
    () => ({
      cartProducts,
      totalCartProducts,
      cartTotalPrice,
    }),
    [cartProducts, totalCartProducts, cartTotalPrice]
  );

  return (
    <CartContext.Provider value={contextValue}>
      <CartActionsContext.Provider
        value={{
          addDecorationsToCart,
          addEmbroideryToCart,
          toggleQuantity,
          addBoxToCart,
          deleteCartItem,
          clearCartProducts,
        }}
      >
        {children}
      </CartActionsContext.Provider>
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('useCartContext must be used within a ContextProvider');

  return context;
};

export const useCartActionsContext = () => {
  const context = useContext(CartActionsContext);
  if (!context)
    throw new Error(
      'useCartActionsContext must be used within a ContextProvider'
    );

  return context;
};
