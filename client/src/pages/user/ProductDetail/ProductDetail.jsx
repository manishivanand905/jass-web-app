import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import { useCart } from "../../../context/CartContext";
import { showToast } from "../../../components/common/Toast/toastConfig";
import { heroProducts } from "../../../data/productsData";
import {
  DetailWrapper,
  DetailContainer,
  ImagePanel,
  MainImage,
  ImageBadge,
  ThumbnailStrip,
  Thumbnail,
  ZoomHint,
  DetailsPanel,
  Breadcrumb,
  CategoryLabel,
  ProductName,
  RatingRow,
  Price,
  Description,
  Divider,
  SectionLabel,
  SpecsGrid,
  SpecPill,
  FeaturesGrid,
  FeatureItem,
  ActionRow,
  BookButton,
  BackButton,
} from "./ProductDetailStyles";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = heroProducts.find((p) => p.id === parseInt(id));
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    showToast.success('Added to cart!');
  };

  if (!product) {
    return (
      <Sidebar type="user">
        <DetailWrapper>
          <div style={{ padding: "100px 20px", textAlign: "center", color: "white" }}>
            <h2>Product not found</h2>
            <button onClick={() => navigate("/products")}>Back to Products</button>
          </div>
        </DetailWrapper>
        <Footer />
      </Sidebar>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star"
          style={{ color: i <= Math.floor(rating) ? "#cc0000" : "rgba(255,255,255,0.2)" }}
        />
      );
    }
    return stars;
  };

  return (
    <Sidebar type="user">
      <DetailWrapper>
        <DetailContainer>
          <ImagePanel>
            {product.badge && <ImageBadge>{product.badge}</ImageBadge>}
            <MainImage>
              <img src={product.image} alt={product.name} />
            </MainImage>
            <ThumbnailStrip>
              {[0, 1, 2].map((index) => (
                <Thumbnail
                  key={index}
                  $active={activeImage === index}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={product.image} alt={`${product.name} ${index + 1}`} />
                </Thumbnail>
              ))}
            </ThumbnailStrip>
            <ZoomHint>
              <i className="fa-solid fa-magnifying-glass-plus" />
              Hover to zoom
            </ZoomHint>
          </ImagePanel>

          <DetailsPanel>
            <Breadcrumb>
              <span onClick={() => navigate("/products")}>Products</span>
              <i className="fa-solid fa-chevron-right" />
              <span style={{ color: "#cc0000" }}>{product.category}</span>
              <i className="fa-solid fa-chevron-right" />
              <span>{product.name}</span>
            </Breadcrumb>

            <CategoryLabel>{product.category.toUpperCase()}</CategoryLabel>
            {product.brand && (
              <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#cc0000', letterSpacing: '0.15em', marginBottom: '12px' }}>
                BRAND: {product.brand}
              </div>
            )}
            <ProductName>{product.name}</ProductName>

            <RatingRow>
              {renderStars(product.rating)}
              <span>({product.rating} rating)</span>
              <span className="count">{product.ratingCount} reviews</span>
            </RatingRow>

            <Price>₹{product.price?.toLocaleString()}</Price>
            {!product.availability && (
              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(244,67,54,0.15)', border: '1px solid rgba(244,67,54,0.3)', borderRadius: '4px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#f44336', letterSpacing: '0.1em', marginBottom: '16px' }}>
                OUT OF STOCK
              </div>
            )}
            {product.availability && product.stock && product.stock < 10 && (
              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,193,7,0.15)', border: '1px solid rgba(255,193,7,0.3)', borderRadius: '4px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#ffc107', letterSpacing: '0.1em', marginBottom: '16px' }}>
                ONLY {product.stock} LEFT
              </div>
            )}

            <Description>{product.fullDescription}</Description>

            <Divider />

            {(product.durability || product.warranty) && (
              <>
                <SectionLabel>WARRANTY & DURABILITY</SectionLabel>
                <div style={{ marginBottom: '24px' }}>
                  {product.durability && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <i className="fa-solid fa-clock" style={{ color: '#cc0000', fontSize: '1.2rem' }} />
                      <div>
                        <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Durability</div>
                        <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: '1rem', color: 'white' }}>{product.durability} {product.durability === 1 ? 'Year' : 'Years'}</div>
                      </div>
                    </div>
                  )}
                  {product.warranty && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className="fa-solid fa-shield-halved" style={{ color: '#cc0000', fontSize: '1.2rem' }} />
                      <div>
                        <div style={{ fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Warranty</div>
                        <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: '1rem', color: 'white' }}>{product.warranty}</div>
                      </div>
                    </div>
                  )}
                </div>
                <Divider />
              </>
            )}

            <SectionLabel>SPECIFICATIONS</SectionLabel>
            <SpecsGrid>
              {product.specifications.map((spec, index) => (
                <SpecPill key={index}>
                  <span className="label">{spec.label}:</span>
                  <span className="value">{spec.value}</span>
                </SpecPill>
              ))}
            </SpecsGrid>

            <Divider />

            <SectionLabel>FEATURES</SectionLabel>
            <FeaturesGrid>
              {product.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <i className="fa-solid fa-shield-halved" />
                  <span>{feature}</span>
                </FeatureItem>
              ))}
            </FeaturesGrid>

            <Divider />

            <ActionRow>
              <BookButton onClick={handleAddToCart} disabled={!product.availability}>
                <i className="fa-solid fa-cart-plus" />
                {product.availability ? 'ADD TO CART' : 'OUT OF STOCK'}
              </BookButton>
              <BackButton onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left" />
                BACK
              </BackButton>
            </ActionRow>
          </DetailsPanel>
        </DetailContainer>
      </DetailWrapper>
      <Footer />
    </Sidebar>
  );
};

export default ProductDetail;
