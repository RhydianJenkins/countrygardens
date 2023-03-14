import Cover from "@/components/cover";
import Products from "@/components/products";
import ContactUs from "@/components/contactUs";
import Stripe from "stripe";
import { getProducts, ProductEntity } from "./api/products";

type HomePageProps = {
    products: ProductEntity[],
}

export const getStaticProps = async () => {
    const products = await getProducts();
    const props: HomePageProps = { products };

    return {
        props,
        revalidate: 20,
    };
};

function Home({ products }: HomePageProps) {
    return (
        <>
            <Cover />
            <Products products={products} />
            <ContactUs />
        </>
    );
}

export default Home;
