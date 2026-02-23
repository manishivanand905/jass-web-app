import styled from "styled-components";

export const FAQSection = styled.section`
  padding: 80px 40px;
  background: #0a0a0a;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

export const Eyebrow = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 0.9;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;

  span {
    color: #cc0000;
  }
`;

export const AccordionList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AccordionItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: ${props => props.$isOpen ? "3px solid #cc0000" : "3px solid transparent"};
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s;
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  transition: all 0.3s;

  span {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: white;
  }

  i {
    font-size: 16px;
    color: #cc0000;
    transition: transform 0.3s;
    transform: ${props => props.$isOpen ? "rotate(180deg)" : "rotate(0)"};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const AccordionAnswer = styled.div`
  max-height: ${props => props.$isOpen ? "500px" : "0"};
  opacity: ${props => props.$isOpen ? "1" : "0"};
  overflow: hidden;
  transition: all 0.4s ease;
  padding: ${props => props.$isOpen ? "0 24px 20px 24px" : "0 24px"};
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.85;
`;
