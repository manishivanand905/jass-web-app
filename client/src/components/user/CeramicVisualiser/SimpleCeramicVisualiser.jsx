import { useState, useRef } from 'react';
import { showToast } from '../../common/Toast/toastConfig';
import {
  CeramicVisualiserWrap,
  CeramicContainer,
  CeramicHeader,
  CeramicTitle,
  CeramicSubtitle,
  UploadZone,
  HiddenInput,
  SideBySideWrap,
  ImageCard,
  ImageLabel,
  CarImage,
  ClearBtn
} from './CeramicVisualiserStyles';

const SimpleCeramicVisualiser = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      showToast.error('Image size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      showToast.success('Photo uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <CeramicVisualiserWrap>
      <CeramicContainer>
        <CeramicHeader>
          <CeramicTitle>
            See the <span>ceramic shine</span>
          </CeramicTitle>
          <CeramicSubtitle>
            Upload your car photo to see before and after ceramic coating shine effect
          </CeramicSubtitle>
        </CeramicHeader>

        {!uploadedImage ? (
          <UploadZone onClick={() => fileInputRef.current?.click()}>
            <i className="fa-solid fa-cloud-arrow-up" />
            <p>Click to upload your car photo</p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)' }}>
              JPG, PNG, WEBP • Max 10MB
            </p>
            <HiddenInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </UploadZone>
        ) : (
          <>
            <SideBySideWrap>
              <ImageCard>
                <ImageLabel>BEFORE</ImageLabel>
                <CarImage src={uploadedImage} alt="Before" />
              </ImageCard>
              <ImageCard>
                <ImageLabel $after>AFTER CERAMIC</ImageLabel>
                <CarImage src={uploadedImage} alt="After" $shine />
              </ImageCard>
            </SideBySideWrap>
            <ClearBtn onClick={handleClear}>
              <i className="fa-solid fa-trash" />
              Clear Image
            </ClearBtn>
          </>
        )}
      </CeramicContainer>
    </CeramicVisualiserWrap>
  );
};

export default SimpleCeramicVisualiser;
