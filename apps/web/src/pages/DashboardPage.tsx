import { Typography, Box, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" mb={3}>
        GeoCetak Dashboard
      </Typography>
      
      <Stack spacing={2} direction="row" mb={3}>
        <Button variant="contained" component={Link} to="/3d-test">
          Test 3D Rendering
        </Button>
        <Button variant="outlined" disabled>
          Modules (Coming Soon)
        </Button>
      </Stack>
      
      <Typography variant="body1">
        Welcome to GeoCetak! Interactive 3D geometry learning platform.
      </Typography>
    </Box>
  );
}