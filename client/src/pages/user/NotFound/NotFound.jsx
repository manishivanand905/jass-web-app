import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Container = styled.div`
  text-align: center;
  max-width: 600px;
`;

const ErrorCode = styled.h1`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 10rem;
  font-weight: 900;
  color: #cc0000;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 20px 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 40px 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 30px;
  background: #cc0000;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));

  &:hover {
    background: #a00000;
    transform: translateY(-2px);
  }

  i {
    margin-right: 8px;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Description>
          The page you're looking for doesn't exist or has been moved.
        </Description>
        <Button onClick={() => navigate("/")}>
          <i className="fas fa-home" /> {" "}Go to Home
        </Button>
      </Container>
    </Wrapper>
  );
};

export default NotFound;
