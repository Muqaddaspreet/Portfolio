import styled from "styled-components";
import { Skills } from "../../Utils/data/strings";
import { Tilt } from "react-tilt";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding-top: 50px;
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
  margin-top: 5px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 0px;
    font-size: 32px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  gap: 40px;
  justify-content: center;
`;

const Skill = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854ce6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 14px 28px;
  @media (max-width: 768px) {
    max-width: 350px;
    padding: 10px 24px;
  }
  @media (max-width: 500px) {
    max-width: 300px;
    padding: 8px 20px;
  }
`;

const SkillTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
  text-align: center;
`;

const SkillTags = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const SkillTag = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 10px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
  @media (max-width: 500px) {
    font-size: 11px;
    padding: 5px 8px;
  }
  &:hover {
    border: 1px solid #fff;
    color: #fff;
  }
`;

const SkillName = styled.p``;

function skills() {
  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        {/* <Description>{Bio.description}</Description> */}
        <SkillsContainer>
          {Skills.map((skill) => (
            <Tilt options={{ perspective: 5000 }} key={skill.title}>
              <Skill>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillTags>
                  {skill.skills.map((item) => (
                    <SkillTag key={item.name}>
                      {/* <SkillIcon src={item.image} /> */}
                      <SkillName>{item.name}</SkillName>
                    </SkillTag>
                  ))}
                </SkillTags>
              </Skill>
            </Tilt>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
}

export default skills;
