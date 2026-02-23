import {
  TableWrapper,
  TableHeader,
  Eyebrow,
  Title,
  Subtitle,
  TableContainer,
  Table,
  HeaderRow,
  BrandHeader,
  BrandName,
  BrandOrigin,
  TierBadge,
  FeatureRow,
  FeatureLabel,
  FeatureCell,
  Stars,
  BestForBadge,
} from "./BrandTableStyles";

const BrandTable = ({ type, brands, features, title, titleAccent, subtitle }) => {
  const renderCellValue = (value, key) => {
    if (typeof value === "boolean") {
      return value ? (
        <i className="fa-solid fa-circle-check" style={{ color: "#cc0000", fontSize: "18px" }} />
      ) : (
        <i className="fa-solid fa-circle-xmark" style={{ color: "rgba(255,255,255,0.2)", fontSize: "18px" }} />
      );
    }
    return value;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star"
          style={{ color: i <= rating ? "#cc0000" : "rgba(255,255,255,0.2)" }}
        />
      );
    }
    return <Stars>{stars}</Stars>;
  };

  return (
    <TableWrapper>
      <TableHeader>
        <Eyebrow>{type === "ppf" ? "PAINT PROTECTION FILM" : "CERAMIC COATING"}</Eyebrow>
        <Title>
          {title} <span>{titleAccent}</span>
        </Title>
        <Subtitle>{subtitle}</Subtitle>
      </TableHeader>

      <TableContainer>
        <Table>
          <thead>
            <HeaderRow>
              <th style={{ position: "sticky", left: 0, zIndex: 3 }}>Features</th>
              {brands.map((brand) => (
                <BrandHeader key={brand.id} $highlight={brand.highlight}>
                  <BrandName>{brand.name}</BrandName>
                  <BrandOrigin>{brand.origin}</BrandOrigin>
                  <TierBadge>{brand.tier}</TierBadge>
                </BrandHeader>
              ))}
            </HeaderRow>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <FeatureRow key={feature.key} $index={index}>
                <FeatureLabel>
                  <i className={feature.icon} />
                  {feature.label}
                </FeatureLabel>
                {brands.map((brand) => (
                  <FeatureCell key={brand.id} $highlight={brand.highlight}>
                    {feature.key === "rating"
                      ? renderStars(brand.specs[feature.key])
                      : renderCellValue(brand.specs[feature.key], feature.key)}
                  </FeatureCell>
                ))}
              </FeatureRow>
            ))}
            <FeatureRow $index={features.length}>
              <FeatureLabel>
                <i className="fa-solid fa-car" />
                Best For
              </FeatureLabel>
              {brands.map((brand) => (
                <FeatureCell key={brand.id} $highlight={brand.highlight}>
                  <BestForBadge>{brand.bestFor}</BestForBadge>
                </FeatureCell>
              ))}
            </FeatureRow>
          </tbody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};

export default BrandTable;
