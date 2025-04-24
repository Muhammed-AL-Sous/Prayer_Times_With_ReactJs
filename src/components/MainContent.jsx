// Material UI Imports
import {
  Container,
  Grid,
  Divider,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

// React Imports
import { useEffect, useState } from "react";

// Component Imports
import Prayers from "./Prayers.jsx";

// Image Imports
import pic_01 from "../assets/pic_01.jpg";
import pic_02 from "../assets/pic_02.jpg";
import pic_03 from "../assets/pic_03.jpg";
import pic_04 from "../assets/pic_04.jpg";
import pic_05 from "../assets/pic_05.jpg";

// External Libraries
import axios from "axios";
import moment from "moment";

export default function MainContent() {
  const [nexPrayerIndex, setNextPrayerIndex] = useState(0);
  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });

  const [remainingTimeStr, setRemainingTimeStr] = useState("00:00:00");

  const cities = [
    { displayName: "مكة المكرمة", apiName: "Makkah al Mukarramah" },
    { displayName: "الرياض", apiName: "Ar Riyāḑ" },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const [selectedCity, setSelectedCity] = useState("Ar Riyāḑ");
  const [today, setToday] = useState("");

  const getTimings = async (cityApiName) => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${cityApiName}&country=SA`
      );
      setTimings(response.data.data.timings);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب البيانات:", error);
    }
  };

  useEffect(() => {
    getTimings(selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = moment();
      setToday(t.format("YYYY-MM-DD | ss : mm : HH"));
      setupCountDownTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [timings]);

  function setupCountDownTimer() {
    const momentNow = moment();

    function getPrayerMoment(time) {
      return moment(
        `${momentNow.format("YYYY-MM-DD")} ${time}`,
        "YYYY-MM-DD HH:mm"
      );
    }

    const prayerTimes = [
      getPrayerMoment(timings.Fajr),
      getPrayerMoment(timings.Dhuhr),
      getPrayerMoment(timings.Asr),
      getPrayerMoment(timings.Maghrib),
      getPrayerMoment(timings.Isha),
    ];

    let prayerIndex = prayerTimes.findIndex((time) => momentNow.isBefore(time));
    if (prayerIndex === -1) prayerIndex = 0;

    setNextPrayerIndex(prayerIndex);

    let nextPrayerTimeMoment = prayerTimes[prayerIndex];
    if (nextPrayerTimeMoment.isSameOrBefore(momentNow)) {
      nextPrayerTimeMoment.add(1, "day");
    }

    const diff = nextPrayerTimeMoment.diff(momentNow);
    const duration = moment.duration(diff);

    const hours = String(duration.hours()).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");

    setRemainingTimeStr(`${seconds} : ${minutes} :  ${hours}`);
  }

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const displayCityName = cities.find(
    (c) => c.apiName === selectedCity
  )?.displayName;

  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid size={6}>
          <div>
            <h3 style={{ marginBottom: "10px", fontSize: "25px" }}>{today}</h3>
            <h4 style={{ fontSize: "45px" }}>{displayCityName}</h4>
          </div>
        </Grid>
        <Grid size={6}>
          <div>
            <h3 style={{ marginBottom: "10px", fontSize: "25px" }}>
              متبقي حتى صلاة {prayersArray[nexPrayerIndex].displayName}
            </h3>
            <h4 style={{ fontSize: "35px" }}>{remainingTimeStr}</h4>
          </div>
        </Grid>
      </Grid>

      <Divider
        variant="middle"
        sx={{ borderColor: "#888", my: 3, opacity: 0.1 }}
      />

      <Grid container spacing={2} justifyContent={"center"}>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2.25 }}>
          <Prayers name="الفجر" time={timings.Fajr} image={pic_01} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2.25 }}>
          <Prayers name="الظهر" time={timings.Dhuhr} image={pic_02} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2.25 }}>
          <Prayers name="العصر" time={timings.Asr} image={pic_03} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2.25 }}>
          <Prayers name="المغرب" time={timings.Maghrib} image={pic_04} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2.25 }}>
          <Prayers name="العشاء" time={timings.Isha} image={pic_05} />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="center">
        <FormControl
          style={{ width: "20%" }}
          size="small"
          sx={{
            m: 3,
            width: 250,
            direction: "rtl",
            textAlign: "right",
            "& .MuiSelect-icon": {
              left: 10,
              right: "unset",
            },
            "& .MuiInputLabel-root": {
              right: 14,
              left: "unset",
            },
            "& legend": {
              textAlign: "right",
            },
          }}
        >
          <InputLabel
            id="city-select-label"
            style={{ color: "white", paddingRight: "10px" }}
          >
            المدينة
          </InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity}
            onChange={handleCityChange}
            label="المدينة"
            sx={{
              color: "white",
              backgroundColor: "transparent",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightblue",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              ".MuiSvgIcon-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                legend: {
                  width: "55px !important",
                },
              },
            }}
          >
            {cities.map((city) => (
              <MenuItem key={city.apiName} value={city.apiName}>
                {city.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Container>
  );
}
