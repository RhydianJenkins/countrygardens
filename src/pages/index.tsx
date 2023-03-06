import Cover from "@/components/cover";
import Products from "@/components/products";
import ContactUs from "@/components/contactUs";
import { getProducts } from "@/database";
import { ProductEntity } from "./api/products";

export const getStaticProps = async () => {
    const products = await getProducts();

    return {
        props: { products },
        revalidate: 20,
    };
};

function Home({ products }: { products: ProductEntity[] }) {
    return (
        <>
            <Cover />
            <Products products={products}/>
            <ContactUs />
        </>
    );
}

export default Home;
