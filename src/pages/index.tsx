import Cover from "@/components/cover";
import Products, { ProductsProps } from "@/components/products";
import ContactUs from "@/components/contactUs";

export async function getServerSideProps() {
    const products = [
        { name: "Product 1", value: 69 },
        { name: "Product 2", value: 420 },
    ];

    return {
        props: { products },
    };
}

function Home({ products }: ProductsProps) {
    return (
        <>
            <Cover />
            <Products products={[]}/>
            <ContactUs />
        </>
    );
}

export default Home;
