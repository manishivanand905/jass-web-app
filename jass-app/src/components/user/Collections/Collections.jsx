import React from "react";
import { useNavigate } from "react-router-dom";
import { collections } from "../../../data/productsData";
import {
  SectionWrapper,
  SectionHeader,
  SectionEyebrow,
  SectionTitle,
  ProductsGrid,
  ProductCard,
  CardImageWrapper,
  BadgePill,
  CardBody,
  CardCategory,
  CardName,
  CardDescription,
  CardFooter,
  CardPrice,
  ViewDetailsBtn,
  ViewAllWrapper,
  ViewAllButton,
} from "./CollectionsStyles";

// Animation delays for staggered card entrance
const CARD_DELAYS = ["0.1s", "0.2s", "0.3s", "0.4s"];

const Collections = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/products");
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <SectionWrapper>
      {/* Header */}
      <SectionHeader>
        <SectionEyebrow>Our Collection</SectionEyebrow>
        <SectionTitle>
          Featured <span>Products</span>
        </SectionTitle>
      </SectionHeader>

      {/* 4-column product grid */}
      <ProductsGrid>
        {collections.map((product, index) => (
          <ProductCard
            key={product.id}
            $delay={CARD_DELAYS[index]}
            onClick={() => handleViewDetails(product.id)}
          >
            {/* Image */}
            <CardImageWrapper>
              <img src={product.image} alt={product.name} loading="lazy" />
              {product.badge && <BadgePill>{product.badge}</BadgePill>}
            </CardImageWrapper>

            {/* Body */}
            <CardBody>
              <CardCategory>{product.category}</CardCategory>
              <CardName>{product.name}</CardName>
              <CardDescription>{product.description}</CardDescription>

              <CardFooter>
                <CardPrice>{product.price}</CardPrice>
                <ViewDetailsBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(product.id);
                  }}
                >
                  <span className="view-details-text">View Details</span>
                  <i className="fa-solid fa-arrow-right arrow-icon" />
                </ViewDetailsBtn>
              </CardFooter>
            </CardBody>
          </ProductCard>
        ))}
      </ProductsGrid>

      {/* View All CTA */}
      <ViewAllWrapper>
        <ViewAllButton onClick={handleViewAll}>
          <span>View All Products</span>
          <i className="fa-solid fa-arrow-right" />
        </ViewAllButton>
      </ViewAllWrapper>
    </SectionWrapper>
  );
};

export default Collections;
