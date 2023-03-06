import Cover from "@/components/cover";
import Products, { ProductsProps } from "@/components/products";
import ContactUs from "@/components/contactUs";
import { GetServerSideProps } from "next";
import { getProducts } from "./api/products";

export const getServerSideProps: GetServerSideProps<ProductsProps> = async () => {
    const products = await getProducts();

    return {
        props: { products },
    };
};

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
