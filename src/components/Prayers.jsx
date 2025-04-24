// Importing necessary libraries and components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Prayers({ name, time, image }) {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={image} title={name} />

      <CardContent>
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          style={{ fontWeight: "700", color: "#444", fontSize: "2.75rem" }}
        >
          {name}
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: "text.secondary" }}
          style={{ fontWeight: "500" }}
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
