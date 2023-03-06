import Cover from "@/components/cover";
import Products, { ProductsProps } from "@/components/products";
import ContactUs from "@/components/contactUs";
import { getProducts } from "./api/products";

export async function getServerSideProps() {
    const products = await getProducts();

    return {
        props: { products },
    };
}

function Home({ products }: ProductsProps) {
    return (
        <>
            <Cover />
            <Products products={products} />
            <ContactUs />
        </>
    );
}

export default Home;
