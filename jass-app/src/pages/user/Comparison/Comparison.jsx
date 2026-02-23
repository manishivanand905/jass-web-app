import { useState } from "react";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import BrandTable from "../../../components/user/BrandTable/BrandTable";
import VehicleVisualiser from "../../../components/user/VehicleVisualiser/VehicleVisualiser";
import { ppfBrands, ceramicBrands, ppfFeatures, ceramicFeatures } from "../../../data/comparisonData";
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
  TableSection,
} from "./ComparisonStyles";

const Comparison = () => {
  const [activeTab, setActiveTab] = useState("ppf");

  return (
    <Sidebar type="user">
      <ComparisonWrapper>
        <HeroSection>
          <HeroOverlay />
          <HeroContent>
            <Eyebrow>SIDE BY SIDE</Eyebrow>
            <HeroTitle>
              COMPARE <span>& CHOOSE</span>
            </HeroTitle>
            <HeroSubtitle>
              Compare PPF brands and ceramic coating brands. Visualise protection on your own vehicle
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <TabSwitcher>
          <TabButton $active={activeTab === "ppf"} onClick={() => setActiveTab("ppf")}>
            <i className="fa-solid fa-film" />
            PPF BRANDS
          </TabButton>
          <TabButton $active={activeTab === "ceramic"} onClick={() => setActiveTab("ceramic")}>
            <i className="fa-solid fa-flask" />
            CERAMIC BRANDS
          </TabButton>
        </TabSwitcher>

        <TableSection $active={activeTab === "ppf"}>
          <BrandTable
            type="ppf"
            brands={ppfBrands}
            features={ppfFeatures}
            title="PPF Brand"
            titleAccent="Comparison"
            subtitle="Compare the top PPF brands by performance, durability and value"
          />
        </TableSection>

        <TableSection $active={activeTab === "ceramic"}>
          <BrandTable
            type="ceramic"
            brands={ceramicBrands}
            features={ceramicFeatures}
            title="Ceramic Coating"
            titleAccent="Comparison"
            subtitle="Compare the top ceramic coating brands by hardness, durability and finish"
          />
        </TableSection>

        <VehicleVisualiser />
      </ComparisonWrapper>
      <Footer />
    </Sidebar>
  );
};

export default Comparison;
