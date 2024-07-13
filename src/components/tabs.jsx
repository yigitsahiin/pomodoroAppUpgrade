import { Tab, Tabs, Box, Stack } from '@mui/material';
import { useState } from 'react';
import { Timer } from './timer';
import { useGlobalStateContext } from '../store/globalState/context';

export const CustomTabs = () => {
  const { state } = useGlobalStateContext();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const getTime = () => {
    switch (value) {
      case 0:
        return state.time.pomodoro || "25:00";
      case 1:
        return state.time.shortBreak || "05:00";
      case 2:
        return state.time.longBreak || "15:00";
      default:
        return "25:00";
    }
  };

  return (
    <Stack alignItems="center" spacing={3}>
      <Tabs value={value} onChange={handleChange} aria-label="Pomodoro tabs">
        {["Pomodoro", "Short Break", "Long Break"].map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
      {/* Timer bileşeni sadece burada kullanılıyor */}
      <Timer selectedTime={getTime()} />
    </Stack>
  );
};
