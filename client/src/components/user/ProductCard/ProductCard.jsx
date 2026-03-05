import {
  CardContainer,
  CardImage,
  Badge,
  CardContent,
  CategoryRow,
  CategoryLabel,
  RatingRow,
  ProductName,
  ProductDescription,
  SpecsPreview,
  SpecPill,
  CardFooter,
  Price,
  ViewButton,
} from "./ProductCardStyles";

const ProductCard = ({ product, viewMode, index, onClick }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-solid fa-star`}
          style={{ color: i <= Math.floor(rating) ? "#cc0000" : "rgba(255,255,255,0.2)" }}
        />
      );
    }
    return stars;
  };

  return (
    <CardContainer $viewMode={viewMode} $index={index} onClick={onClick}>
      {product.badge && <Badge>{product.badge}</Badge>}
      <CardImage $viewMode={viewMode}>
        <img src={product.image} alt={product.name} />
      </CardImage>
      <CardContent $viewMode={viewMode}>
        <CategoryRow>
          <CategoryLabel>{product.category}</CategoryLabel>
          <RatingRow>
            {renderStars(product.rating)}
            <span>{product.rating}</span>
          </RatingRow>
        </CategoryRow>
        {product.brand && (
          <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#cc0000', letterSpacing: '0.1em', marginBottom: '8px' }}>
            {product.brand}
          </div>
        )}
        <ProductName $viewMode={viewMode}>{product.name}</ProductName>
        <ProductDescription $viewMode={viewMode}>{product.description}</ProductDescription>
        {viewMode === "list" && product.specifications && (
          <SpecsPreview>
            {product.specifications.slice(0, 2).map((spec, i) => (
              <SpecPill key={i}>
                {spec.label}: {spec.value}
              </SpecPill>
            ))}
          </SpecsPreview>
        )}
        <CardFooter>
          <Price $viewMode={viewMode}>₹{product.price?.toLocaleString()}</Price>
          <ViewButton $viewMode={viewMode}>VIEW DETAILS →</ViewButton>
        </CardFooter>
      </CardContent>
    </CardContainer>
  );
};

export default ProductCard;
