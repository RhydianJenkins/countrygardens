import React from "react";

function useBasket() {
    const [basket, setBasket] = React.useState(() => {
        if (typeof window === "undefined") {
            return {};
        }

        try {
            const basketString = window.localStorage.getItem('basket') || '{}';
            const basket = JSON.parse(basketString);
            return basket;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            return {};
        }
    });

    const addItem = (id: string) => {
        try {
            basket[id] = basket[id] ? basket[id] + 1 : 1;

            setBasket(basket);

            if (typeof window !== "undefined") {
                window.localStorage.setItem('basket', JSON.stringify(basket));
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
                console.warn(`${id} not in basket`);
                return;
            }

            basket[id] = basket[id] - number;

            if (basket[id] <= 0) {
                delete basket[id];
            }

            setBasket(basket);

            if (typeof window !== "undefined") {
                window.localStorage.setItem('basket', JSON.stringify(basket));
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }

    };

    return [basket, addItem, removeItem];
}

export default useBasket;
