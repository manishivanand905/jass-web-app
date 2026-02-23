import { useState } from "react";
import {
  FormSection,
  FormHeader,
  Eyebrow,
  Title,
  Subtitle,
  FormContainer,
  FormGrid,
  FormField,
  Label,
  InputWrapper,
  Input,
  Select,
  Textarea,
  StarSelector,
  StarButton,
  SubmitButton,
} from "./ReviewFormStyles";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    vehicle: "",
    city: "",
    service: "",
    rating: 0,
    review: "",
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormSection>
      <FormHeader>
        <Eyebrow>SHARE YOUR EXPERIENCE</Eyebrow>
        <Title>
          Write a <span>Review</span>
        </Title>
        <Subtitle>Used our products? Tell others about your experience</Subtitle>
      </FormHeader>

      <FormContainer onSubmit={handleSubmit}>
        <FormGrid>
          <FormField>
            <Label>
              <i className="fa-solid fa-user" />
              Your Name
            </Label>
            <InputWrapper>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </InputWrapper>
          </FormField>

          <FormField>
            <Label>
              <i className="fa-solid fa-car" />
              Vehicle Model
            </Label>
            <InputWrapper>
              <Input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="e.g., BMW 5 Series"
                required
              />
            </InputWrapper>
          </FormField>

          <FormField>
            <Label>
              <i className="fa-solid fa-location-dot" />
              City
            </Label>
            <InputWrapper>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                required
              />
            </InputWrapper>
          </FormField>

          <FormField>
            <Label>
              <i className="fa-solid fa-tag" />
              Service Used
            </Label>
            <InputWrapper>
              <Select name="service" value={formData.service} onChange={handleChange} required>
                <option value="">Select service</option>
                <option value="PPF">PPF</option>
                <option value="Ceramic">Ceramic Coating</option>
                <option value="Accessory">Accessory</option>
              </Select>
            </InputWrapper>
          </FormField>
        </FormGrid>

        <FormField>
          <Label>
            <i className="fa-solid fa-star" />
            Rating
          </Label>
          <StarSelector>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarButton
                key={star}
                type="button"
                $filled={star <= (hoverRating || formData.rating)}
                onClick={() => setFormData({ ...formData, rating: star })}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <i className="fa-solid fa-star" />
              </StarButton>
            ))}
          </StarSelector>
        </FormField>

        <FormField>
          <Label>
            <i className="fa-solid fa-pen" />
            Your Review
          </Label>
          <InputWrapper>
            <Textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Share your experience..."
              rows="6"
              required
            />
          </InputWrapper>
        </FormField>

        <SubmitButton type="submit">
          <i className="fa-solid fa-paper-plane" />
          SUBMIT REVIEW
        </SubmitButton>
      </FormContainer>
    </FormSection>
  );
};

export default ReviewForm;
