import { Box } from "@mui/material";
import { Cover } from "./_cover";
import { Map } from "./_map";
import { Products } from "./_products";

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
