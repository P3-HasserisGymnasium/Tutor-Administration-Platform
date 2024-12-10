import { Box, Typography, Slider } from "@mui/material";
import { useFormContext } from "react-hook-form";
import React from "react";

type SetDurationProps = {
  startDuration: number[] | undefined | null;
};

export default function SetDuration({ startDuration }: SetDurationProps) {
  const [sliderValue, setSliderValue] = React.useState<number[]>(startDuration ? startDuration : [0, 12]);
  const { setValue } = useFormContext();

  const min = 0;
  const max = 12;
  return (
    <Box>
      <Typography variant="h3">Expected duration</Typography>
      <Box sx={{ padding: "0.8em", paddingBottom: "0em" }}>
        <Slider
          value={sliderValue}
          onChange={(_, value) => setSliderValue(value as number[])}
          onChangeCommitted={(_, value) => {
            setValue("duration", value as number[]);
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => (value == 1 ? `${value} month` : `${value} months`)}
          min={min}
          max={max}
          step={1}
          marks={[
            { value: min, label: min },
            { value: max, label: max },
          ]}
          sx={{
            "& .MuiSlider-mark": {
              display: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
}
