import { Box } from "@mui/material";
import Cover from "@/components/cover";
import Products from "@/components/products";
import AboutUs from "@/components/AboutUs";

export default function Home() {
    return (
        <Box sx={{
        }}>
            <Cover />
            <Products />
            <AboutUs />
        </Box>
    );
}
