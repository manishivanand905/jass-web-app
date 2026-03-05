export const contactInfo = {
  phone: "+91 98765 43210",
  email: "hello@shieldpro.in",
  whatsapp: "+91 98765 43210",
  address: {
    line1: "Studio 12, Auto Nagar",
    line2: "Hyderabad, Telangana 500070",
    googleMapsUrl: "https://maps.google.com/?q=Auto+Nagar+Hyderabad",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6!2d78.4!3d17.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI0JzAwLjAiTiA3OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
  },
  hours: [
    { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM", open: true },
    { day: "Saturday", hours: "9:00 AM – 5:00 PM", open: true },
    { day: "Sunday", hours: "Closed", open: false },
  ],
  social: [
    { platform: "Instagram", icon: "fa-brands fa-instagram", url: "#" },
    { platform: "Facebook", icon: "fa-brands fa-facebook", url: "#" },
    { platform: "YouTube", icon: "fa-brands fa-youtube", url: "#" },
    { platform: "X", icon: "fa-brands fa-x-twitter", url: "#" },
  ],
};

export const whyContactUs = [
  {
    icon: "fa-solid fa-bolt",
    text: "Same-day booking confirmation",
  },
  {
    icon: "fa-solid fa-user-tie",
    text: "Speak directly with technicians",
  },
  {
    icon: "fa-solid fa-rotate-left",
    text: "Free consultation included",
  },
  {
    icon: "fa-solid fa-shield-halved",
    text: "No obligation quotes",
  },
];

export const faqData = [
  {
    id: 1,
    question: "How long does PPF installation take?",
    answer:
      "A full body PPF installation typically takes 1–2 days depending on the vehicle size and complexity. Partial installations like hood and bumpers can be completed within 4–6 hours.",
  },
  {
    id: 2,
    question: "Do you offer mobile installation?",
    answer:
      "Yes, we offer mobile installation services within Hyderabad for orders above ₹10,000. Our technicians come equipped with all tools needed for a professional finish at your location.",
  },
  {
    id: 3,
    question: "What's the difference between PPF and ceramic coating?",
    answer:
      "PPF (Paint Protection Film) is a physical transparent film that protects against scratches, stone chips and impact damage. Ceramic coating is a liquid polymer that bonds to paint providing hydrophobic protection, UV resistance and deep gloss. Both can be combined for maximum protection.",
  },
  {
    id: 4,
    question: "How do I care for my coating after installation?",
    answer:
      "Avoid washing for 7 days after PPF installation and 48 hours after ceramic coating. Use pH-neutral car shampoo, avoid automatic car washes with brushes, and dry with a clean microfiber towel. Annual maintenance detailing is recommended.",
  },
  {
    id: 5,
    question: "Do you offer warranty on services?",
    answer:
      "Yes. All PPF installations come with a 10-year manufacturer warranty against yellowing, bubbling and peeling. Ceramic Pro coatings carry a 5-year warranty. Warranty is registered in your name on the day of installation.",
  },
  {
    id: 6,
    question: "Can I book a consultation before committing?",
    answer:
      "Absolutely. We offer a free 30-minute consultation either at our studio or via video call. Our technicians will assess your vehicle, recommend the best protection plan and provide a no-obligation quote.",
  },
];

export const serviceOptions = [
  "PPF — Basic",
  "PPF — Standard",
  "PPF — Full Body",
  "Ceramic Spray",
  "Ceramic Pro",
  "Ceramic Elite",
  "Combo Package",
  "General Enquiry",
];

export const timeSlots = [
  "9:00 AM – 11:00 AM",
  "11:00 AM – 1:00 PM",
  "1:00 PM – 3:00 PM",
  "3:00 PM – 5:00 PM",
  "5:00 PM – 7:00 PM",
];

export default contactInfo;
