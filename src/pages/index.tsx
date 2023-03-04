import { Box } from "@mui/material";
import Cover from "@/components/cover";
import Map from "@/components/map";
import Products from "@/components/products";

export default function Home() {
  return (
    <Box sx={{
    }}>
      <Cover />
      <Products />
      <Map />
    </Box>
  );
}
