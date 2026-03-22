import { useEffect, useMemo, useRef, useState } from "react";
import { API_BASE } from "../../../config/api";
import {
  ModalOverlay,
  ModalShell,
  CloseButton,
  FormSection,
  FormHeader,
  Eyebrow,
  Title,
  Subtitle,
  TypeBadge,
  Form,
  FormGrid,
  FormField,
  Label,
  InputWrapper,
  Input,
  Textarea,
  SubmitButton,
  Toast,
} from "./ContactFormStyles";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

const ContactForm = ({ isOpen, onClose, requestType = "enquiry" }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const successTimeoutRef = useRef(null);

  const config = useMemo(() => {
    if (requestType === "ticket") {
      return {
        eyebrow: "SUPPORT DESK",
        titleStart: "Raise a",
        titleAccent: "Ticket",
        subtitle: "Share the issue and our team will review it quickly.",
        badge: "Ticket Request",
        submitLabel: "RAISE TICKET",
        successLabel: "Your ticket has been raised successfully.",
        messagePlaceholder:
          "Describe the issue, concern, or support you need from our team...",
        subjectPlaceholder: "Issue subject or related service",
      };
    }

    return {
      eyebrow: "CONTACT DESK",
      titleStart: "Ask an",
      titleAccent: "Enquiry",
      subtitle: "Send your query and we will get back to you shortly.",
      badge: "Enquiry Request",
      submitLabel: "SEND ENQUIRY",
      successLabel: "Your enquiry has been sent successfully.",
      messagePlaceholder:
        "Tell us your query, requirement, or what you would like to know...",
      subjectPlaceholder: "Subject or related service",
    };
  }, [requestType]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }
      setFormData(initialFormState);
      setLoading(false);
      setShowToast(false);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit request");
      }

      setShowToast(true);
      setFormData(initialFormState);
      successTimeoutRef.current = window.setTimeout(() => {
        setShowToast(false);
        successTimeoutRef.current = null;
        onClose();
      }, 1400);
    } catch (error) {
      console.error("Error submitting contact request:", error);
      window.alert(error.message || "Unable to submit your request right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalShell role="dialog" aria-modal="true" aria-labelledby="contact-request-title">
        <CloseButton type="button" onClick={onClose} aria-label="Close contact form">
          <i className="fa-solid fa-xmark" />
        </CloseButton>

        <FormSection>
          <FormHeader>
            <Eyebrow>{config.eyebrow}</Eyebrow>
            <Title id="contact-request-title">
              {config.titleStart} <span>{config.titleAccent}</span>
            </Title>
            <Subtitle>{config.subtitle}</Subtitle>
            <TypeBadge>{config.badge}</TypeBadge>
          </FormHeader>

          <Form onSubmit={handleSubmit}>
            <FormGrid>
              <FormField>
                <Label htmlFor="contact-name">
                  <i className="fa-solid fa-user" />
                  Full Name
                </Label>
                <InputWrapper>
                  <Input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </InputWrapper>
              </FormField>

              <FormField>
                <Label htmlFor="contact-email">
                  <i className="fa-solid fa-envelope" />
                  Email Address
                </Label>
                <InputWrapper>
                  <Input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                    required
                  />
                </InputWrapper>
              </FormField>

              <FormField>
                <Label htmlFor="contact-phone">
                  <i className="fa-solid fa-phone" />
                  Phone Number
                </Label>
                <InputWrapper>
                  <Input
                    id="contact-phone"
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
                <Label htmlFor="contact-subject">
                  <i className="fa-solid fa-layer-group" />
                  Subject / Related Service
                </Label>
                <InputWrapper>
                  <Input
                    id="contact-subject"
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder={config.subjectPlaceholder}
                    required
                  />
                </InputWrapper>
              </FormField>

              <FormField>
                <Label htmlFor="contact-date">
                  <i className="fa-solid fa-calendar" />
                  Preferred Date
                </Label>
                <InputWrapper>
                  <Input
                    id="contact-date"
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </FormField>

              <FormField>
                <Label htmlFor="contact-time">
                  <i className="fa-solid fa-clock" />
                  Preferred Time
                </Label>
                <InputWrapper>
                  <Input
                    id="contact-time"
                    type="text"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    placeholder="Preferred time slot"
                  />
                </InputWrapper>
              </FormField>
            </FormGrid>

            <FormField>
              <Label htmlFor="contact-message">
                <i className="fa-solid fa-pen-to-square" />
                {requestType === "ticket" ? "Issue Details" : "Your Query"}
              </Label>
              <InputWrapper>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={config.messagePlaceholder}
                  rows="5"
                  required
                />
              </InputWrapper>
            </FormField>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  SUBMITTING...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane" />
                  {config.submitLabel}
                </>
              )}
            </SubmitButton>
          </Form>

          {showToast && (
            <Toast>
              <i className="fa-solid fa-circle-check" />
              {config.successLabel}
            </Toast>
          )}
        </FormSection>
      </ModalShell>
    </>
  );
};

export default ContactForm;
