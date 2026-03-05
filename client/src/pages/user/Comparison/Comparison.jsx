import { useState, useRef, useEffect } from "react";
import Sidebar from "../../../components/common/Sidebar/Sidebar";
import Footer from "../../../components/common/Footer/Footer";
import { toast } from "react-toastify";
import {
  ppfBrands,
  ceramicBrands,
  ppfFeatures,
  ceramicFeatures,
  ppfFinishes,
} from "../../../data/comparisonData";
import {
  ComparisonWrapper,
  HeroSection,
  HeroOverlay,
  HeroContent,
  Eyebrow,
  HeroTitle,
  HeroSubtitle,
  TabSwitcher,
  TabButton,
  SectionHeader,
  SectionTitle,
  TableWrapper,
  ComparisonTable,
  TableHeader,
  BrandColumn,
  BrandName,
  BrandOrigin,
  TierBadge,
  TableBody,
  FeatureRow,
  FeatureLabel,
  FeatureIcon,
  FeatureCell,
  BestForBadge,
  SectionDivider,
  // Visualiser
  VisualiserSection,
  VisualiserHeader,
  VisualHeader,
  VisualTitle,
  PoweredBadge,
  UploadArea,
  UploadBox,
  UploadIcon,
  UploadText,
  UploadSubText,
  BrowseBtn,
  HiddenInput,
  TipStrip,
  TipPill,
  DemoSection,
  DemoLabel,
  DemoGrid,
  DemoCard,
  ImagePreviewWrap,
  PreviewImg,
  ChangePhotoBtn,
  SwatchSection,
  SwatchLabel,
  SwatchGrid,
  SwatchCard,
  SwatchCircle,
  SwatchCheckBadge,
  SwatchName,
  SwatchBadge,
  GenerateBtn,
  SliderSection,
  ComparisonGrid,
  ImageCard,
  ImageLabel,
  ComparisonImage,
  ActionRow,
  ActionBtn,
  CSSDisclaimer,
} from "./ComparisonStyles";

// ─── Demo car images (royalty-free) ──────────────────────────────────────────
const DEMO_CARS = [
  {
    id: "sedan",
    label: "Sedan",
    icon: "fa-solid fa-car",
    url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80",
  },
  {
    id: "suv",
    label: "SUV",
    icon: "fa-solid fa-truck-monster",
    url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=80",
  },
  {
    id: "hatchback",
    label: "Hatchback",
    icon: "fa-solid fa-car-side",
    url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=80",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "fa-solid fa-gauge-high",
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80",
  },
];

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Comparison = () => {
  useScrollReveal();

  // ── Tab
  const [activeTab, setActiveTab] = useState("ppf");

  // ── Upload
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // ── Finish selection
  const [selectedFinish, setSelectedFinish] = useState(null);

  // ── Preview mode: "css"
  const [previewMode, setPreviewMode] = useState("css");

  // ── AI result
  const [aiResult, setAiResult] = useState(null);

  const activeImage =
    uploadedImage ||
    (selectedDemo ? DEMO_CARS.find((d) => d.id === selectedDemo)?.url : null);
  const canGenerate = !!activeImage && !!selectedFinish;
  const showResult =
    !!aiResult || (!!activeImage && !!selectedFinish && previewMode === "css");
  const finishObj = ppfFinishes.find((f) => f.id === selectedFinish);

  // ── Image Upload ─────────────────────────────────────────────────────────────
  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      setSelectedDemo(null);
      setAiResult(null);
      toast.success("Image uploaded!");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => processFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleDemoSelect = (demoId) => {
    setSelectedDemo(demoId);
    setUploadedImage(null);
    setAiResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setSelectedDemo(null);
    setAiResult(null);
    setSelectedFinish(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };



  // ── Cell renderer ─────────────────────────────────────────────────────────
  const renderCell = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <i className="fa-solid fa-circle-check" style={{ color: "#cc0000" }} />
      ) : (
        <i
          className="fa-solid fa-circle-xmark"
          style={{ color: "rgba(255,255,255,0.18)" }}
        />
      );
    }
    return value;
  };

  const brands = activeTab === "ppf" ? ppfBrands : ceramicBrands;
  const features = activeTab === "ppf" ? ppfFeatures : ceramicFeatures;

  return (
    <Sidebar type="user">
      <ComparisonWrapper>
        {/* ── Hero ── */}
        <HeroSection>
          <HeroOverlay />
          <HeroContent>
            <Eyebrow>Side by Side</Eyebrow>
            <HeroTitle>
              COMPARE <span>&amp; CHOOSE</span>
            </HeroTitle>
            <HeroSubtitle>
              Compare PPF &amp; ceramic brands side by side — then visualise any
              finish on your own car.
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        {/* ── Tab Switcher ── */}
        <TabSwitcher>
          <TabButton
            $active={activeTab === "ppf"}
            onClick={() => setActiveTab("ppf")}
          >
            <i className="fa-solid fa-film" /> PPF Brands
          </TabButton>
          <TabButton
            $active={activeTab === "ceramic"}
            onClick={() => setActiveTab("ceramic")}
          >
            <i className="fa-solid fa-flask" /> Ceramic Brands
          </TabButton>
        </TabSwitcher>

        {/* ── PPF Visualiser (PPF tab only) ── */}
        {activeTab === "ppf" && (
          <>
            <VisualiserSection data-reveal>
              {/* Header */}
              <VisualiserHeader>
                <VisualHeader>
                  <Eyebrow>PPF Colour Visualiser</Eyebrow>
                  <VisualTitle>
                    See how it <span>looks on your car</span>
                  </VisualTitle>
                  <HeroSubtitle>
                    Upload your car photo and preview any PPF finish using AI
                  </HeroSubtitle>
                </VisualHeader>
                <PoweredBadge>
                  <i className="fa-solid fa-eye" />
                  <span>Instant CSS Preview</span>
                </PoweredBadge>
              </VisualiserHeader>

              {/* STEP 1 — Upload or Demo */}
              {!activeImage ? (
                <>
                  <UploadArea>
                    <UploadBox
                      $dragging={isDragging}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadIcon
                        className="fa-solid fa-cloud-arrow-up"
                        $dragging={isDragging}
                      />
                      <UploadText>Drop your car photo here</UploadText>
                      <UploadSubText>or</UploadSubText>
                      <BrowseBtn>
                        <i className="fa-solid fa-folder-open" />
                        Browse Files
                      </BrowseBtn>
                      <HiddenInput
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </UploadBox>

                    <TipStrip>
                      <TipPill $good>
                        <i className="fa-solid fa-check" />
                        <span>Side profile angle</span>
                      </TipPill>
                      <TipPill $good>
                        <i className="fa-solid fa-check" />
                        <span>Good lighting</span>
                      </TipPill>
                      <TipPill>
                        <i className="fa-solid fa-xmark" />
                        <span>Avoid dark/blurry photos</span>
                      </TipPill>
                    </TipStrip>
                  </UploadArea>

                  <DemoSection>
                    <DemoLabel>— or choose a demo car —</DemoLabel>
                    <DemoGrid>
                      {DEMO_CARS.map((car) => (
                        <DemoCard
                          key={car.id}
                          $selected={selectedDemo === car.id}
                          onClick={() => handleDemoSelect(car.id)}
                        >
                          <i className={car.icon} />
                          <span>{car.label}</span>
                        </DemoCard>
                      ))}
                    </DemoGrid>
                  </DemoSection>
                </>
              ) : (
                /* Image preview */
                <ImagePreviewWrap>
                  <PreviewImg src={activeImage} alt="Your car" />
                  <ChangePhotoBtn onClick={handleClearImage}>
                    <i className="fa-solid fa-rotate" />
                    Change Photo
                  </ChangePhotoBtn>
                </ImagePreviewWrap>
              )}

              {/* STEP 2 — Finish Swatches */}
              <SwatchSection>
                <SwatchLabel>Choose your PPF finish</SwatchLabel>
                <SwatchGrid>
                  {ppfFinishes.map((finish) => {
                    const isSel = selectedFinish === finish.id;
                    return (
                      <SwatchCard
                        key={finish.id}
                        onClick={() => {
                          setSelectedFinish(finish.id);
                          setAiResult(null);
                        }}
                        title={finish.name}
                      >
                        {finish.badge && (
                          <SwatchBadge>{finish.badge}</SwatchBadge>
                        )}
                        <SwatchCircle
                          $style={finish.swatchStyle}
                          $selected={isSel}
                        >
                          {isSel && (
                            <SwatchCheckBadge>
                              <i className="fa-solid fa-check" />
                            </SwatchCheckBadge>
                          )}
                        </SwatchCircle>
                        <SwatchName $selected={isSel}>{finish.name}</SwatchName>
                      </SwatchCard>
                    );
                  })}
                </SwatchGrid>
              </SwatchSection>

              {/* STEP 3 — Generate CSS Preview */}
              {!showResult && (
                <GenerateBtn
                  $disabled={!canGenerate}
                  disabled={!canGenerate}
                  onClick={() => {
                    if (canGenerate) {
                      setPreviewMode("css");
                    }
                  }}
                >
                  <div className="btn-main">
                    <i className="fa-solid fa-eye" />
                    {canGenerate
                      ? `Preview ${finishObj?.name} — Instant CSS Preview`
                      : "Upload a photo & select a finish first"}
                  </div>
                  {canGenerate && (
                    <div className="btn-sub">
                      Instant preview using CSS filters
                    </div>
                  )}
                </GenerateBtn>
              )}

              {/* STEP 4 — Before / After Side by Side */}
              {showResult && (
                <SliderSection>
                  <ComparisonGrid>
                    <ImageCard>
                      <ImageLabel>
                        <span>BEFORE</span>
                      </ImageLabel>
                      <ComparisonImage src={activeImage} alt="Before" />
                    </ImageCard>
                    
                    <ImageCard>
                      <ImageLabel $after>
                        <span>AFTER — {finishObj?.name}</span>
                      </ImageLabel>
                      <ComparisonImage 
                        src={activeImage} 
                        alt="After" 
                        $filter={finishObj?.cssFilter}
                      />
                    </ImageCard>
                  </ComparisonGrid>

                  <CSSDisclaimer>
                    Simulated colour preview using CSS filters
                  </CSSDisclaimer>

                  <ActionRow style={{ marginTop: "16px" }}>
                    <ActionBtn
                      onClick={() => {
                        setAiResult(null);
                        setSelectedFinish(null);
                      }}
                    >
                      <i className="fa-solid fa-palette" />
                      Try Another Finish
                    </ActionBtn>
                    <ActionBtn onClick={handleClearImage}>
                      <i className="fa-solid fa-rotate" />
                      Change Car
                    </ActionBtn>
                  </ActionRow>
                </SliderSection>
              )}
            </VisualiserSection>

            <SectionDivider>
              <span>Brand Comparison</span>
            </SectionDivider>
          </>
        )}

        {/* ── Brand Comparison Table ── */}
        <SectionHeader data-reveal>
          <Eyebrow>
            {activeTab === "ppf" ? "Paint Protection Film" : "Ceramic Coating"}
          </Eyebrow>
          <SectionTitle>
            {activeTab === "ppf" ? "PPF Brand" : "Ceramic Brand"}{" "}
            <span>Comparison</span>
          </SectionTitle>
          <HeroSubtitle>
            Compare the top {activeTab === "ppf" ? "PPF" : "ceramic"} brands by
            performance, durability and value
          </HeroSubtitle>
        </SectionHeader>

        <TableWrapper data-reveal>
          <ComparisonTable>
            <TableHeader>
              <tr>
                <th>Feature</th>
                {brands.map((brand) => (
                  <BrandColumn key={brand.id} $highlight={brand.highlight}>
                    <BrandName>{brand.name}</BrandName>
                    <BrandOrigin>{brand.origin}</BrandOrigin>
                    <TierBadge>{brand.tier}</TierBadge>
                  </BrandColumn>
                ))}
              </tr>
            </TableHeader>

            <TableBody>
              {features.map((feat) => (
                <FeatureRow key={feat.key}>
                  <FeatureLabel>
                    <FeatureIcon className={feat.icon} />
                    {feat.label}
                  </FeatureLabel>
                  {brands.map((brand) => (
                    <FeatureCell key={brand.id} $highlight={brand.highlight}>
                      {renderCell(brand.specs[feat.key])}
                    </FeatureCell>
                  ))}
                </FeatureRow>
              ))}
              <FeatureRow>
                <FeatureLabel>
                  <FeatureIcon className="fa-solid fa-car" />
                  Best For
                </FeatureLabel>
                {brands.map((brand) => (
                  <FeatureCell key={brand.id} $highlight={brand.highlight}>
                    <BestForBadge>{brand.bestFor}</BestForBadge>
                  </FeatureCell>
                ))}
              </FeatureRow>
            </TableBody>
          </ComparisonTable>
        </TableWrapper>
      </ComparisonWrapper>
      <Footer />
    </Sidebar>
  );
};

export default Comparison;
