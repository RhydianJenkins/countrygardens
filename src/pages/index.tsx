import Cover from "@/components/cover";
import Shop from "@/components/shop";
import ContactUs from "@/components/contactUs";
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
            <Shop products={products} />
            <ContactUs />
        </>
    );
}

export default Home;
