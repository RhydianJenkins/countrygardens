import Cover from "@/components/cover";
import Products from "@/components/products";
import ContactUs from "@/components/contactUs";
import { ProductEntity } from "./api/products";

export const getStaticProps = async () => {
    // const res = await fetch("http://localhost:3000/api/data");
    // const data = await res.json();
    const products = [
        { name: "Product 1", value: 69 },
        { name: "Product 2", value: 420 },
    ] as ProductEntity[];

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
