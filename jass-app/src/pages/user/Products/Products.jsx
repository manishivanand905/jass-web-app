import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import { heroProducts } from "../../../data/productsData";
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
} from "./ProductsStyles";
import ProductCard from "../../../components/user/ProductCard/ProductCard";

const SORT_OPTIONS = [
  { value: "featured", label: "Popular" },
  { value: "price-low", label: "Low Price" },
  { value: "price-high", label: "High Price" },
  { value: "rating", label: "Top Rated" },
];

const Products = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [sortSheetOpen, setSortSheetOpen] = useState(false);

  // ─── Filter + Sort Logic ────────────────────────────────────────────────────
  const filterProducts = () => {
    let filtered = [...heroProducts];

    if (activeFilter !== "All") {
      const filterMap = {
        "PPF": "PPF",
        "Ceramic": "Ceramic", 
        "Tools": "Accessory"
      };
      filtered = filtered.filter((p) => p.tag === filterMap[activeFilter]);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortBy === "price-low") {
      filtered.sort(
        (a, b) =>
          parseInt(a.price.replace(/[^0-9]/g, "")) -
          parseInt(b.price.replace(/[^0-9]/g, "")),
      );
    } else if (sortBy === "price-high") {
      filtered.sort(
        (a, b) =>
          parseInt(b.price.replace(/[^0-9]/g, "")) -
          parseInt(a.price.replace(/[^0-9]/g, "")),
      );
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const filteredProducts = filterProducts();

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
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
        {/* ── Hero ── */}
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

        {/* ── MOBILE ONLY: Stats strip below hero ── */}
        <MobileStatsRow>
          <MobileStat>
            <strong>{heroProducts.length}</strong>
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

        {/* ── Filter Bar ── */}
        <FilterBar>
          {/* Search — all breakpoints */}
          <SearchInput>
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInput>

          {/* Desktop + Tablet: pills inline */}
          <FilterPills className="desktop-filters">
            {["All", "PPF", "Ceramic", "Tools"].map((filter) => (
              <FilterPill
                key={filter}
                $active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterPill>
            ))}
          </FilterPills>

          {/* Desktop + Tablet: native select */}
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

          {/* MOBILE: filter chips + sort icon in one row */}
          <MobileFilterSortRow>
            <FilterPills className="mobile-filters">
              {["All", "PPF", "Ceramic", "Tools"].map((filter) => (
                <FilterPill
                  key={filter}
                  $active={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </FilterPill>
              ))}
            </FilterPills>

            {/* Sort icon button — opens dropdown sheet */}
            <MobileSortBtn
              className={sortSheetOpen ? "active" : ""}
              onClick={() => setSortSheetOpen((prev) => !prev)}
              aria-label="Sort options"
            >
              <i className="fa-solid fa-arrow-up-wide-short" />
              <span>{activeSortLabel.split(":")[0]}</span>
            </MobileSortBtn>
          </MobileFilterSortRow>

          {/* MOBILE: Sort dropdown sheet */}
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

        {/* ── Results Bar ── */}
        <ResultsBar>
          <ResultsCount>
            Showing <strong>{filteredProducts.length}</strong> products
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

        {/* ── Products Grid / List ── */}
        {filteredProducts.length > 0 ? (
          <ProductsGrid $viewMode={viewMode}>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                index={index}
                onClick={() => navigate(`/products/${product.id}`)}
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
      </ProductsWrapper>
      <Footer />
    </Sidebar>
  );
};

export default Products;
