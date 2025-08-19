import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styled from "styled-components";

const GitHubButton = styled.a`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.8s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

const DescriptionButton = styled.a`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.8s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

const Card = styled.div`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 2px 8px;
  border-radius: 10px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const BackCard = styled.div`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  transition: all ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const FullDescription = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  margin-top: 8px;
  display: -webkit-box;
  text-align: justify;
  max-width: 100%;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 15px;
  aspect-ratio: 1/1;
  cursor: pointer;
  &:after {
    content: "X";
    color: #fff;
    font-size: 20px;
  }
`;

const ProjectCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard() {
    setIsFlipped(() => !isFlipped);
  }

  function handleFlip(e) {
    if (window.innerWidth <= 921) {
      if (e.type === "click") {
        flipCard();
      }
    } else {
      if (e.type === "mouseenter") {
        flipCard();
      }
    }
  }

  return (
    <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
      <Card>
        <Image src={project.image} />
        <Tags>
          {project.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
        <Details>
          <Title>{project.title}</Title>
          <Description>{project.shortDesc}</Description>
        </Details>
        <ButtonGroup>
          <DescriptionButton onMouseEnter={handleFlip} onClick={handleFlip}>
            Description
          </DescriptionButton>
        </ButtonGroup>
      </Card>
      <BackCard>
        <CloseButton onClick={() => flipCard()} />
        <FullDescription>{project.description}</FullDescription>
        {project.github && (
          <GitHubButton href={project.github} target="_blank">
            GitHub
          </GitHubButton>
        )}
      </BackCard>
    </ReactCardFlip>
  );
};

export default ProjectCard;
