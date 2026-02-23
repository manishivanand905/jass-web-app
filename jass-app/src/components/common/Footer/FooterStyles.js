import styled from "styled-components";

export const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #0a0a0a;
  padding: 60px 0 20px;
  color: #ffffff;
  position: relative;

  /* Top line decoration */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #cc0000, transparent);
  }

  @media (max-width: 968px) {
    padding: 50px 0 20px;
  }

  @media (max-width: 576px) {
    padding: 40px 0 20px;
  }
`;

export const FooterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 1200px) {
    padding: 0 40px;
  }

  @media (max-width: 968px) {
    padding: 0 30px;
  }

  @media (max-width: 576px) {
    padding: 0 20px;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  gap: 60px;
  margin-bottom: 50px;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 0px;
    margin-bottom: 60px;
    flex-wrap: wrap;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  @media (max-width: 968px) {
    width: 75%;
  }

  @media (max-width: 576px) {
    width: 75%;
  }
`;

export const Logo = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 0;
  padding-top: 50px;
`;

export const FooterColumn = styled.div`
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  min-width: 150px;

  @media (max-width: 968px) {
    padding-left: 0;
    order: 0;
    width: auto;

    &.contact-mobile {
      order: 3;
      width: 100%;
    }
  }
`;

export const ColumnTitle = styled.h3`
  font-family: "Barlow Condensed", "Arial Narrow", Arial, sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px 0;
  padding-top: 50px;
  letter-spacing: 0.3px;
  text-transform: uppercase;

  @media (max-width: 576px) {
    font-size: 14px;
    margin-bottom: 14px;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NavItem = styled.li`
  line-height: 1.15;
`;

export const NavLink = styled.a`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 13px;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
  display: inline-block;

  &:hover {
    color: #cc0000;
  }

  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Address = styled.a`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 12px;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  cursor: pointer;
  pointer-events: auto;
  line-height: 1.6;

  &:hover {
    color: #cc0000;
  }

  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

export const ContactDetail = styled.a`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 12px;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    color: #cc0000;
  }

  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

export const Phone = styled.a`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 12px;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    color: #cc0000;
  }

  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 5px;
`;

export const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }

  svg {
    width: 25px;
    height: 25px;
    pointer-events: none;
  }

  @media (max-width: 576px) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 968px) {
    padding-top: 30px;
    border-top: 1px solid #4a4a4a;
  }

  @media (max-width: 576px) {
    padding-top: 20px;
    align-items: center;
    text-align: center;
  }
`;

export const Copyright = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 14px;
  color: #c0c0c0;
  margin: 0;
  font-weight: 400;

  @media (max-width: 576px) {
    font-size: 13px;
  }
`;

export const PoweredBy = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 12px;
  color: #a0a0a0;
  margin: 0;
  font-weight: 300;

  @media (max-width: 576px) {
    font-size: 11px;
  }
`;
