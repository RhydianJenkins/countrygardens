import Cover from "@/components/cover";
import Products, { ProductsProps } from "@/components/products";
import ContactUs from "@/components/contactUs";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<ProductsProps> = async () => {
    const url = 'http://localhost:3000/api/products';
    const res = await fetch(url);
    const products = await res.json();

    if (!res.ok) {
        throw new Error(`Failed to prefetch products, received status ${res.status}`);
    }

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
