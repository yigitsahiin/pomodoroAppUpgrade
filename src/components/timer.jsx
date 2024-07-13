import { Button, Stack, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useGlobalStateContext } from "../store/globalState/context";
import { styled } from '@mui/system';

const OuterCircularProgress = styled(CircularProgress)({
  position: 'absolute',
  color: '#ff7f00',
});

const InnerCircularProgress = styled(CircularProgress)({
  position: 'absolute',
  color: '#ffcc80',
});

export const Timer = ({ selectedTime = "25:00" }) => {
  const { state, dispatch } = useGlobalStateContext();
  const [remainingTime, setRemainingTime] = useState(selectedTime);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setRemainingTime(selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setTimeout(() => {
        let [minutes, seconds] = remainingTime.split(":").map(Number);
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        }
        setRemainingTime(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [remainingTime, isPaused]);

  const handlePauseResume = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  const totalTime = selectedTime.split(":").reduce((acc, time) => (60 * acc) + +time);
  const remainingTimeInSeconds = remainingTime.split(":").reduce((acc, time) => (60 * acc) + +time);
  const progress = (remainingTimeInSeconds / totalTime) * 100;

  return (
    <Stack
      sx={{
        position: 'relative',
        width: "410px",
        height: "410px",
        borderRadius: "50%",
        boxShadow: "50px 50px 100px 0px #ff7f00",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <OuterCircularProgress variant="determinate" value={100} size={410} thickness={2} />
      <InnerCircularProgress variant="determinate" value={progress} size={410} thickness={2} />
      <Stack
        sx={{
          width: "366px",
          height: "366px",
          borderRadius: "50%",
          backgroundColor: "#161932",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" component="h2">
          {remainingTime}
        </Typography>
        <Button
          variant="text"
          sx={{ color: "white", fontSize: "18px" }}
          onClick={handlePauseResume}
        >
          {isPaused ? "RESUME" : "PAUSE"}
        </Button>
      </Stack>
    </Stack>
  );
};
