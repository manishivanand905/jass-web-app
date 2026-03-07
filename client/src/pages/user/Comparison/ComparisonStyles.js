import styled, { keyframes, css } from "styled-components";

// ─── Keyframes ────────────────────────────────────────────────────────────────
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-28px); }
  to   { opacity: 1; transform: translateX(0);     }
`;

export const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(28px); }
  to   { opacity: 1; transform: translateX(0);    }
`;

export const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(204,0,0,0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(204,0,0,0); }
`;

export const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

export const spinAnim = keyframes`
  to { transform: rotate(360deg); }
`;

export const bounceUp = keyframes`
  0%, 100% { transform: translateY(0);   }
  50%       { transform: translateY(-8px); }
`;

export const checkPop = keyframes`
  0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
  60%  { transform: scale(1.25) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1;   }
`;

export const progressFill = keyframes`
  from { width: 0%; }
  to   { width: var(--target-width); }
`;

// Scroll-reveal mixin
export const revealWhenVisible = css`
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.65s ease,
    transform 0.65s ease;
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export const ComparisonWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 320px;
  background-image: url("https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0 60px 40px;
  border-bottom: 2px solid #cc0000;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 230px;
    padding: 0 20px 28px;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.7) 55%,
    rgba(0, 0, 0, 0.35) 100%
  );
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 640px;
  animation: ${fadeInUp} 0.7s ease both;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Eyebrow = styled.div`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

export const HeroTitle = styled.h1`
  font-family: "Barlow Condensed", sans-serif;
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 900;
  color: #fff;
  margin: 0 0 14px;
  line-height: 0.9;
  letter-spacing: -0.01em;

  span {
    color: #cc0000;
  }
`;

export const HeroSubtitle = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// ─── Tab Switcher ─────────────────────────────────────────────────────────────
export const TabSwitcher = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 44px 20px 36px;
  max-width: 560px;
  margin: 0 auto;

  @media (max-width: 480px) {
    gap: 10px;
    padding: 32px 16px 28px;
  }
`;

export const TabButton = styled.button`
  flex: 1;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 14px 28px;
  background: ${({ $active }) =>
    $active ? "#cc0000" : "rgba(255,255,255,0.03)"};
  border: 1.5px solid
    ${({ $active }) => ($active ? "#cc0000" : "rgba(255,255,255,0.1)")};
  border-radius: 6px;
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255,255,255,0.5)")};
  cursor: pointer;
  transition: all 0.28s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );

  box-shadow: ${({ $active }) =>
    $active ? "0 6px 20px rgba(204,0,0,0.3)" : "none"};

  &:hover {
    border-color: #cc0000;
    color: #fff;
    background: ${({ $active }) =>
      $active ? "#cc0000" : "rgba(204,0,0,0.08)"};
  }

  i {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.78rem;
    padding: 12px 14px;
    gap: 6px;
    clip-path: polygon(
      0 0,
      calc(100% - 7px) 0,
      100% 7px,
      100% 100%,
      7px 100%,
      0 calc(100% - 7px)
    );
  }
`;

// ─── Section Header ───────────────────────────────────────────────────────────
export const SectionHeader = styled.div`
  text-align: center;
  padding: 16px 24px 36px;
  max-width: 720px;
  margin: 0 auto;
  ${revealWhenVisible}
`;

export const SectionTitle = styled.h2`
  font-family: "Barlow Condensed", sans-serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  color: #fff;
  margin: 8px 0 12px;
  line-height: 1;

  span {
    color: #cc0000;
  }
`;

// ─── Table ────────────────────────────────────────────────────────────────────
export const TableWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px 72px;
  overflow-x: auto;
  ${revealWhenVisible}

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cc0000;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    padding: 0 12px 48px;
  }
`;

export const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 860px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.thead`
  background: rgba(204, 0, 0, 0.06);
  border-bottom: 2px solid rgba(204, 0, 0, 0.2);

  th:first-child {
    width: 200px;
    padding: 20px 24px;
    text-align: left;
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
    position: sticky;
    left: 0;
    background: #0f0f0f;
    z-index: 10;
  }
`;

export const BrandColumn = styled.th`
  padding: 20px 16px;
  text-align: center;
  min-width: 160px;
  background: ${({ $highlight }) =>
    $highlight ? "rgba(204,0,0,0.07) !important" : "transparent"};
  border-top: ${({ $highlight }) =>
    $highlight ? "3px solid #cc0000" : "3px solid transparent"};
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease;
`;

export const BrandName = styled.div`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.95rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
`;

export const BrandOrigin = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 0.8rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.38);
  margin-bottom: 8px;
`;

export const TierBadge = styled.div`
  display: inline-block;
  padding: 3px 10px;
  background: rgba(204, 0, 0, 0.14);
  border: 1px solid rgba(204, 0, 0, 0.3);
  border-radius: 100px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #cc0000;
`;

export const TableBody = styled.tbody``;

export const FeatureRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.18s ease;

  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.015);
  }
  &:hover {
    background: rgba(204, 0, 0, 0.04);
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const FeatureLabel = styled.td`
  padding: 15px 24px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  position: sticky;
  left: 0;
  background: inherit;
  z-index: 5;
  white-space: nowrap;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
`;

export const FeatureIcon = styled.i`
  margin-right: 10px;
  color: #cc0000;
  font-size: 0.82rem;
  width: 14px;
  text-align: center;
`;

export const FeatureCell = styled.td`
  padding: 15px 16px;
  text-align: center;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  background: ${({ $highlight }) =>
    $highlight ? "rgba(204,0,0,0.04)" : "transparent"};
  border-left: 1px solid rgba(255, 255, 255, 0.04);

  i {
    font-size: 1.05rem;
  }
`;

export const BestForBadge = styled.div`
  display: inline-block;
  padding: 4px 12px;
  background: rgba(204, 0, 0, 0.12);
  border: 1px solid rgba(204, 0, 0, 0.25);
  border-radius: 100px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #cc0000;
`;

// ─── Ceramic Coating Specific Styles ─────────────────────────────────────────
export const CeramicVisualiserSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 24px 80px;
  background: linear-gradient(135deg, rgba(0,100,200,0.03) 0%, rgba(0,50,150,0.02) 100%);
  border-radius: 16px;
  border: 1px solid rgba(0,150,255,0.08);
  ${revealWhenVisible}

  @media (max-width: 768px) {
    padding: 48px 16px 56px;
  }
`;

export const CeramicHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 44px;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

export const CeramicTitle = styled.h2`
  font-family: "Barlow Condensed", sans-serif;
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 900;
  color: #fff;
  margin: 8px 0 10px;
  line-height: 1;

  span {
    color: #0099ff;
  }
`;

export const CeramicBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(0,150,255,0.08);
  border: 1px solid rgba(0,150,255,0.15);
  border-radius: 6px;
  flex-shrink: 0;
  margin-top: 4px;

  i {
    font-size: 0.78rem;
    color: #0099ff;
  }

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(0,150,255,0.7);
  }
`;

export const CeramicUploadBox = styled.div`
  width: 100%;
  padding: 52px 40px;
  background: rgba(0,150,255,0.03);
  border: 2px dashed
    ${({ $dragging }) => ($dragging ? "#0099ff" : "rgba(0,150,255,0.25)")};
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.28s ease;
  background: ${({ $dragging }) =>
    $dragging ? "rgba(0,150,255,0.08)" : "rgba(0,150,255,0.03)"};

  &:hover {
    border-color: rgba(0,150,255,0.55);
    background: rgba(0,150,255,0.06);
  }

  @media (max-width: 768px) {
    padding: 36px 20px;
  }
`;

export const CeramicUploadIcon = styled.i`
  font-size: 3.2rem;
  color: ${({ $dragging }) => ($dragging ? "#0099ff" : "rgba(0,150,255,0.6)")};
  margin-bottom: 16px;
  display: block;
  transition: all 0.28s ease;
  animation: ${({ $dragging }) =>
    $dragging
      ? css`
          ${bounceUp} 0.6s ease infinite
        `
      : "none"};
`;

export const CeramicBrowseBtn = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 22px;
  background: transparent;
  border: 1.5px solid #0099ff;
  border-radius: 6px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #0099ff;
  transition: all 0.22s ease;

  &:hover {
    background: #0099ff;
    color: #fff;
  }

  i {
    font-size: 0.75rem;
  }
`;

export const CeramicSwatchCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $style }) => $style};
  border: ${({ $selected }) =>
    $selected ? "3px solid #0099ff" : "2px solid rgba(0,150,255,0.15)"};
  outline: ${({ $selected }) =>
    $selected ? "2px solid rgba(0,150,255,0.35)" : "none"};
  outline-offset: 3px;
  transition: all 0.22s ease;
  box-shadow: ${({ $selected }) =>
    $selected ? "0 4px 16px rgba(0,150,255,0.4)" : "none"};
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
  }
`;

export const CeramicCheckBadge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0099ff;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${checkPop} 0.3s ease both;

  i {
    font-size: 8px;
    color: #fff;
  }
`;

export const CeramicGenerateBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  padding: 18px 24px;
  background: ${({ $disabled }) =>
    $disabled ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg, #0099ff 0%, #0066cc 100%)"};
  border: 1.5px solid
    ${({ $disabled }) => ($disabled ? "rgba(255,255,255,0.07)" : "#0099ff")};
  border-radius: 8px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  transition: all 0.28s ease;
  margin-bottom: 32px;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0088ee 0%, #0055bb 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,150,255,0.4);
  }

  .btn-main {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Barlow Condensed", sans-serif;
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ $disabled }) =>
      $disabled ? "rgba(255,255,255,0.25)" : "#fff"};

    i {
      font-size: 1rem;
    }
  }

  .btn-sub {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-size: 0.78rem;
    color: ${({ $disabled }) =>
      $disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.8)"};
  }
`;

export const CeramicImageLabel = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: ${({ $after }) => $after ? "rgba(0,150,255,0.9)" : "rgba(0, 0, 0, 0.65)"};
  border: 1px solid ${({ $after }) => $after ? "transparent" : "rgba(255, 255, 255, 0.12)"};
  border-radius: 100px;
  backdrop-filter: blur(8px);

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ $after }) => $after ? "#fff" : "rgba(255, 255, 255, 0.8)"};
  }
`;

// ─── PPF Specific Styles (Original Red Theme) ─────────────────────────────────
export const VisualiserSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 24px 80px;
  ${revealWhenVisible}

  @media (max-width: 768px) {
    padding: 48px 16px 56px;
  }
`;

export const VisualiserHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 44px;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

export const VisualHeader = styled.div``;

export const VisualTitle = styled.h2`
  font-family: "Barlow Condensed", sans-serif;
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 900;
  color: #fff;
  margin: 8px 0 10px;
  line-height: 1;

  span {
    color: #cc0000;
  }
`;

export const PoweredBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  flex-shrink: 0;
  margin-top: 4px;

  i {
    font-size: 0.78rem;
    color: #cc0000;
  }

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.35);
  }
`;

// ─── Upload ───────────────────────────────────────────────────────────────────
export const UploadArea = styled.div`
  margin-bottom: 32px;
`;

export const UploadBox = styled.div`
  width: 100%;
  padding: 52px 40px;
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed
    ${({ $dragging }) => ($dragging ? "#cc0000" : "rgba(204,0,0,0.25)")};
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.28s ease;
  background: ${({ $dragging }) =>
    $dragging ? "rgba(204,0,0,0.06)" : "rgba(255,255,255,0.02)"};

  &:hover {
    border-color: rgba(204, 0, 0, 0.55);
    background: rgba(204, 0, 0, 0.04);
  }

  @media (max-width: 768px) {
    padding: 36px 20px;
  }
`;

export const UploadIcon = styled.i`
  font-size: 3.2rem;
  color: ${({ $dragging }) => ($dragging ? "#cc0000" : "rgba(204,0,0,0.5)")};
  margin-bottom: 16px;
  display: block;
  transition: all 0.28s ease;
  animation: ${({ $dragging }) =>
    $dragging
      ? css`
          ${bounceUp} 0.6s ease infinite
        `
      : "none"};
`;

export const UploadText = styled.p`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #fff;
  margin: 0 0 6px;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const UploadSubText = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0 0 20px;
`;

export const BrowseBtn = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 22px;
  background: transparent;
  border: 1.5px solid #cc0000;
  border-radius: 4px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #cc0000;
  transition: all 0.22s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 7px) 0,
    100% 7px,
    100% 100%,
    7px 100%,
    0 calc(100% - 7px)
  );

  &:hover {
    background: #cc0000;
    color: #fff;
  }

  i {
    font-size: 0.75rem;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const TipStrip = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 16px;
`;

export const TipPill = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 100px;

  i {
    font-size: 0.65rem;
    color: ${({ $good }) => ($good ? "#27ae60" : "#cc0000")};
  }

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.38);
  }
`;

// ─── Demo Car Selector ────────────────────────────────────────────────────────
export const DemoSection = styled.div`
  margin-bottom: 32px;
`;

export const DemoLabel = styled.p`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
  text-align: center;
  margin-bottom: 14px;
`;

export const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const DemoCard = styled.button`
  background: ${({ $selected }) =>
    $selected ? "rgba(204,0,0,0.1)" : "rgba(255,255,255,0.02)"};
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#cc0000" : "rgba(255,255,255,0.07)")};
  border-radius: 8px;
  padding: 16px 12px 12px;
  cursor: pointer;
  text-align: center;
  transition: all 0.22s ease;

  &:hover {
    border-color: rgba(204, 0, 0, 0.5);
    background: rgba(204, 0, 0, 0.05);
  }

  i {
    font-size: 1.6rem;
    color: ${({ $selected }) =>
      $selected ? "#cc0000" : "rgba(255,255,255,0.25)"};
    display: block;
    margin-bottom: 8px;
    transition: color 0.22s ease;
  }

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ $selected }) => ($selected ? "#fff" : "rgba(255,255,255,0.4)")};
    transition: color 0.22s ease;
  }
`;

// ─── Image Preview ────────────────────────────────────────────────────────────
export const ImagePreviewWrap = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  animation: ${fadeIn} 0.4s ease both;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ChangePhotoBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  padding: 7px 12px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);

  i {
    font-size: 0.7rem;
  }

  &:hover {
    border-color: #cc0000;
    color: #cc0000;
  }
`;

// ─── Finish Swatches ──────────────────────────────────────────────────────────
export const SwatchSection = styled.div`
  margin-bottom: 28px;
`;

export const SwatchLabel = styled.p`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 14px;
`;

export const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 360px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SwatchCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  position: relative;
  transition: transform 0.22s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const SwatchCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $style }) => $style};
  border: ${({ $selected }) =>
    $selected ? "3px solid #cc0000" : "2px solid rgba(255,255,255,0.1)"};
  outline: ${({ $selected }) =>
    $selected ? "2px solid rgba(204,0,0,0.35)" : "none"};
  outline-offset: 3px;
  transition: all 0.22s ease;
  box-shadow: ${({ $selected }) =>
    $selected ? "0 4px 16px rgba(204,0,0,0.4)" : "none"};
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
  }
`;

export const SwatchCheckBadge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #cc0000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${checkPop} 0.3s ease both;

  i {
    font-size: 8px;
    color: #fff;
  }
`;

export const SwatchName = styled.span`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $selected }) => ($selected ? "#fff" : "rgba(255,255,255,0.38)")};
  text-align: center;
  line-height: 1.2;
  transition: color 0.22s ease;

  @media (max-width: 480px) {
    font-size: 0.55rem;
  }
`;

export const SwatchBadge = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: rgba(204, 0, 0, 0.9);
  border-radius: 100px;
  padding: 1px 6px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
`;

// ─── Generate Button ──────────────────────────────────────────────────────────
export const GenerateBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  padding: 18px 24px;
  background: ${({ $disabled }) =>
    $disabled ? "rgba(255,255,255,0.04)" : "#cc0000"};
  border: 1.5px solid
    ${({ $disabled }) => ($disabled ? "rgba(255,255,255,0.07)" : "#cc0000")};
  border-radius: 6px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  transition: all 0.28s ease;
  clip-path: ${({ $disabled }) =>
    $disabled
      ? "none"
      : "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"};
  margin-bottom: 32px;

  &:hover:not(:disabled) {
    background: #e60000;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(204, 0, 0, 0.4);
  }

  .btn-main {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Barlow Condensed", sans-serif;
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ $disabled }) =>
      $disabled ? "rgba(255,255,255,0.25)" : "#fff"};

    i {
      font-size: 1rem;
    }
  }

  .btn-sub {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-size: 0.78rem;
    color: ${({ $disabled }) =>
      $disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.65)"};
  }
`;

// ─── Loading State ────────────────────────────────────────────────────────────
export const LoadingPanel = styled.div`
  width: 100%;
  padding: 52px 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  text-align: center;
  margin-bottom: 32px;
  animation: ${fadeIn} 0.3s ease both;
`;

export const LoadingIcon = styled.i`
  font-size: 2.8rem;
  color: #cc0000;
  display: block;
  margin-bottom: 20px;
  animation: ${spinAnim} 1.4s linear infinite;
`;

export const LoadingTitle = styled.p`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #fff;
  margin: 0 0 4px;
`;

export const LoadingStatus = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0 0 20px;
  min-height: 1.4em;
  transition: opacity 0.4s ease;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
  max-width: 400px;
  margin: 0 auto;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: #cc0000;
  border-radius: 2px;
  transition: width 0.8s ease;
  width: ${({ $pct }) => $pct}%;
`;

// ─── Before / After Side by Side ─────────────────────────────────────────────
export const SliderSection = styled.div`
  animation: ${fadeInUp} 0.45s ease both;
  margin-bottom: 24px;
`;

export const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const ImageCard = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

export const ImageLabel = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: ${({ $after }) => $after ? "rgba(204, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.65)"};
  border: 1px solid ${({ $after }) => $after ? "transparent" : "rgba(255, 255, 255, 0.12)"};
  border-radius: 100px;
  backdrop-filter: blur(8px);

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ $after }) => $after ? "#fff" : "rgba(255, 255, 255, 0.8)"};
  }
`;

export const ComparisonImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${({ $filter }) => $filter || "none"};
  transition: filter 0.4s ease;
`;

// ─── Preview Toggle ───────────────────────────────────────────────────────────
export const PreviewToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const PreviewToggleLabel = styled.span`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin-right: 4px;
`;

export const PreviewToggleBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: ${({ $active }) =>
    $active ? "rgba(204,0,0,0.12)" : "rgba(255,255,255,0.03)"};
  border: 1px solid
    ${({ $active }) => ($active ? "#cc0000" : "rgba(255,255,255,0.08)")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  i {
    font-size: 0.7rem;
    color: ${({ $active }) => ($active ? "#cc0000" : "rgba(255,255,255,0.3)")};
  }

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ $active }) => ($active ? "#cc0000" : "rgba(255,255,255,0.4)")};
  }

  &:hover {
    border-color: rgba(204, 0, 0, 0.4);
    i,
    span {
      color: rgba(204, 0, 0, 0.8);
    }
  }
`;

// ─── Action Row ───────────────────────────────────────────────────────────────
export const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ActionBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  transition: all 0.22s ease;

  i {
    font-size: 0.75rem;
  }

  &:hover {
    border-color: rgba(204, 0, 0, 0.4);
    color: #cc0000;
    background: rgba(204, 0, 0, 0.06);
  }

  @media (max-width: 480px) {
    flex: none;
    width: 100%;
  }
`;

// ─── Error State ──────────────────────────────────────────────────────────────
export const ErrorPanel = styled.div`
  text-align: center;
  padding: 44px 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  margin-bottom: 32px;
  animation: ${fadeIn} 0.3s ease both;

  i.error-icon {
    font-size: 2.8rem;
    color: #e67e22;
    margin-bottom: 16px;
    display: block;
  }

  h3 {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 8px;
  }

  p {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.35);
    max-width: 400px;
    margin: 0 auto 20px;
    line-height: 1.6;
  }
`;

export const ErrorBtnRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ErrorBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  background: ${({ $primary }) => ($primary ? "#cc0000" : "transparent")};
  border: 1px solid
    ${({ $primary }) => ($primary ? "#cc0000" : "rgba(255,255,255,0.12)")};
  border-radius: 4px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $primary }) => ($primary ? "#fff" : "rgba(255,255,255,0.45)")};
  cursor: pointer;
  transition: all 0.22s ease;
  clip-path: ${({ $primary }) =>
    $primary
      ? "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))"
      : "none"};

  &:hover {
    border-color: rgba(204, 0, 0, 0.5);
    color: ${({ $primary }) => ($primary ? "#fff" : "#cc0000")};
  }

  i {
    font-size: 0.72rem;
  }
`;

// ─── CSS Disclaimer ───────────────────────────────────────────────────────────
export const CSSDisclaimer = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.2);
  text-align: center;
  margin: 12px 0 0;
`;

// ─── Divider ──────────────────────────────────────────────────────────────────
export const SectionDivider = styled.div`
  max-width: 1200px;
  margin: 0 auto 0;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 16px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.07);
  }

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.15);
    white-space: nowrap;
  }
`;

export const VisualComparisonSection = styled.section``;
export const ImageWrapper = styled.div``;
export const NoImageText = styled.div``;
export const UploadBox2 = styled.div``;
