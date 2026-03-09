import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/common/Sidebar/Sidebar";

import {
  ppfBrands,
  ceramicBrands,
  ppfFeatures,
  ceramicFeatures,
} from "../../../data/comparisonData";

import {
  ComparisonWrapper,
  HeroSection,
  HeroOverlay,
  HeroContent,
  Eyebrow,
  HeroTitle,
  HeroSubtitle,
  TabSwitcher,
  TabButton,
  SectionHeader,
  SectionTitle,
  TableWrapper,
  ComparisonTable,
  TableHeader,
  BrandColumn,
  BrandName,
  BrandOrigin,
  TierBadge,
  TableBody,
  FeatureRow,
  FeatureLabel,
  FeatureIcon,
  FeatureCell,
  BestForBadge,
  SectionDivider,

  // Ceramic UI only
  CeramicVisualiserSection,
  CeramicHeader,
  CeramicTitle,
  CeramicBadge,
  VisualHeader,
  CTABanner,
  CTAContent,
  CTATitle,
  CTASubtitle,
  CTAButtons,
  PrimaryButton,
  SecondaryButton,
} from "./ComparisonStyles";

// ─── Scroll Reveal ─────────────────────────
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// ─── Component ─────────────────────────────
const Comparison = () => {
  useScrollReveal();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ppf");

  const brands = activeTab === "ppf" ? ppfBrands : ceramicBrands;
  const features = activeTab === "ppf" ? ppfFeatures : ceramicFeatures;

  const renderCell = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <i className="fa-solid fa-circle-check" style={{ color: "#cc0000" }} />
      ) : (
        <i
          className="fa-solid fa-circle-xmark"
          style={{ color: "rgba(255,255,255,0.18)" }}
        />
      );
    }

    return value;
  };

  return (
    <Sidebar type="user">
      <ComparisonWrapper>
        {/* HERO */}

        <HeroSection>
          <HeroOverlay />

          <HeroContent>
            <Eyebrow>Side by Side</Eyebrow>

            <HeroTitle>
              COMPARE <span>&amp; CHOOSE</span>
            </HeroTitle>

            <HeroSubtitle>
              Compare PPF &amp; ceramic brands side by side to choose the best
              protection for your vehicle.
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        {/* TAB SWITCHER */}

        <TabSwitcher>
          <TabButton
            $active={activeTab === "ppf"}
            onClick={() => setActiveTab("ppf")}
          >
            <i className="fa-solid fa-film" /> PPF Brands
          </TabButton>

          <TabButton
            $active={activeTab === "ceramic"}
            onClick={() => setActiveTab("ceramic")}
          >
            <i className="fa-solid fa-flask" /> Ceramic Brands
          </TabButton>
        </TabSwitcher>

        {/* CERAMIC VISUALISER ONLY */}

        {activeTab === "ceramic" && (
          <CeramicVisualiserSection data-reveal>
            <CeramicHeader>
              <VisualHeader>
                <Eyebrow>Ceramic Coating Visualiser</Eyebrow>

                <CeramicTitle>
                  See the <span>brightness enhancement</span>
                </CeramicTitle>

                <HeroSubtitle>
                  Enhance your vehicle's natural beauty with professional
                  ceramic coatings. Ceramic coating dramatically improves paint
                  brightness, gloss and depth while creating a mirror-like
                  showroom finish.
                </HeroSubtitle>
              </VisualHeader>

              <CeramicBadge>
                <i className="fa-solid fa-sparkles" />

                <span>Brightness Enhancement</span>
              </CeramicBadge>
            </CeramicHeader>
          </CeramicVisualiserSection>
        )}

        {/* SECTION DIVIDER */}

        <SectionDivider>
          <span>Brand Comparison</span>
        </SectionDivider>

        {/* BRAND COMPARISON TABLE */}

        <SectionHeader data-reveal>
          <Eyebrow>
            {activeTab === "ppf" ? "Paint Protection Film" : "Ceramic Coating"}
          </Eyebrow>

          <SectionTitle>
            {activeTab === "ppf" ? "PPF Brand" : "Ceramic Brand"}{" "}
            <span>Comparison</span>
          </SectionTitle>

          <HeroSubtitle>
            Compare the top {activeTab === "ppf" ? "PPF" : "ceramic"} brands by
            performance, durability and value.
          </HeroSubtitle>
        </SectionHeader>

        <TableWrapper data-reveal>
          <ComparisonTable>
            <TableHeader>
              <tr>
                <th>Feature</th>

                {brands.map((brand) => (
                  <BrandColumn key={brand.id} $highlight={brand.highlight}>
                    <BrandName>{brand.name}</BrandName>

                    <BrandOrigin>{brand.origin}</BrandOrigin>

                    <TierBadge>{brand.tier}</TierBadge>
                  </BrandColumn>
                ))}
              </tr>
            </TableHeader>

            <TableBody>
              {features.map((feat) => (
                <FeatureRow key={feat.key}>
                  <FeatureLabel>
                    <FeatureIcon className={feat.icon} />

                    {feat.label}
                  </FeatureLabel>

                  {brands.map((brand) => (
                    <FeatureCell key={brand.id} $highlight={brand.highlight}>
                      {renderCell(brand.specs[feat.key])}
                    </FeatureCell>
                  ))}
                </FeatureRow>
              ))}

              <FeatureRow>
                <FeatureLabel>
                  <FeatureIcon className="fa-solid fa-car" />
                  Best For
                </FeatureLabel>

                {brands.map((brand) => (
                  <FeatureCell key={brand.id} $highlight={brand.highlight}>
                    <BestForBadge>{brand.bestFor}</BestForBadge>
                  </FeatureCell>
                ))}
              </FeatureRow>
            </TableBody>
          </ComparisonTable>
        </TableWrapper>

        <CTABanner>
          <CTAContent>
            <CTATitle>
              READY TO PROTECT <span>YOUR VEHICLE?</span>
            </CTATitle>

            <CTASubtitle>
              Book your service today and experience premium automotive
              protection
            </CTASubtitle>

            <CTAButtons>
              <PrimaryButton onClick={() => navigate("/products")}>
                <i className="fa-solid fa-box" />
                VIEW PRODUCTS
              </PrimaryButton>

              <SecondaryButton onClick={() => navigate("/contact")}>
                <i className="fa-solid fa-phone" />
                CONTACT US
              </SecondaryButton>
            </CTAButtons>
          </CTAContent>
        </CTABanner>
      </ComparisonWrapper>
    </Sidebar>
  );
};

export default Comparison;
