import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

export const Header = styled.div`
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const Title = styled.h1`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #c90000;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SearchBar = styled.input`
  font-family: "Barlow Condensed", sans-serif;
  flex: 1;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ececec;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #c90000;
  }
  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`;

export const Select = styled.select`
  font-family: "Barlow Condensed", sans-serif;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ececec;
  font-size: 1rem;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #c90000;
  }
  option { background: #0a0a0a; color: #ececec; }
`;

export const AddButton = styled.button`
  font-family: "Barlow Condensed", sans-serif;
  padding: 12px 24px;
  background: #c90000;
  border: none;
  border-radius: 8px;
  color: #ececec;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  &:hover {
    background: #860000;
    transform: translateY(-2px);
  }
  i {
    margin-right: 8px;
  }
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.9rem;
    width: 100%;
  }
`;

export const Table = styled.table`
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 15px;
    border: none;
    background: transparent;
    width: calc(100% - 30px);
    margin: 0 15px;
  }
`;

export const TableHeader = styled.thead`
  background: rgba(201, 0, 0, 0.1);
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TableBody = styled.tbody`
  @media (max-width: 768px) {
    display: contents;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px;
    gap: 8px;
    margin: 0;
  }
`;

export const TableCell = styled.td`
  font-family: "Barlow Condensed", sans-serif;
  padding: 15px;
  color: #ececec;
  ${TableHeader} & {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.85rem;
  }
  @media (max-width: 768px) {
    padding: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    &::before {
      content: attr(data-label);
      font-weight: 700;
      color: #c90000;
      min-width: 60px;
      text-transform: uppercase;
      font-size: 0.65rem;
    }
  }
`;

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${(props) => (props.$available ? "#00c85333" : "#f4433633")};
  color: ${(props) => (props.$available ? "#00c853" : "#f44336")};
  border: 1px solid ${(props) => (props.$available ? "#00c853" : "#f44336")};
`;

export const ActionButton = styled.button`
  padding: 8px 12px;
  background: ${(props) =>
    props.$danger ? "rgba(244, 67, 54, 0.1)" : "rgba(201, 0, 0, 0.1)"};
  border: 1px solid ${(props) => (props.$danger ? "#f44336" : "#C90000")};
  border-radius: 6px;
  color: ${(props) => (props.$danger ? "#f44336" : "#C90000")};
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.3s ease;
  &:hover {
    background: ${(props) =>
      props.$danger ? "rgba(244, 67, 54, 0.2)" : "rgba(201, 0, 0, 0.2)"};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
`;

export const ModalContent = styled.div`
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const ModalTitle = styled.h2`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.8rem;
  color: #c90000;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ececec;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #c90000;
  }
`;

export const Form = styled.form``;

export const FormSection = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:last-of-type {
    border-bottom: none;
  }
`;

export const SectionTitle = styled.h3`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.3rem;
  color: #ececec;
  margin-bottom: 20px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-family: "Barlow Condensed", sans-serif;
  color: #ececec;
  font-size: 0.95rem;
  font-weight: 600;
`;

export const Input = styled.input`
  font-family: "Barlow Condensed", sans-serif;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ececec;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #c90000;
  }
`;

export const Textarea = styled.textarea`
  font-family: "Barlow Condensed", sans-serif;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ececec;
  font-size: 1rem;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #c90000;
  }
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-family: "Barlow Condensed", sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ececec;
  cursor: pointer;
`;

export const DynamicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

export const DynamicItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const RemoveButton = styled.button`
  padding: 8px 12px;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  border-radius: 6px;
  color: #f44336;
  cursor: pointer;
  &:hover {
    background: rgba(244, 67, 54, 0.2);
  }
`;

export const AddItemButton = styled.button`
  font-family: "Barlow Condensed", sans-serif;
  padding: 10px 20px;
  background: rgba(201, 0, 0, 0.1);
  border: 1px solid #c90000;
  border-radius: 8px;
  color: #c90000;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: rgba(201, 0, 0, 0.2);
  }
  i {
    margin-right: 8px;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
`;

export const CancelButton = styled.button`
  font-family: "Barlow Condensed", sans-serif;
  padding: 12px 30px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ececec;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const SubmitButton = styled.button`
  font-family: "Barlow Condensed", sans-serif;
  padding: 12px 30px;
  background: #c90000;
  border: none;
  border-radius: 8px;
  color: #ececec;
  cursor: pointer;
  font-weight: 700;
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  &:hover {
    background: #860000;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: rgba(236, 236, 236, 0.4);
  i {
    font-size: 60px;
    margin-bottom: 20px;
  }
  p {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.2rem;
    margin: 0;
  }
  @media (max-width: 768px) {
    padding: 40px 15px;
    i {
      font-size: 40px;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 30px;
`;

export const PageButton = styled.button`
  padding: 10px 15px;
  background: ${(props) =>
    props.$active ? "#C90000" : "rgba(255, 255, 255, 0.05)"};
  border: 1px solid
    ${(props) => (props.$active ? "#C90000" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 6px;
  color: #ececec;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  &:hover {
    background: ${(props) =>
      props.$active ? "#860000" : "rgba(255, 255, 255, 0.1)"};
  }
`;
