import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import FlexBetween from "../reusable/FlexBetween";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

enum Section {
  Contacts = "con",
  Categories = "cat",
  Schedule = "sch",
}

const Footer = () => {
  const isMobile = useMediaQuery("(max-width:700px)");

  const [section, setSection] = useState<Section | undefined>(undefined);

  const handleSectionChange = (s: Section) => {
    if (s === section) {
      setSection(undefined);
      return;
    }
    setSection(s);
  };

  return (
    <Box bgcolor="#0f0f0f" padding="2rem 2rem 6rem 2rem" mt="4rem">
      <Box
        display={isMobile ? "block" : "flex"}
        justifyContent="left"
        flexWrap={"wrap-reverse"}
        gap="2rem"
        sx={{
          "& .MuiTypography-root": {
            fontSize: "1rem",
          },
          "& .MuiSvgIcon-root": {
            color: "secondary.light",
          },
        }}
      >
        <Box flexBasis={isMobile ? undefined : "25%"}>
          <FlexBetween width="100%">
            <Typography fontWeight="700" color="secondary.light">
              Our Contacts
            </Typography>
            {isMobile && (
              <IconButton onClick={() => handleSectionChange(Section.Contacts)}>
                {section === Section.Contacts ? (
                  <KeyboardArrowUpOutlined />
                ) : (
                  <KeyboardArrowDownOutlined />
                )}
              </IconButton>
            )}
          </FlexBetween>
          {(!isMobile || (isMobile && section === Section.Contacts)) && (
            <Box>
              <Typography color="secondary.dark" maxWidth="250px">
                Ukraine, Khmelnitsky, Khmelnitskaya obl., Proskurivska str., 58,
                Index: 29000
              </Typography>
              <Typography color="secondary.dark">
                +380 (68) 077-66-88
              </Typography>
              <Typography color="secondary.dark">
                +380 (63) 077-66-88
              </Typography>
              <Typography color="secondary.dark">
                +380 (96) 074-00-50
              </Typography>
              <Typography color="secondary.dark">
                ortomed-variteks@ukr.net
              </Typography>
              {/* <Typography color="secondary.dark">Our Prom</Typography> */}
            </Box>
          )}
        </Box>
        <Box flexBasis={isMobile ? undefined : "48%"}>
          <FlexBetween>
            <Typography fontWeight="700" color="secondary.light">
              Categories
            </Typography>
            {isMobile && (
              <IconButton
                onClick={() => handleSectionChange(Section.Categories)}
              >
                {section === Section.Categories ? (
                  <KeyboardArrowUpOutlined />
                ) : (
                  <KeyboardArrowDownOutlined />
                )}
              </IconButton>
            )}
          </FlexBetween>
          {(!isMobile || (isMobile && section === Section.Categories)) && (
            <Box>
              <Typography color="secondary.dark">Abdominal Corsets</Typography>
              <Typography color="secondary.dark">
                Ankle and Foot Bandages
              </Typography>
              <Typography color="secondary.dark">
                Bandages for Shoulder and Elbow Joints
              </Typography>
              <Typography color="secondary.dark">
                Arm Bandages and Splints
              </Typography>
              <Typography color="secondary.dark">
                Children's Orthopedic Products
              </Typography>
              <Typography color="secondary.dark">
                Elastic Bandages and Other Products
              </Typography>
              <Typography color="secondary.dark">
                Nexus Adjustable Compression Products
              </Typography>
            </Box>
          )}
        </Box>
        <Box flexBasis={isMobile ? undefined : "20%"}>
          <FlexBetween>
            <Typography fontWeight="700" color="secondary.light">
              Schedule
            </Typography>
            {isMobile && (
              <IconButton onClick={() => handleSectionChange(Section.Schedule)}>
                {section === Section.Schedule ? (
                  <KeyboardArrowUpOutlined />
                ) : (
                  <KeyboardArrowDownOutlined />
                )}
              </IconButton>
            )}
          </FlexBetween>
          {(!isMobile || (isMobile && section === Section.Schedule)) && (
            <Box>
              <Typography color="secondary.dark">
                Monday 09:00 – 19:00
              </Typography>
              <Typography color="secondary.dark">
                Tuesday 09:00 – 19:00
              </Typography>
              <Typography color="secondary.dark">
                Wednesday 09:00 – 19:00
              </Typography>
              <Typography color="secondary.dark">
                Thursday 09:00 – 19:00
              </Typography>
              <Typography color="secondary.dark">
                Friday 09:00 – 19:00
              </Typography>
              <Typography color="secondary.dark">
                Saturday 11:00 – 15:00
              </Typography>
              <Typography color="secondary.dark">
                Sunday is a Day Off
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Footer;
