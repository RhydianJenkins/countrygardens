import React from "react";

type BasketType = Record<string, number>;
type AddBasketItemType = (id: string) => void;
type RemoveBasketItemType = (id: string, number?: number) => void;
type BasketReturnType = [ BasketType, AddBasketItemType, RemoveBasketItemType ];
type BasketContextType = {
    basket: BasketType,
    addBasketItem: AddBasketItemType,
    removeBasketItem: RemoveBasketItemType
}

export const BasketContext = React.createContext<BasketContextType>({
    basket: {},
    addBasketItem: () => {
        // eslint-disable-next-line no-console
        console.error('addBasketItem not set');
    },
    removeBasketItem: () => {
        // eslint-disable-next-line no-console
        console.error('removeBasketItem not set');
    },
});

function useBasket(): BasketReturnType {
    const [basket, setBasket] = React.useState<BasketType>(() => {
        if (typeof window !== 'undefined') {
            try {
                const basketString = window.localStorage.getItem('basket') || '{}';
                const basket = JSON.parse(basketString);

                return basket;
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        }

        return {};
    });

    const addItem = (id: string) => {
        try {
            const basketClone = { ...basket };

            basketClone[id] = (basketClone[id] || 0) + 1;

            setBasket(basketClone);

            if (typeof window !== "undefined") {
                window.localStorage.setItem('basket', JSON.stringify(basketClone));
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    const removeItem = (id: string, number = 1) => {
        try {
            if (!(id in basket)) {
                // eslint-disable-next-line no-console
                console.warn(`Unable to remove ${id} from basket (not in basket)`);
                return;
            }

            const basketClone = { ...basket };

            basketClone[id] = basketClone[id] - number;

            if (basketClone[id] <= 0) {
                delete basketClone[id];
            }

            setBasket(basketClone);

            if (typeof window !== "undefined") {
                window.localStorage.setItem('basket', JSON.stringify(basketClone));
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    return [basket, addItem, removeItem];
}

export default useBasket;