// src/components/Destinations.jsx
import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import international from "./destinationsData";
import "./International.css";

const International = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" align="center" padding="20px">
        Popular International Destinations
      </Typography>
      <div>
        <Grid className="gridCard" container spacing={4}>
          {international.map((dest) => (
            <Grid item xs={12} sm={6} md={4} key={dest.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  width: 300,
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/international/${dest.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={dest.image}
                    alt={dest.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{dest.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ⏰ {dest.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default International;
