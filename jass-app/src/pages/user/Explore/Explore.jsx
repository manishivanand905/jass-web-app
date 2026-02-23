import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import { heroProducts } from "../../../data/productsData";
import {
  ExploreWrapper,
  HeroSection,
  HeroOverlay,
  HeroContent,
  Eyebrow,
  HeroTitle,
  HeroSubtitle,
  FilterBar,
  FilterLeft,
  FilterPill,
  FilterRight,
  SortLabel,
  SortSelect,
  ResultsCount,
  ProductsGrid,
  ProductCard,
  ProductImage,
  Badge,
  ProductInfo,
  Category,
  ProductName,
  RatingRow,
  Stars,
  RatingCount,
  Description,
  ProductFooter,
  Price,
  ViewButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  ViewAllButton,
} from "./ExploreStyles";

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const navigate = useNavigate();

  const filters = ["All", "PPF", "Ceramic", "Accessory"];

  // Filter products
  let filteredProducts = heroProducts;
  if (activeFilter !== "All") {
    filteredProducts = heroProducts.filter((p) => p.tag === activeFilter);
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low–High") {
      return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""));
    }
    if (sortBy === "Price: High–Low") {
      return parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""));
    }
    if (sortBy === "Rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star ${i < Math.floor(rating) ? "filled" : ""}`}
      />
    ));
  };

  return (
    <Sidebar>
      <ExploreWrapper>
        <HeroSection>
          <HeroOverlay />
          <HeroContent>
            <Eyebrow>OUR COLLECTION</Eyebrow>
            <HeroTitle>
              EXPLORE <span>PRODUCTS</span>
            </HeroTitle>
            <HeroSubtitle>
              Browse our full range of PPF films, ceramic coatings and accessories
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <FilterBar>
          <FilterLeft>
            {filters.map((filter) => (
              <FilterPill
                key={filter}
                $active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterPill>
            ))}
          </FilterLeft>
          <FilterRight>
            <SortLabel>SORT BY</SortLabel>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option>Featured</option>
              <option>Price: Low–High</option>
              <option>Price: High–Low</option>
              <option>Rating</option>
            </SortSelect>
          </FilterRight>
        </FilterBar>

        <ResultsCount>Showing {sortedProducts.length} products</ResultsCount>

        {sortedProducts.length > 0 ? (
          <ProductsGrid>
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                $delay={index * 0.1}
                onClick={() => navigate(`/collections/${product.id}`)}
              >
                <ProductImage>
                  <img src={product.image} alt={product.name} />
                  {product.badge && <Badge>{product.badge}</Badge>}
                </ProductImage>
                <ProductInfo>
                  <Category>{product.category}</Category>
                  <ProductName>{product.name}</ProductName>
                  <RatingRow>
                    <Stars>{renderStars(product.rating)}</Stars>
                    <RatingCount>({product.rating} rating)</RatingCount>
                  </RatingRow>
                  <Description>{product.description}</Description>
                  <ProductFooter>
                    <Price>{product.price}</Price>
                    <ViewButton>
                      View Details <i className="fa-solid fa-arrow-right" />
                    </ViewButton>
                  </ProductFooter>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <i className="fa-solid fa-box-open" />
            </EmptyIcon>
            <EmptyTitle>No products found</EmptyTitle>
            <EmptyText>Try a different filter</EmptyText>
            <ViewAllButton onClick={() => setActiveFilter("All")}>
              View All
            </ViewAllButton>
          </EmptyState>
        )}
      </ExploreWrapper>
      <Footer />
    </Sidebar>
  );
};

export default Explore;
