import { Box } from "@mui/material";
import Cover from "@/components/cover";
import Products from "@/components/products";
import ContactUs from "@/components/ContactUs";

export default function Home() {
    return (
        <Box sx={{
        }}>
            <Cover />
            <Products />
            <ContactUs />
        </Box>
    );
}
