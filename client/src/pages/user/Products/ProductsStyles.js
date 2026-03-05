import styled, { keyframes } from "styled-components";

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0);     }
`;

// ─── Page Wrapper ─────────────────────────────────────────────────────────────
export const ProductsWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

// ─── Hero Section ─────────────────────────────────────────────────────────────
export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 350px;
  background-image: url("https://img.freepik.com/premium-photo/worker-car-service-sprays-water-car-before-applying-protective-film_179755-22557.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 60px;
  border-top: 2px solid #cc0000;

  @media (max-width: 768px) {
    /* Shorter, full-bleed, bottom-anchored content */
    height: 220px;
    padding: 0;
    align-items: flex-end;
    border-top: none;
    border-bottom: 2px solid #cc0000;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(0, 0, 0, 0.82) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );

  @media (max-width: 768px) {
    /* Bottom-up gradient so content at bottom pops */
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.96) 0%,
      rgba(0, 0, 0, 0.65) 50%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 0 20px 20px;
    /* Eyebrow + title side-by-side compact layout */
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export const Eyebrow = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #cc0000;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 10px;
    letter-spacing: 4px;
    margin-bottom: 0;
  }
`;

export const HeroTitle = styled.h1`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  color: white;
  margin: 0 0 20px 0;
  line-height: 0.9;

  span {
    color: #cc0000;
  }

  @media (max-width: 768px) {
    font-size: clamp(2.4rem, 12vw, 3.2rem);
    margin: 0;
    line-height: 0.88;
  }
`;

export const HeroSubtitle = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 18px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;

  @media (max-width: 768px) {
    /* Hidden on mobile — saves space, content is minimal */
    display: none;
  }
`;

// ─── MOBILE: Compact Stats Row (below hero, mobile only) ──────────────────────
export const MobileStatsRow = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    background: #111111;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 12px 20px;
    gap: 0;
  }
`;

export const MobileStat = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1px;

  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  strong {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 1.1rem;
    font-weight: 900;
    color: #cc0000;
    line-height: 1;
  }

  span {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
  }
`;

// ─── Filter Bar ───────────────────────────────────────────────────────────────
export const FilterBar = styled.div`
  position: sticky;
  top: 68px;
  z-index: 100;
  background: rgba(10, 10, 10, 0.97);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding: 20px 40px;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    padding: 15px 20px;
    gap: 15px;
  }

  @media (max-width: 768px) {
    /* Redesigned: search row + scrollable filter chips + sort drawer */
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px 16px;
    top: 60px;
  }
`;

// ─── MOBILE: Search Row ───────────────────────────────────────────────────────
export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 15px;
  flex: 1;
  min-width: 250px;
  transition: all 0.3s;

  &:focus-within {
    border-color: #cc0000;
    box-shadow: 0 0 15px rgba(204, 0, 0, 0.2);
  }

  i {
    color: rgba(204, 0, 0, 0.7);
    font-size: 14px;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 15px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  @media (max-width: 768px) {
    min-width: 100%;
    padding: 10px 14px;
    border-radius: 6px;
    margin-bottom: 8px;

    input {
      font-size: 14px;
    }
  }
`;

// ─── MOBILE: Filter + Sort Row ────────────────────────────────────────────────
export const MobileFilterSortRow = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    overflow: hidden;
  }
`;

// Horizontal scrollable pill strip — mobile
export const FilterPills = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  /* Desktop filters - hide on mobile */
  &.desktop-filters {
    @media (max-width: 768px) {
      display: none;
    }
  }

  /* Mobile filters - show only on mobile */
  &.mobile-filters {
    @media (min-width: 769px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    flex: 1;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 6px;
    padding-bottom: 2px;
    min-width: 0;

    /* Hide scrollbar */
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  }
`;

export const FilterPill = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 7px 18px;
  border-radius: 100px;
  border: 1px solid
    ${({ $active }) => ($active ? "#cc0000" : "rgba(255, 255, 255, 0.15)")};
  background: ${({ $active }) => ($active ? "#cc0000" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "rgba(255, 255, 255, 0.55)")};
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    border-color: #cc0000;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 6px 12px;
    letter-spacing: 0.08em;
    min-width: fit-content;
  }
`;

// ─── Sort Section ─────────────────────────────────────────────────────────────
export const SortSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    flex-shrink: 0;
  }
`;

export const SortLabel = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    display: none;
  }
`;

// ─── MOBILE: Sort Icon Button ─────────────────────────────────────────────────
export const MobileSortBtn = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.22s ease;

    i {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }

    span {
      font-family: "Barlow Condensed", Arial, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover,
    &.active {
      border-color: #cc0000;
      i,
      span {
        color: #cc0000;
      }
    }
  }
`;

// ─── MOBILE: Sort Dropdown Sheet ──────────────────────────────────────────────
export const MobileSortSheet = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    gap: 2px;
    background: rgba(20, 20, 20, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 6px;
    animation: ${slideDown} 0.22s ease both;
  }
`;

export const SortOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: ${({ $active }) =>
    $active ? "rgba(204,0,0,0.1)" : "transparent"};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  span {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ $active }) => ($active ? "#cc0000" : "rgba(255,255,255,0.55)")};
  }

  i {
    font-size: 11px;
    color: #cc0000;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
  }

  &:hover {
    background: rgba(204, 0, 0, 0.07);
    span {
      color: #ffffff;
    }
  }
`;

export const SortSelect = styled.select`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 14px;
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #cc0000;
  }

  option {
    background: #1a1a1a;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// ─── Results Bar ──────────────────────────────────────────────────────────────
export const ResultsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

export const ResultsCount = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.06em;

  strong {
    color: #ffffff;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: 5px;
`;

export const ViewButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active }) =>
    $active ? "#cc0000" : "rgba(255, 255, 255, 0.04)"};
  border: 1px solid
    ${({ $active }) => ($active ? "#cc0000" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 6px;
  color: ${({ $active }) => ($active ? "white" : "rgba(255, 255, 255, 0.4)")};
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "#cc0000" : "rgba(255, 255, 255, 0.08)"};
    color: white;
  }

  i {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;

    i {
      font-size: 12px;
    }
  }
`;

// ─── Products Grid ────────────────────────────────────────────────────────────
export const ProductsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 60px;
  display: grid;
  grid-template-columns: ${({ $viewMode }) =>
    $viewMode === "grid" ? "repeat(auto-fill, minmax(320px, 1fr))" : "1fr"};
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: ${({ $viewMode }) =>
      $viewMode === "grid" ? "repeat(2, 1fr)" : "1fr"};
    padding: 0 20px 40px;
  }

  @media (max-width: 768px) {
    /* Grid: 2-column compact cards */
    /* List: single column full cards */
    grid-template-columns: ${({ $viewMode }) =>
      $viewMode === "grid" ? "repeat(2, 1fr)" : "1fr"};
    gap: ${({ $viewMode }) => ($viewMode === "grid" ? "10px" : "12px")};
    padding: 0 12px 80px;
  }

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Empty State ──────────────────────────────────────────────────────────────
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  animation: ${fadeInUp} 0.4s ease both;

  @media (max-width: 768px) {
    padding: 60px 24px;
  }
`;

export const EmptyIcon = styled.div`
  font-size: 80px;
  color: rgba(255, 255, 255, 0.08);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 56px;
    margin-bottom: 16px;
  }
`;

export const EmptyTitle = styled.h3`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 10px 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const EmptyText = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 16px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.35);
  margin: 0 0 28px 0;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 22px;
  }
`;

export const ClearButton = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 12px 30px;
  background: transparent;
  border: 1.5px solid #cc0000;
  border-radius: 4px;
  color: #cc0000;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 8px) 0,
    100% 8px,
    100% 100%,
    8px 100%,
    0 calc(100% - 8px)
  );

  &:hover {
    background: #cc0000;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 11px 28px;
    font-size: 13px;
    width: 100%;
    max-width: 240px;
  }
`;
