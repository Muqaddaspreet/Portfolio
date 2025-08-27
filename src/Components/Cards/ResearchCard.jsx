import styled from "styled-components";

const Document = styled.img`
  display: none;
  height: 70px;
  width: fit-content;
  background-color: #000;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Span = styled.span`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Card = styled.div`
  width: 600px;
  border-radius: 10px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  padding: 12px 16px;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
  @media only screen and (max-width: 921px) {
    padding: 10px;
    gap: 8px;
    width: 500px;
  }
  @media only screen and (max-width: 768px) {
    padding: 10px;
    gap: 8px;
    width: 300px;
  }

  &:hover ${Document} {
    display: flex;
  }

  &:hover ${Span} {
    overflow: visible;
    -webkit-line-clamp: unset;
  }
  border: 0.1px solid #854ce6;
`;

const Top = styled.div`
  width: 90%;
  display: flex;
  gap: 12px;
`;

const Image = styled.img`
  height: 50px;
  background-color: #000;
  border-radius: 10px;
  margin-top: 4px;
  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Institution = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
  @media screen and (min-width: 530px) {
    display: none;
  }
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Skills = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const ReportButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    border-color: #667eea;
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`;

const GitHubButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #24292e 0%, #586069 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #586069 0%, #24292e 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(36, 41, 46, 0.4);
    border-color: #586069;
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`;

function ResearchCard({ research }) {
  return (
    <Card>
      <Top>
        <Image src={research.img} />
        <Body>
          <Title>{research.title}</Title>
          <Institution>{research.institution}</Institution>
          <Date>{research.date}</Date>
        </Body>
      </Top>
      <Description>
        <b>Description: </b>
        {research.desc}
      </Description>
      <Skills>
        <b>Skills: </b>
        {research.skills.join(", ")}
      </Skills>
      <ButtonContainer>
        <ReportButton
          href={research.links.report}
          target="_blank"
          rel="noopener noreferrer"
        >
          📄 Research Paper
        </ReportButton>
        <GitHubButton
          href={research.links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          🐙 GitHub Repository
        </GitHubButton>
      </ButtonContainer>
    </Card>
  );
}

export default ResearchCard;
