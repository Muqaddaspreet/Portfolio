import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import styled from "styled-components";
import { Education_data } from "../../Utils/data/strings";
import EducationCard from "Components/Cards/EducationCard";
import { darkTheme } from "Utils/Themes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding-top: 70px;
  padding: 0px 0px 60px 0px;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1250px;
  padding: 0px 0px 0px 0px;
  gap: 12px;
  @media (max-width: 921px) {
    flex-direction: column;
    max-width: 700px;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Description = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const TimelineSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  @media (max-width: 400px) {
    align-items: end;
  }
`;

const StyledDate = styled.div`
  @media (max-width: 530px) {
    display: none;
  }
`;

function Education() {
  return (
    <Container id="education">
      <Wrapper>
        <Title>Education</Title>
        <Description>
          My education has been a journey of self-discovery and growth. My
          educational details are as follows.
        </Description>

        <></>
        <TimelineSection>
          <Timeline>
            {Education_data.map((education, index) => (
              <TimelineItem key={education.date}>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <EducationCard education={education} />
                </TimelineContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  {index !== Education_data.length && (
                    <TimelineConnector style={{ background: "#854CE6" }} />
                  )}
                </TimelineSeparator>
                <StyledDate>
                  <TimelineOppositeContent color={darkTheme.text_primary}>
                    {education.date}
                  </TimelineOppositeContent>
                </StyledDate>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>
      </Wrapper>
    </Container>
  );
}

export default Education;
