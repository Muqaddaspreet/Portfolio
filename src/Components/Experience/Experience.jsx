import styled from "styled-components";
import { Experiences } from "../../Utils/data/strings";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import ExperienceCard from "Components/Cards/ExperienceCard";
import { darkTheme } from "Utils/Themes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-top: 70px;
  padding-bottom: 50px;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media screen and (max-width: 960px) {
    flex-direction: column;
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
  max-width: 900px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TimeLineSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  @media screen and (max-width: 921px) {
    max-width: calc(100% - 20);
  }
`;

const StyledDate = styled.div`
  @media (max-width: 530px) {
    display: none;
  }
`;

function Experience() {
  console.log(Experiences);
  return (
    <Container id="experience">
      <Wrapper>
        <Title>Experience</Title>
        <Description>Work Experience as a Software Engineer</Description>
        <TimeLineSection>
          <Timeline>
            {Experiences.map((exp, index) => {
              console.log(exp.company);
              return (
                <TimelineItem key={exp.company}>
                  <StyledDate>
                    <TimelineOppositeContent color={darkTheme.text_primary}>
                      {exp.date}
                    </TimelineOppositeContent>
                  </StyledDate>

                  <TimelineSeparator>
                    <TimelineDot variant="outlined" color="secondary" />
                    {index !== Experience.length1 && (
                      <TimelineConnector style={{ background: "#854CE6" }} />
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <ExperienceCard experience={exp} />
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </TimeLineSection>
      </Wrapper>
    </Container>
  );
}

export default Experience;
