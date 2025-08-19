import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import { darkTheme } from "./Utils/Themes";
import NavigationBar from "./Components/Navbar/NavigationBar";
import Hero from "./Components/Hero/Hero";
import Skills from "./Components/Skills/skills";
import Education from "./Components/Education/Education";
import { BrowserRouter } from "react-router-dom";
import Experience from "./Components/Experience/Experience";
import Projects from "Components/Projects/Projects";
import Footer from "Components/Footer/Footer.jsx";

const StyledDiv = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  color: white;
`;

const GradientWrapper = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <NavigationBar />
        <StyledDiv>
          <Hero />
          <GradientWrapper>
            <Projects />
            <Skills />
            <Experience />
            <Education />
          </GradientWrapper>
          <Footer />
        </StyledDiv>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
