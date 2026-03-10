import { toast } from "react-toastify";
import { useCart } from "../../../context/CartContext";
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
  const { addToCart } = useCart();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star"
          style={{
            color:
              i <= Math.floor(rating) ? "#cc0000" : "rgba(255,255,255,0.2)",
          }}
        />,
      );
    }
    return stars;
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart({
      id: product.id || product._id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
    });
    toast.success("Adding to cart.");
  };

  return (
    <CardContainer $viewMode={viewMode} $index={index} onClick={onClick}>
      {product.badge && <Badge>{product.badge}</Badge>}
      <CardImage $viewMode={viewMode}>
        <img src={product.image} alt={product.name} />
      </CardImage>
      <CardContent $viewMode={viewMode}>
        <CategoryRow>
          <CategoryLabel>{product.category || product.tag}</CategoryLabel>
          <RatingRow>
            {renderStars(product.rating)}
            <span>{product.rating}</span>
          </RatingRow>
        </CategoryRow>
        {product.brand && (
          <div
            style={{
              fontFamily: '"Barlow Condensed", Arial, sans-serif',
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#cc0000",
              letterSpacing: "0.1em",
              marginBottom: "8px",
            }}
          >
            {product.brand}
          </div>
        )}
        <ProductName $viewMode={viewMode}>{product.name}</ProductName>
        <ProductDescription $viewMode={viewMode}>
          {product.description}
        </ProductDescription>
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
          <Price $viewMode={viewMode}>
            {`\u20B9${Number(product.price || 0).toLocaleString()}`}
          </Price>
          <ViewButton
            $viewMode={viewMode}
            onClick={handleAddToCart}
            aria-label="Add to cart"
            title="Add to cart"
          >
            <i className="fa-solid fa-cart-plus arrow-icon" />
          </ViewButton>
        </CardFooter>
      </CardContent>
    </CardContainer>
  );
};

export default ProductCard;
