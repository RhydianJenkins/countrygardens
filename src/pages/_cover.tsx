import { Box } from '@mui/material';

function Info() {
  return (
    <Box sx={{
      backgroundColor: 'secondary.main',
      width: '512px',
      minHeight: '100px',
      position: 'relative',
      padding: '16px',
      textAlign: 'center',
    }}>
      <h1>Country Gardens</h1>
      <h2>Local Greengrocer</h2>
    </Box>
  );
}
export default function Cover() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '100vw',
      minHeight: '1024px',
      maxHeight: '80vh',
      spacing: 0,
      justify: 'space-around',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '-32px',
    }}>
      <Info />
    </Box>
  );
}
