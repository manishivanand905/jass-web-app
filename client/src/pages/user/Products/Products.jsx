import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE } from "../../../config/api";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import {
  ProductsWrapper,
  HeroSection,
  HeroOverlay,
  HeroContent,
  Eyebrow,
  HeroTitle,
  HeroSubtitle,
  MobileStatsRow,
  MobileStat,
  FilterBar,
  SearchInput,
  MobileFilterSortRow,
  FilterPills,
  FilterPill,
  SortSection,
  SortLabel,
  SortSelect,
  MobileSortBtn,
  MobileSortSheet,
  SortOption,
  ResultsBar,
  ResultsCount,
  ViewToggle,
  ViewButton,
  ProductsGrid,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  ClearButton,
  CTABanner,
  CTAContent,
  CTATitle,
  CTASubtitle,
  CTAButtons,
  SecondaryButton,
} from "./ProductsStyles";
import ProductCard from "../../../components/user/ProductCard/ProductCard";

const SORT_OPTIONS = [
  { value: "featured", label: "Popular" },
  { value: "price-low", label: "Low Price" },
  { value: "price-high", label: "High Price" },
  { value: "rating", label: "Top Rated" },
];

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "PPF", value: "PPF" },
  { label: "Ceramic Coating", value: "Ceramic Coating" },
  { label: "Accessories", value: "Accessories" },
];

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [sortSheetOpen, setSortSheetOpen] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/products`, {
        params: {
          search: searchQuery,
          category: activeFilter,
          limit: 100,
        },
      });

      let filtered = data.products || [];

      if (sortBy === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating") {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      setProducts(filtered);
      setTotalProducts(filtered.length);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeFilter, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveFilter("");
    setSortBy("featured");
  };

  const handleSortSelect = (value) => {
    setSortBy(value);
    setSortSheetOpen(false);
  };

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Sort";

  return (
    <Sidebar type="user">
      <ProductsWrapper>
        {/* Hero Section */}
        <HeroSection>
          <HeroOverlay />
          <HeroContent>
            <Eyebrow>OUR RANGE</Eyebrow>
            <HeroTitle>
              ALL <span>PRODUCTS</span>
            </HeroTitle>
            <HeroSubtitle>
              From professional PPF films to ceramic coatings and detailing
              accessories
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        {/* Mobile Stats */}
        <MobileStatsRow>
          <MobileStat>
            <strong>{totalProducts}</strong>
            <span>Products</span>
          </MobileStat>
          <MobileStat>
            <strong>3</strong>
            <span>Categories</span>
          </MobileStat>
          <MobileStat>
            <strong>4.7★</strong>
            <span>Avg Rating</span>
          </MobileStat>
        </MobileStatsRow>

        {/* Filter Bar */}
        <FilterBar>
          <SearchInput>
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInput>

          {/* Desktop Filters */}
          <FilterPills className="desktop-filters">
            {CATEGORIES.map((cat) => (
              <FilterPill
                key={cat.value}
                $active={activeFilter === cat.value}
                onClick={() => setActiveFilter(cat.value)}
              >
                {cat.label}
              </FilterPill>
            ))}
          </FilterPills>

          {/* Desktop Sort */}
          <SortSection>
            <SortLabel>SORT BY</SortLabel>
            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SortSelect>
          </SortSection>

          {/* Mobile Filters & Sort */}
          <MobileFilterSortRow>
            <FilterPills className="mobile-filters">
              {CATEGORIES.map((cat) => (
                <FilterPill
                  key={cat.value}
                  $active={activeFilter === cat.value}
                  onClick={() => setActiveFilter(cat.value)}
                >
                  {cat.label}
                </FilterPill>
              ))}
            </FilterPills>

            <MobileSortBtn
              className={sortSheetOpen ? "active" : ""}
              onClick={() => setSortSheetOpen((prev) => !prev)}
              aria-label="Sort options"
            >
              <i className="fa-solid fa-arrow-up-wide-short" />
              <span>{activeSortLabel}</span>
            </MobileSortBtn>
          </MobileFilterSortRow>

          {/* Mobile Sort Sheet */}
          <MobileSortSheet $open={sortSheetOpen}>
            {SORT_OPTIONS.map((o) => (
              <SortOption
                key={o.value}
                $active={sortBy === o.value}
                onClick={() => handleSortSelect(o.value)}
              >
                <span>{o.label}</span>
                <i className="fa-solid fa-check" />
              </SortOption>
            ))}
          </MobileSortSheet>
        </FilterBar>

        {/* Results Bar */}
        <ResultsBar>
          <ResultsCount>
            Showing <strong>{products.length}</strong> products
          </ResultsCount>
          <ViewToggle>
            <ViewButton
              $active={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <i className="fa-solid fa-grip" />
            </ViewButton>
            <ViewButton
              $active={viewMode === "list"}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <i className="fa-solid fa-list" />
            </ViewButton>
          </ViewToggle>
        </ResultsBar>

        {/* Products Grid */}
        {loading ? (
          <EmptyState>
            <i className="fa-solid fa-spinner fa-spin"></i>
          </EmptyState>
        ) : products.length > 0 ? (
          <ProductsGrid $viewMode={viewMode}>
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  name: product.name,
                  price: `${product.price.toLocaleString()}`,
                  image: product.image,
                  rating: product.rating || 0,
                  ratingCount: product.ratingCount || 0,
                  badge: product.badge,
                  tag: product.category,
                  description: product.shortDescription,
                }}
                viewMode={viewMode}
                index={index}
                onClick={() => navigate(`/products/${product._id}`)}
              />
            ))}
          </ProductsGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <i className="fa-solid fa-box-open" />
            </EmptyIcon>
            <EmptyTitle>No products found</EmptyTitle>
            <EmptyText>Try adjusting your search or filter</EmptyText>
            <ClearButton onClick={handleClearFilters}>
              Clear Filters
            </ClearButton>
          </EmptyState>
        )}

        <CTABanner>
          <CTAContent>
            <CTATitle>
              READY TO PROTECT <span>YOUR VEHICLE?</span>
            </CTATitle>

            <CTASubtitle>
              Book your service today and experience premium automotive
              protection
            </CTASubtitle>

            <CTAButtons>
              <SecondaryButton onClick={() => navigate("/contact")}>
                <i className="fa-solid fa-phone" />
                CONTACT US
              </SecondaryButton>
            </CTAButtons>
          </CTAContent>
        </CTABanner>
      </ProductsWrapper>
    </Sidebar>
  );
};

export default Products;
