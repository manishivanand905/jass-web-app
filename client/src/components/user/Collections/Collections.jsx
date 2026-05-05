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
  ScrollTrack,
  ScrollInner,
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

const Collections = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/products?limit=100`);
        setCollections(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
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
    toast.success("Adding to cart.");
  };

  const loopItems = [...collections, ...collections];

  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionEyebrow>Our Collection</SectionEyebrow>
        <SectionTitle>
          Featured <span>Products</span>
        </SectionTitle>
      </SectionHeader>

      <ScrollTrack>
        <ScrollInner>
          {loopItems.map((product, index) => (
            <ProductCard
              key={`${product._id}-${index}`}
              onClick={() => handleViewDetails(product._id)}
            >
              <CardImageWrapper>
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.badge && <BadgePill>{product.badge}</BadgePill>}
              </CardImageWrapper>

              <CardBody>
                <CardCategory>{product.category}</CardCategory>
                <CardName>{product.name}</CardName>
                <CardDescription>{product.description}</CardDescription>

                <CardFooter>
                  <CardPrice>
                    {`\u20B9${Number(product.price || 0).toLocaleString()}`}
                  </CardPrice>
                  <ViewDetailsBtn
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddToCart(product);
                    }}
                    aria-label="Add to cart"
                    title="Add to cart"
                  >
                    Add to Cart
                    <i className="fa-solid fa-cart-plus arrow-icon" />
                  </ViewDetailsBtn>
                </CardFooter>
              </CardBody>
            </ProductCard>
          ))}
        </ScrollInner>
      </ScrollTrack>

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
