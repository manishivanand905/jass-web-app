import { useState, useRef } from "react";
import { useBookingModal } from "../../../hooks/useNewBookingModal";
import { vehicleTypes } from "../../../data/comparisonData";
import {
  VisualiserWrapper,
  SectionHeader,
  Eyebrow,
  Title,
  Subtitle,
  ProtectionSelector,
  ProtectionCard,
  VehicleTypeSelector,
  VehicleTypeButton,
  UploadPanel,
  UploadZone,
  UploadIcon,
  UploadText,
  UploadSubtext,
  HiddenInput,
  VisualiserPanel,
  SliderContainer,
  ImageHalf,
  SliderHandle,
  Label,
  IntensityControl,
  IntensityLabel,
  IntensitySlider,
  BookingCTA,
  CTACard,
  CTAIcon,
  CTATitle,
  CTAPrice,
  CTAButton,
} from "./VehicleVisualiserStyles";

const VehicleVisualiser = () => {
  const { openModal } = useBookingModal();
  const [protectionType, setProtectionType] = useState("ppf");
  const [vehicleType, setVehicleType] = useState("sedan");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [effectIntensity, setEffectIntensity] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const sliderRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSliderMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <>
      <VisualiserWrapper>
        <SectionHeader>
          <Eyebrow>TRY IT ON YOUR CAR</Eyebrow>
          <Title>
            Vehicle <span>Visualiser</span>
          </Title>
          <Subtitle>
            Upload a photo of your car and see how PPF or ceramic coating would
            look
          </Subtitle>
        </SectionHeader>

        <ProtectionSelector>
          <ProtectionCard
            $active={protectionType === "ppf"}
            onClick={() => setProtectionType("ppf")}
          >
            <i className="fa-solid fa-film" />
            <h3>PPF PROTECTION</h3>
            <p>Self-healing film</p>
          </ProtectionCard>
          <ProtectionCard
            $active={protectionType === "ceramic"}
            onClick={() => setProtectionType("ceramic")}
          >
            <i className="fa-solid fa-flask" />
            <h3>CERAMIC COATING</h3>
            <p>Deep gloss shield</p>
          </ProtectionCard>
        </ProtectionSelector>

        <VehicleTypeSelector>
          {vehicleTypes.map((type) => (
            <VehicleTypeButton
              key={type.id}
              $active={vehicleType === type.id}
              onClick={() => setVehicleType(type.id)}
            >
              <i className={type.icon} />
              {type.label}
            </VehicleTypeButton>
          ))}
        </VehicleTypeSelector>

        {!uploadedImage ? (
          <UploadPanel>
            <UploadZone onClick={() => fileInputRef.current?.click()}>
              <UploadIcon>
                <i className="fa-solid fa-cloud-arrow-up" />
              </UploadIcon>
              <UploadText>Drop your car photo here</UploadText>
              <UploadSubtext>
                or click to browse — JPG, PNG up to 10MB
              </UploadSubtext>
              <HiddenInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </UploadZone>
          </UploadPanel>
        ) : (
          <VisualiserPanel>
            <SliderContainer
              ref={sliderRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleSliderMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              <ImageHalf $position={sliderPosition} $side="before">
                <img src={uploadedImage} alt="Before" />
                <Label $side="before">BEFORE</Label>
              </ImageHalf>
              <ImageHalf
                $position={sliderPosition}
                $side="after"
                $type={protectionType}
                $intensity={effectIntensity}
              >
                <img src={uploadedImage} alt="After" />
                <Label $side="after">AFTER</Label>
              </ImageHalf>
              <SliderHandle $position={sliderPosition}>
                <i className="fa-solid fa-arrows-left-right" />
              </SliderHandle>
            </SliderContainer>

            <IntensityControl>
              <IntensityLabel>EFFECT INTENSITY</IntensityLabel>
              <IntensitySlider
                type="range"
                min="0"
                max="100"
                value={effectIntensity}
                onChange={(e) => setEffectIntensity(e.target.value)}
              />
            </IntensityControl>
          </VisualiserPanel>
        )}

        <BookingCTA>
          <CTACard onClick={openModal}>
            <CTAIcon>
              <i className="fa-solid fa-film" />
            </CTAIcon>
            <CTATitle>BOOK PPF SERVICE</CTATitle>
            <CTAPrice>From ₹8,999</CTAPrice>
            <CTAButton>BOOK NOW →</CTAButton>
          </CTACard>
          <CTACard onClick={openModal}>
            <CTAIcon>
              <i className="fa-solid fa-flask" />
            </CTAIcon>
            <CTATitle>BOOK CERAMIC SERVICE</CTATitle>
            <CTAPrice>From ₹2,999</CTAPrice>
            <CTAButton>BOOK NOW →</CTAButton>
          </CTACard>
        </BookingCTA>
      </VisualiserWrapper>
    </>
  );
};

export default VehicleVisualiser;
