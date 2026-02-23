import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import { useBookingModal } from "../../../hooks/useNewBookingModal";
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
  const { openModal } = useBookingModal();

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
            <ProductName>{product.name}</ProductName>

            <RatingRow>
              {renderStars(product.rating)}
              <span>({product.rating} rating)</span>
              <span className="count">{product.ratingCount} reviews</span>
            </RatingRow>

            <Price>{product.price}</Price>

            <Description>{product.fullDescription}</Description>

            <Divider />

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
              <BookButton onClick={() => openModal({ type: 'ppf', tier: 'full' })}>
                <i className="fa-solid fa-calendar-check" />
                BOOK NOW
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
