import { useState } from "react";
import { faqData } from "../../../data/contactData";
import {
  FAQSection,
  FAQHeader,
  Eyebrow,
  Title,
  AccordionList,
  AccordionItem,
  AccordionHeader,
  AccordionAnswer,
} from "./FAQAccordionStyles";

const FAQAccordion = () => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <FAQSection>
      <FAQHeader>
        <Eyebrow>QUICK ANSWERS</Eyebrow>
        <Title>
          Frequently <span>Asked</span>
        </Title>
      </FAQHeader>

      <AccordionList>
        {faqData.map((item) => (
          <AccordionItem key={item.id} $isOpen={openId === item.id}>
            <AccordionHeader onClick={() => toggleAccordion(item.id)}>
              <span>{item.question}</span>
              <i className="fa-solid fa-chevron-down" />
            </AccordionHeader>
            <AccordionAnswer $isOpen={openId === item.id}>
              {item.answer}
            </AccordionAnswer>
          </AccordionItem>
        ))}
      </AccordionList>
    </FAQSection>
  );
};

export default FAQAccordion;
