import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdClose, IoMdMail, IoMdPerson, IoMdSend } from "react-icons/io";
import emailjs from "@emailjs/browser";

const ConnectOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ConnectForm = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  position: relative;
  border: 1px solid #854ce6;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.primary + 20};
    transform: scale(1.1);
  }
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 10px 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 30px 0;
  text-align: center;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px 16px 50px;
  border: 2px solid ${({ theme }) => theme.primary + 40};
  border-radius: 12px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #854ce6;
    box-shadow: 0 0 0 3px rgba(133, 76, 230, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 80};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px 20px 16px 50px;
  border: 2px solid ${({ theme }) => theme.primary + 40};
  border-radius: 12px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #854ce6;
    box-shadow: 0 0 0 3px rgba(133, 76, 230, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary + 80};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  z-index: 1;
`;

const TextAreaIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 22px;
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  z-index: 1;
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  margin-top: 20px;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  margin-top: 20px;
  animation: slideDown 0.3s ease;
`;

const Connect = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize EmailJS when component mounts
  useEffect(() => {
    if (isOpen) {
      emailjs.init(
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage("Please fill in all fields");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    if (!formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "muqaddaspreetsingh@gmail.com",
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );

      console.log("Email sent successfully:", result);

      // Show success message
      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Close form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage(
        "Failed to send message. Please try again or contact directly at muqaddaspreetsingh@gmail.com"
      );
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: "", email: "", message: "" });
      setShowSuccess(false);
      setShowError(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ConnectOverlay onClick={handleClose}>
      <ConnectForm onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>
          <IoMdClose />
        </CloseButton>

        <Title>Let's Connect!</Title>
        <Subtitle>
          I'm always interested in hearing about new opportunities, interesting
          projects, or just having a chat about technology.
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <IoMdPerson />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <IoMdMail />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              required
            />
          </InputGroup>

          <InputGroup>
            <TextAreaIcon>
              <IoMdMail />
            </TextAreaIcon>
            <TextArea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
              required
            />
          </InputGroup>

          <SendButton type="submit" disabled={isSubmitting}>
            <IoMdSend />
            {isSubmitting ? "Sending..." : "Send Message"}
          </SendButton>
        </Form>

        {showSuccess && (
          <SuccessMessage>
            Message sent successfully! I'll get back to you soon.
          </SuccessMessage>
        )}

        {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </ConnectForm>
    </ConnectOverlay>
  );
};

export default Connect;
