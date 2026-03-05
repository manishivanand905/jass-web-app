import { useState } from "react";
import { serviceOptions, timeSlots } from "../../../data/contactData";
import {
  FormSection,
  FormHeader,
  Eyebrow,
  Title,
  Subtitle,
  Form,
  FormGrid,
  FormField,
  Label,
  InputWrapper,
  Input,
  Select,
  Textarea,
  SubmitButton,
  Toast,
} from "./ContactFormStyles";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          preferredDate: formData.date,
          preferredTime: formData.time,
          message: formData.message
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setShowToast(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          vehicle: "",
          service: "",
          date: "",
          time: "",
          message: "",
        });
        setTimeout(() => setShowToast(false), 4000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormSection>
      <FormHeader>
        <Eyebrow>SEND A MESSAGE</Eyebrow>
        <Title>
          Let's <span>Talk</span>
        </Title>
        <Subtitle>Fill in the form and we'll get back to you within 24 hours</Subtitle>
      </FormHeader>

      <Form onSubmit={handleSubmit}>
        <FormGrid>
          <FormField>
            <Label>
              <i className="fa-solid fa-user" />
              Full Name
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
              <i className="fa-solid fa-envelope" />
              Email Address
            </Label>
            <InputWrapper>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </InputWrapper>
          </FormField>

          <FormField>
            <Label>
              <i className="fa-solid fa-phone" />
              Phone Number
            </Label>
            <InputWrapper>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
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
              />
            </InputWrapper>
          </FormField>

          <FormField>
            <Label>
              <i className="fa-solid fa-spray-can-sparkles" />
              Service Interest
            </Label>
            <InputWrapper>
              <Select name="service" value={formData.service} onChange={handleChange} required>
                <option value="">Select service</option>
                {serviceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </InputWrapper>
          </FormField>

          <FormField>
            <Label>
              <i className="fa-solid fa-calendar" />
              Preferred Date
            </Label>
            <InputWrapper>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </InputWrapper>
          </FormField>

          <FormField>
            <Label>
              <i className="fa-solid fa-clock" />
              Preferred Time
            </Label>
            <InputWrapper>
              <Select name="time" value={formData.time} onChange={handleChange}>
                <option value="">Select time</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </Select>
            </InputWrapper>
          </FormField>
        </FormGrid>

        <FormField>
          <Label>
            <i className="fa-solid fa-pen-to-square" />
            Message
          </Label>
          <InputWrapper>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements..."
              rows="5"
              required
            />
          </InputWrapper>
        </FormField>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin" />
              SENDING...
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane" />
              SEND MESSAGE
            </>
          )}
        </SubmitButton>
      </Form>

      {showToast && (
        <Toast>
          <i className="fa-solid fa-circle-check" />
          We'll be in touch within 24 hours
        </Toast>
      )}
    </FormSection>
  );
};

export default ContactForm;
