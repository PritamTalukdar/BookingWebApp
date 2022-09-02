import * as React from "react";
import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
import { marks, bookingsJSON } from "./constant";
import { IOSSlider } from "./IOSSlider";
import "./styles.css";
import { Button, TextField, Typography } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 1;

export default function MinimumDistanceSlider() {
  const [value, setValue] = React.useState([22, 23]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 24 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <>
      <Typography variant="header">WESPORT GUWAHATI BOOKINGS APP</Typography>
      <Box sx={{ width: "100%", mt: 6, p: 2, border: 2 }}>
        <IOSSlider
          getAriaLabel={() => "Minimum distance shift"}
          size="big"
          value={value}
          onChange={handleChange}
          valueLabelDisplay="on"
          getAriaValueText={valuetext}
          step={1}
          marks={marks}
          min={6}
          max={24}
          disableSwap
        />

        <Box sx={{ height: "40px" }}>
          {bookingsJSON.map((val, key) => {
            return (
              <div
                key={key}
                style={{
                  backgroundColor: "red",
                  marginLeft: `${(val.startTime - 6) * 5.55555}%`,
                  width: "5.55%",
                  height: "2em",
                  textAlign: "center",
                  position: "absolute"
                }}
              >
                BOOKED
              </div>
            );
          })}
        </Box>
      </Box>

      {/* Submit form */}
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "25ch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "Center",
            alignItems: "center"
          }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField label="Name" variant="outlined" />
        <TextField label="Booking ID" variant="outlined" />
        <TextField label="Payment Mode" variant="outlined" />
        <Button variant="contained">BOOK NOW</Button>
      </Box>

      <Box sx={{ m: "6em" }}>
        <table>
          <tr>
            <th>Booking ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Amount</th>
          </tr>
          {bookingsJSON.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.bookingId}</td>
                <td>{val.name}</td>
                <td>{val.date}</td>
                <td>{val.startTime}</td>
                <td>{val.endTime}</td>
                <td>{val.amount}</td>
              </tr>
            );
          })}
        </table>
      </Box>
    </>
  );
}
