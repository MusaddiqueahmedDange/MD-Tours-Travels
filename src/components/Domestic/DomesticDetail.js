import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import domestic from "../Domestic/domesticData";
import "./Domestic.css";

import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const domesticDest = domestic.find((d) => d.id === parseInt(id));

  // enquiry form state
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  if (!domesticDest) {
    return (
      <Typography variant="h5" align="center">
        Destination not found
      </Typography>
    );
  }

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Enquiry submitted:", formData);
  //   alert("Your enquiry has been sent!");
  //   setFormData({ name: "", email: "", message: "" }); // reset form
  // };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={domesticDest.image}
          alt={domesticDest.title}
        />
        <CardContent>
          <Typography variant="h2" gutterBottom>
            {domesticDest.title}
          </Typography>
          <Typography variant="h5" paragraph>
            {domesticDest.about}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {domesticDest.details}
          </Typography>
          <Typography variant="h5" paragraph>
            {domesticDest.Itinerary}
          </Typography>

          {/* Accordions */}
          {domesticDest.sections && (
            <>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Day 01 : {domesticDest.sections.day1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <ul>
                      {domesticDest.sections.day1summ.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          )}
          {domesticDest.sections.day2 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Day 02 : {domesticDest.sections.day2}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul>
                    {domesticDest.sections.day2summ.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {domesticDest.sections.day3 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Day 03 : {domesticDest.sections.day3}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul>
                    {domesticDest.sections.day3summ.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {domesticDest.sections.day4 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Day 04 : {domesticDest.sections.day4}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul>
                    {domesticDest.sections.day4summ.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {domesticDest.sections.day5 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Day 05 : {domesticDest.sections.day5}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul>
                    {domesticDest.sections.day5summ.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {domesticDest.sections.day6 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Day 06 : {domesticDest.sections.day6}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul>
                    {domesticDest.sections.day6summ.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
          {domesticDest.sections.day7 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Day 07 : {domesticDest.sections.day7}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul>
                    {domesticDest.sections.day7summ.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
          {domesticDest.sections.day8 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Day 08 : {domesticDest.sections.day8}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul>
                    {domesticDest.sections.day8summ.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {domesticDest.sections.day3 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>INCLUSIONS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul style={{ listStyle: "none" }}>
                    {domesticDest.sections.inclusions.map((item, index) => (
                      <li key={index}>
                        <span
                          className="right-symbol"
                          style={{
                            color: "green",
                            fontSize: "18px",
                            marginRight: "10px",
                          }}
                        >
                          &#10004;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {domesticDest.sections.day3 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>EXCLUSIONS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul style={{ listStyle: "none" }}>
                    {domesticDest.sections.exclusions.map((item, index) => (
                      <li key={index}>
                        <span
                          className="wrong-symbol"
                          style={{
                            color: "red",
                            fontSize: "18px",
                            marginRight: "10px",
                          }}
                        >
                          &#10006;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {/* {domesticDest.sections.day3 && ( )}

          {domesticDest.sections.day3 && ( )}

          {domesticDest.sections.day3 && ( )}

          {domesticDest.sections.day3 && ( )} */}

          <div className="button1">
            <Button
              style={{
                backgroundImage: "linear-gradient(to right, #183048, #356da5)",
              }}
              variant="contained"
              onClick={() => navigate("/domestic")}
            >
              Back to Destinations
            </Button>

            <Button
              style={{
                backgroundImage: "linear-gradient(to right, #183048, #356da5)",
              }}
              variant="contained"
              onClick={() => navigate("/contact")}
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enquiry Form at the bottom */}
      {/* <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 2,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Enquiry Form
        </Typography>

        <TextField
          fullWidth
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Your Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Send Enquiry
        </Button>
      </Box> */}
    </Container>
  );
};

export default DestinationDetail;
