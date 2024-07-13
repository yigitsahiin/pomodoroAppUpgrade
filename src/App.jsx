import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomModal } from './components/customModal';
import { CustomTabs } from './components/tabs';
import { useGlobalStateContext } from './store/globalState/context';

function App() {
  const [open, setOpen] = useState(false);
  const { state } = useGlobalStateContext();
  
  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <Stack
          sx={{
            height: "100%",
            display: 'flex',
            justifyContent: "space-around",
            alignItems: 'center'
          }} 
          gap="1rem"
        >
          <Typography variant='h6' component="h2">Pomodoro Timer</Typography>
          <CustomTabs />
          {/* Timer bileşeni burada kaldırıldı */}
          <IconButton 
            aria-label='settings' 
            size='small' 
            color={state.colorMode}
            onClick={() => setOpen(!open)}
          >
            <SettingsIcon />
          </IconButton>
        </Stack>

        <CustomModal open={open} setOpen={setOpen} />
      </Box>
    </Container>
  );
}

export default App;
