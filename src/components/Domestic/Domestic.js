import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  // Added TextField for the search input
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Box,
  Button,
  Pagination,
  TextField, // <--- New Import for Search Bar
  InputAdornment, // <--- New Import for Search Icon
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search"; // <--- New Import for Search Icon
import domBanner from "./DomImages/domBanner.png";

// Assuming this path to your data file
import domestic from "./domesticData";
import "./Domestic.css";

// Assuming a default WhatsApp number
const WHATSAPP_NUMBER = "919876543210";
const ITEMS_PER_PAGE = 10; // Set to 10 cards per page

// --- Dummy Data Structure for Fallback (Simplified for clarity) ---
const dummyDest = {
  overview: [
    "Explore the historical and modern wonders of the destination.",
    "A perfectly balanced trip combining city tours and relaxation.",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival and Orientation",
      details: ["Meet and greet.", "Transfer to hotel."],
    },
    {
      day: 2,
      title: "Historical Landmarks Tour",
      details: ["Full-day tour.", "Visit local market."],
    },
  ],
  inclusions: [
    "4 nights stay in a 4-star hotel",
    "Daily buffet breakfast and dinner",
  ],
  exclusions: [
    "International and domestic airfare",
    "Visa fees and processing charges",
  ],
};

// -------------------------------------------------------------------
// UPDATED: HeroBanner Component
// -------------------------------------------------------------------

const HeroBanner = () => {
  // Using a vibrant image placeholder of popular domestic landmarks for a travel theme

  return (
    <div className="hero-banner-container">
      <img
        src={domBanner}
        alt="International Destinations Banner - World Landmarks"
        className="hero-banner-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/1920x450/004a80/ffffff?text=Discover+Your+Next+Adventure";
        }}
      />
      <div className="hero-content-overlay">
        <h1 className="hero-title">Domestic Destinations</h1>
        <p className="hero-subtitle">
          Explore curated domestic packages and find your dream vacation.
        </p>
      </div>
    </div>
  );
};

// -------------------------------------------------------------------
// 1. DestinationDetailView Component (Full-Page Detail)
// -------------------------------------------------------------------

const DestinationDetailView = ({ dest, setSelectedDestination }) => {
  if (!dest) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 5 }}>
        Destination not found
      </Typography>
    );
  }

  const currentDest = {
    ...dest,
    // Use dummy data as fallback/if missing
    ...dummyDest,
    overview: dest.overview ? [dest.overview] : dummyDest.overview,
    itinerary: dest.itinerary || dummyDest.itinerary,
  };

  // State for Accordions (Itinerary)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [expandedDays, setExpandedDays] = useState({});

  const handleDayAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedDays((prevState) => ({
      ...prevState,
      [panel]: isExpanded,
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = currentDest.itinerary.reduce((acc, dayPlan) => {
      acc[`day-${dayPlan.day}`] = true;
      return acc;
    }, {});
    setExpandedDays(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedDays({});
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=I%20am%20interested%20in%20the%20${encodeURIComponent(
    currentDest.title
  )}%20package%20(${encodeURIComponent(
    currentDest.duration
  )}).%20Please%20send%20me%20booking%20details.`;

  // 1. Overview Accordion Component
  const overviewAccordion = (
    <Accordion
      defaultExpanded
      className="detail-itinerary-accordion detail-overview-accordion"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" className="accordion-main-title">
          Overview
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {currentDest.overview?.length > 0 ? (
          <ul className="detail-info-list">
            {currentDest.overview.map((item, index) => (
              <li key={`ov-${index}`}>{item}</li>
            ))}
          </ul>
        ) : (
          <Typography>Overview details are not available yet.</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );

  // 2. Inclusions Accordion Component
  const inclusionsAccordion = (
    <Accordion
      defaultExpanded
      className="detail-itinerary-accordion detail-inclusions-accordion"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" className="accordion-main-title">
          Inclusions
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {currentDest.inclusions?.length > 0 ? (
          <ul className="inclusion-custom-list">
            {currentDest.inclusions.map((item, index) => (
              <li key={`inc-${index}`}>{item}</li>
            ))}
          </ul>
        ) : (
          <Typography>Inclusions list is not available yet.</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );

  // 3. Exclusions Accordion Component
  const exclusionsAccordion = (
    <Accordion
      defaultExpanded
      className="detail-itinerary-accordion detail-exclusions-accordion"
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" className="accordion-main-title">
          Exclusions
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {currentDest.exclusions?.length > 0 ? (
          <ul className="exclusion-custom-list">
            {currentDest.exclusions.map((item, index) => (
              <li key={`exc-${index}`}>{item}</li>
            ))}
          </ul>
        ) : (
          <Typography>Exclusions list is not available yet.</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <div className="destination-detail-page">
      {/* Detail Header Bar */}
      <div className="detail-navigation-header">
        <button
          className="back-to-list-button"
          onClick={() => setSelectedDestination(null)} // Go back to the list
        >
          &larr; Back to Destinations
        </button>
      </div>

      {/* Main Content Area */}
      <div className="detail-main-content">
        {/* LEFT COLUMN */}
        <div className="detail-primary-column">
          {/* Image */}
          <div className="detail-image-wrapper">
            <img
              src={currentDest.image}
              alt={currentDest.title}
              className="detail-hero-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/800x500/cccccc/333333?text=Destination+Image+Unavailable";
              }}
            />
          </div>

          {/* Title and Duration Tag moved here, just below the image */}
          <div className="title-and-duration-info">
            <h2>{currentDest.title}</h2>
            <span className="duration-label">
              <CalendarMonthIcon className="duration-icon" />
              {currentDest.duration || "Duration N/A"}
            </span>
          </div>

          {/* Overview for Mobile/Tablet */}
          <Box className="overview-mobile-container">{overviewAccordion}</Box>

          {/* Detailed Itinerary Accordion */}
          <Accordion defaultExpanded className="detail-itinerary-accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" className="accordion-main-title">
                Detailed Itinerary
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Expand/Collapse buttons for Detailed Itinerary */}
              <Box className="itinerary-action-controls">
                <Button
                  onClick={handleExpandAll}
                  variant="outlined"
                  size="small"
                  className="itinerary-toggle-button"
                >
                  Expand All
                </Button>
                <Button
                  onClick={handleCollapseAll}
                  variant="outlined"
                  size="small"
                  className="itinerary-toggle-button"
                >
                  Collapse All
                </Button>
              </Box>

              {currentDest.itinerary?.length > 0 ? (
                // Itinerary uses nested accordions
                currentDest.itinerary.map((dayPlan, index) => (
                  <Accordion
                    key={index}
                    disableGutters
                    className="day-plan-accordion"
                    expanded={expandedDays[`day-${dayPlan.day}`] || false}
                    onChange={handleDayAccordionChange(`day-${dayPlan.day}`)}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" component="div">
                        <span className="day-title-emphasis">
                          Day {dayPlan.day}:
                        </span>{" "}
                        {dayPlan.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Day Details content in ul li format */}
                      <ul className="day-detail-list">
                        {Array.isArray(dayPlan.details) ? (
                          dayPlan.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))
                        ) : (
                          <li>{dayPlan.details}</li>
                        )}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Typography>
                  Itinerary details are not available yet.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Inclusions Accordion */}
          {inclusionsAccordion}

          {/* Exclusions Accordion */}
          {exclusionsAccordion}
        </div>

        {/* RIGHT COLUMN */}
        <Box className="detail-secondary-column">
          {/* Overview for Desktop */}
          <Box className="overview-desktop-container">{overviewAccordion}</Box>

          {/* Booking/Contact Section */}
          <Box className="contact-action-box">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-contact-button"
            >
              <WhatsAppIcon />
              Contact us for Booking
            </a>
          </Box>
        </Box>
      </div>
    </div>
  );
};

// -------------------------------------------------------------------
// 2. Main International Component (List View & Logic)
// -------------------------------------------------------------------

const International = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // <--- New State for Search

  // 1. Destination data (No filtering)
  const allDestinations = domestic;

  // 2. Filtering Logic (Uses useMemo for performance)
  const filteredDestinations = useMemo(() => {
    if (!searchTerm) {
      return allDestinations;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    return allDestinations.filter(
      (dest) =>
        dest.title.toLowerCase().includes(lowerCaseSearch) ||
        dest.duration.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm, allDestinations]); // Dependencies: recalculate only when search term or data changes

  // Reset page to 1 whenever the search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // 3. Pagination Calculations
  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDestinations = filteredDestinations.slice(startIndex, endIndex);

  // 4. Event Handlers
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to the top of the destination list area when changing pages
    const container = document.getElementById("destination-list-top-anchor");
    if (container) {
      requestAnimationFrame(() => {
        container.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (selectedDestination) {
    return (
      <DestinationDetailView
        dest={selectedDestination}
        setSelectedDestination={setSelectedDestination}
      />
    );
  }

  // Otherwise, render the main list view
  return (
    <>
      {/* NEW: Hero Banner at the top of the page */}
      <HeroBanner />

      <Container className="domestic-list-container">
        {/* Centering the heading */}

        {/* Search Bar - Professional Look */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <TextField
            label="Search Destination"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth={false} // Allow it to be centered and not full width
            sx={{ maxWidth: "600px", width: "100%" }} // Adjust width for professional look
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* End Search Bar */}

        {/* Container for the List and Pagination Top (used for scrolling) */}
        <div id="destination-list-top-anchor">
          {/* Card Grid */}
          <Grid
            className="destination-card-grid"
            container
            spacing={4}
            justifyContent="center"
          >
            {currentDestinations.length > 0 ? (
              currentDestinations.map((dest) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  // lg={3} // Adjusted for 4 columns on large screens
                  key={dest.id}
                  className="destination-card-item"
                >
                  <Card className="destination-summary-card">
                    {/* On click, set the destination to state to render the detail view (full page) */}
                    <CardActionArea
                      onClick={() => setSelectedDestination(dest)}
                      className="card-click-area"
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={dest.image}
                        alt={dest.title}
                      />
                      <CardContent className="card-info-content">
                        <Typography variant="h6">{dest.title}</Typography>
                        <div className="card-icon">
                          <CalendarMonthIcon className="duration-icon-list" />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="duration"
                          >
                            {dest.duration || "Details available on click"}
                          </Typography>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  align="center"
                  className="empty-results-message"
                >
                  No destinations available.{" "}
                  {searchTerm && `for "${searchTerm}"`}
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>

        {/* Pagination Component */}
        {totalPages > 1 && (
          <Box className="pagination-controls-container list-pagination-bottom">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              className="styled-pagination"
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default International;
