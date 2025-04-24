import "./App.css";
import MainContent from "./components/MainContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Tajawal"],
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainContent />
      </div>
    </ThemeProvider>
  );
}
