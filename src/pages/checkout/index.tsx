import Basket from "@/components/basket";
import { getProducts, ProductEntity } from "@/pages/api/products";

type CheckoutPageProps = {
    allProducts: ProductEntity[];
}

export const getStaticProps = async () => {
    const allProducts = await getProducts();

    return {
        props: { allProducts },
        revalidate: 20,
    };
};

function CheckoutPage({ allProducts }: CheckoutPageProps) {
    return <Basket allProducts={allProducts} />;
}

export default CheckoutPage;
