import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// Animation keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(-5deg); }
  75% { transform: translateY(-15px) rotate(3deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const wave = keyframes`
  0% { transform: translateX(-100%) rotate(0deg); }
  100% { transform: translateX(100%) rotate(360deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
  50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.6), 0 0 60px rgba(102, 126, 234, 0.3); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ContactContainer = styled.section`
  padding: 40px 0;
  background: ${({ theme }) => theme.bg};
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    z-index: 1;
  }
`;

// Animated background elements
const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
`;

const FloatingParticle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  opacity: 0.6;

  &:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-duration: 8s;
  }
  &:nth-child(2) {
    top: 60%;
    left: 20%;
    animation-duration: 10s;
  }
  &:nth-child(3) {
    top: 30%;
    left: 80%;
    animation-duration: 7s;
  }
  &:nth-child(4) {
    top: 70%;
    left: 70%;
    animation-duration: 9s;
  }
  &:nth-child(5) {
    top: 40%;
    left: 50%;
    animation-duration: 11s;
  }
  &:nth-child(6) {
    top: 80%;
    left: 30%;
    animation-duration: 6s;
  }
  &:nth-child(7) {
    top: 15%;
    left: 60%;
    animation-duration: 12s;
  }
  &:nth-child(8) {
    top: 85%;
    left: 85%;
    animation-duration: 8s;
  }
`;

const GradientWave = styled.div`
  position: absolute;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(102, 126, 234, 0.1) 50%,
    transparent 70%
  );
  animation: ${wave} 20s linear infinite;
  top: -50%;
  left: -50%;
`;

const GlowingOrb = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.3) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: ${pulse} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

  &:nth-child(1) {
    top: 15%;
    right: 15%;
  }
  &:nth-child(2) {
    bottom: 20%;
    left: 10%;
  }
`;

const RotatingRing = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  animation: ${rotate} 30s linear infinite;

  &:nth-child(1) {
    top: 10%;
    left: 5%;
  }
  &:nth-child(2) {
    bottom: 10%;
    right: 5%;
  }

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: 50%;
    width: 4px;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    border-radius: 50%;
    transform: translateX(-50%);
  }
`;

const ContactWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ContactInfo = styled.div`
  color: ${({ theme }) => theme.text_primary};
  animation: ${slideIn} 0.8s ease-out;
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${fadeInUp} 1s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContactSubtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  animation: ${fadeInUp} 1s ease-out 0.4s both;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: ${({ theme }) => theme.card_light};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.primary};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    border-color: ${({ theme }) => theme.primary};
    animation: ${glow} 2s ease-in-out infinite;
  }
`;

const IconWrapper = styled.div`
  width: 45px;
  height: 45px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.3rem;
  color: white;
  transition: all 0.3s ease;

  ${InfoItem}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.text_primary};
`;

const InfoValue = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

const ContactForm = styled.div`
  background: ${({ theme }) => theme.card_light};
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  border: 2px solid ${({ theme }) => theme.primary};
  backdrop-filter: blur(10px);
  animation: ${slideInRight} 0.8s ease-out 0.3s both;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
    border-width: 3px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(102, 126, 234, 0.05) 50%,
      transparent 100%
    );
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: -1;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  animation: ${fadeInUp} 1s ease-out 0.5s both;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  animation: ${fadeInUp} 1s ease-out ${(props) => 0.7 + props.index * 0.1}s both;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 1s ease-out 1.1s both;

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

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
    background: #357abd;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: #4caf50;
  color: white;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  margin-top: 15px;
  font-weight: 600;
  font-size: 0.9rem;
  animation: ${fadeInUp} 0.5s ease-out;
`;

const ErrorMessage = styled.div`
  background: #f44336;
  color: white;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  margin-top: 15px;
  font-weight: 600;
  font-size: 0.9rem;
  animation: ${fadeInUp} 0.5s ease-out;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "muqaddaspreetsingh@gmail.com",
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer id="contact">
      <AnimatedBackground>
        <FloatingParticle delay={0} />
        <FloatingParticle delay={1} />
        <FloatingParticle delay={2} />
        <FloatingParticle delay={3} />
        <FloatingParticle delay={4} />
        <FloatingParticle delay={5} />
        <FloatingParticle delay={6} />
        <FloatingParticle delay={7} />

        <GradientWave />

        <GlowingOrb delay={0} />
        <GlowingOrb delay={2} />

        <RotatingRing />
        <RotatingRing />
      </AnimatedBackground>

      <ContactWrapper>
        <ContactInfo>
          <ContactTitle>Get In Touch</ContactTitle>
          <ContactSubtitle>
            I'm always interested in hearing about new opportunities,
            interesting projects, or just want to say hello!
          </ContactSubtitle>

          <InfoItem index={0}>
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <InfoContent>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>muqaddaspreetsingh@gmail.com</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem index={1}>
            <IconWrapper>
              <FaPhone />
            </IconWrapper>
            <InfoContent>
              <InfoLabel>Phone</InfoLabel>
              <InfoValue>+1 (514) 123-4567</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem index={2}>
            <IconWrapper>
              <FaMapMarkerAlt />
            </IconWrapper>
            <InfoContent>
              <InfoLabel>Location</InfoLabel>
              <InfoValue>Canada</InfoValue>
            </InfoContent>
          </InfoItem>
        </ContactInfo>

        <ContactForm>
          <FormTitle>Send Me a Message</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup index={0}>
              <Label htmlFor="name">Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
              />
            </FormGroup>

            <FormGroup index={1}>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </FormGroup>

            <FormGroup index={2}>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project, opportunity, or just say hello!"
                required
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </SubmitButton>

            {submitStatus === "success" && (
              <SuccessMessage>
                Thank you! Your message has been sent successfully.
              </SuccessMessage>
            )}

            {submitStatus === "error" && (
              <ErrorMessage>
                Oops! Something went wrong. Please try again.
              </ErrorMessage>
            )}
          </form>
        </ContactForm>
      </ContactWrapper>
    </ContactContainer>
  );
};

export default Contact;
