import { Badge, Box } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box sx={{
      width: '80vw',
      backgroundColor: 'secondary.main',
      margin: 'auto',
      padding: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Badge><Facebook /></Badge>
      <Badge><Instagram /></Badge>
      <Badge><Twitter /></Badge>
    </Box>
  );
}
