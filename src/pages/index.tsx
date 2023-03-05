import Cover from "@/components/cover";
import Products, { ProductsProps } from "@/components/products";
import ContactUs from "@/components/contactUs";
import { GetServerSideProps } from "next";
import { Product } from "@/database";

type Props = {
    products: Product[],
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const defaultBaseUrl = 'http://localhost:3000';
    const url = `${process.env.BASE_FETCH_URL || defaultBaseUrl}/api/products`;
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
