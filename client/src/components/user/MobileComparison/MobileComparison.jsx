import { useNavigate } from "react-router-dom";
import {
  MobileComparisonSection,
  SectionHeader,
  Eyebrow,
  Title,
  Subtitle,
  ComparisonGrid,
  ComparisonCard,
} from "./MobileComparisonStyles";

const MobileComparison = () => {
  const navigate = useNavigate();

  return (
    <MobileComparisonSection>
      <SectionHeader>
        <Eyebrow>Compare & Choose</Eyebrow>
        <Title>
          Brand <span>Comparison</span>
        </Title>
        <Subtitle>
          Compare top PPF & ceramic brands side by side
        </Subtitle>
      </SectionHeader>

      <ComparisonGrid>
        <ComparisonCard onClick={() => navigate("/comparison")}>
          <i className="fa-solid fa-film" />
          <h3>PPF Brands</h3>
          <p>Compare paint protection films</p>
        </ComparisonCard>

        <ComparisonCard onClick={() => navigate("/comparison")}>
          <i className="fa-solid fa-flask" />
          <h3>Ceramic Brands</h3>
          <p>Compare ceramic coatings</p>
        </ComparisonCard>
      </ComparisonGrid>
    </MobileComparisonSection>
  );
};

export default MobileComparison;
