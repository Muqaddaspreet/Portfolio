import { Link } from "react-router-dom";
import styled from "styled-components";
import { HiBars3, HiOutlineCodeBracket, HiXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Connect from "../Connect/Connect";

const StyledNav = styled.div`
  background-color: ${({ theme }) => theme.card_light};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960xp) {
    transition: 0.8s all ease;
  }
`;

const StylednavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`;

const StyledLogo = styled(Link)`
  width: 80%;
  pad: 0 6px;
  display: flex;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  align-items: center;

  @media screen and (max-width: 640px) {
    padding: 0 0;
  }
`;

const StyledMobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 50%);
    font-size: 1.8rem;
    z-index: 999;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
  }
`;

const StyledNavMenu = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  list-style: none;
  text-align: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledNavItem = styled.a`
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 80%;
  height: 100%;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledConnect = styled.button`
  border: 1px solid ${({ theme }) => theme.primary};
  color: white;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  font-size: 1rem;
  font-weight: 500;
  height: 70%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const StyledSpan = styled.span`
  padding: 0 4px;
  font-weight: bold;
  font-size: 18px;
`;

const StyledMobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  padding: 42px 40px 24px 40px;
  background-color: ${({ theme }) => theme.card_light};
  transition: all 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  opacity: ${({ open }) => (open ? "1" : "0")};
  z-index: ${({ open }) => (open ? "1" : "-1")};
`;

const StyledMobileMenuItemA = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const StyledMobileMenuItemButton = styled.button`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth > 785) {
        setIsOpen(false); // Close the mobile menu when screen width increases beyond 768px
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  function handleConnectClick() {
    setIsConnectOpen(true);
  }

  return (
    <>
      <StyledNav>
        <StylednavContainer>
          <StyledLogo to="/">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "white",
                marginBottom: "20",
                cursor: "pointer",
              }}
            >
              <HiOutlineCodeBracket size="2rem" />
              <StyledSpan>{` Muqaddaspreet Singh Bhatia`}</StyledSpan>
            </div>
          </StyledLogo>
          <StyledMobileIcon>
            {isOpen ? (
              <HiXMark onClick={() => setIsOpen(false)}></HiXMark>
            ) : (
              <HiBars3 onClick={() => setIsOpen(true)} />
            )}
          </StyledMobileIcon>
          <StyledNavMenu>
            <StyledNavItem href="#about">About</StyledNavItem>
            <StyledNavItem href="#education">Education</StyledNavItem>
            <StyledNavItem href="#experience">Experience</StyledNavItem>
            <StyledNavItem href="#research">Research</StyledNavItem>
            <StyledNavItem href="#projects">Projects</StyledNavItem>
            <StyledNavItem href="#contact">Contact</StyledNavItem>
          </StyledNavMenu>

          <StyledButton>
            <StyledConnect onClick={handleConnectClick}>Connect</StyledConnect>
          </StyledButton>
        </StylednavContainer>

        {isOpen && (
          <StyledMobileMenu open={isOpen}>
            <StyledMobileMenuItemA
              href="/#about"
              onClick={() => setIsOpen((open) => !open)}
            >
              About
            </StyledMobileMenuItemA>
            <StyledMobileMenuItemA
              href="#projects"
              onClick={() => setIsOpen((open) => !open)}
            >
              Projects
            </StyledMobileMenuItemA>
            <StyledMobileMenuItemA
              href="/#skills"
              onClick={() => setIsOpen((open) => !open)}
            >
              Skills
            </StyledMobileMenuItemA>
            <StyledMobileMenuItemA
              href="#experience"
              onClick={() => setIsOpen((open) => !open)}
            >
              Experience
            </StyledMobileMenuItemA>

            <StyledMobileMenuItemA
              href="#research"
              onClick={() => setIsOpen((open) => !open)}
            >
              Research
            </StyledMobileMenuItemA>

            <StyledMobileMenuItemA
              href="#education"
              onClick={() => setIsOpen((open) => !open)}
            >
              Education
            </StyledMobileMenuItemA>
            <StyledMobileMenuItemA
              href="#contact"
              onClick={() => setIsOpen((open) => !open)}
            >
              Contact
            </StyledMobileMenuItemA>
            <StyledMobileMenuItemButton
              onClick={() => {
                setIsOpen(false);
                setIsConnectOpen(true);
              }}
            >
              Connect
            </StyledMobileMenuItemButton>
          </StyledMobileMenu>
        )}
      </StyledNav>

      <Connect isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />
    </>
  );
}

export default NavigationBar;
