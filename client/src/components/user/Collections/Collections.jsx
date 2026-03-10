import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE } from "../../../config/api";
import { useCart } from "../../../context/CartContext";
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
  const { addToCart } = useCart();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/products?limit=4`);
        setCollections(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleViewAll = () => {
    navigate("/products");
  };

  const handleViewDetails = (_id) => {
    navigate(`/products/${_id}`);
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success("Added to cart!");
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
            key={product._id}
            $delay={CARD_DELAYS[index]}
            onClick={() => handleViewDetails(product._id)}
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
                <CardPrice>₹{product.price}</CardPrice>
                <ViewDetailsBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  <span className="view-details-text">Add to cart</span>
                  <i className="fa-solid fa-cart-plus arrow-icon" />
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
