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
import { Research_data } from "../../Utils/data/strings";
import ResearchCard from "Components/Cards/ResearchCard";
import { darkTheme } from "Utils/Themes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 60px;
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

function Research() {
  return (
    <Container id="research">
      <Wrapper>
        <Title>Research</Title>
        <Description>
          Research is the foundation of innovation. It's where ideas are born,
          tested, and refined. I'm passionate about exploring new possibilities,
          pushing boundaries, and uncovering the unknown.
        </Description>

        <></>
        <TimelineSection>
          <Timeline>
            {Research_data.map((research, index) => (
              <TimelineItem key={research.id}>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <ResearchCard research={research} />
                </TimelineContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  {index !== Research_data.length - 1 && (
                    <TimelineConnector style={{ background: "#854CE6" }} />
                  )}
                </TimelineSeparator>
                <StyledDate>
                  <TimelineOppositeContent color={darkTheme.text_primary}>
                    {research.date}
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

export default Research;
