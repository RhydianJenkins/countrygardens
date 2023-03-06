import Cover from "@/components/cover";
import Products from "@/components/products";
import ContactUs from "@/components/contactUs";

function Home() {
    return (
        <>
            <Cover />
            <Products products={[]}/>
            <ContactUs />
        </>
    );
}

export default Home;
