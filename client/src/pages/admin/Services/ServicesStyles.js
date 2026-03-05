import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
  @media (max-width: 768px) { padding: 15px 0; }
`;

export const Header = styled.div`
  margin-bottom: 30px;
  @media (max-width: 768px) { padding: 0 15px; }
`;

export const Title = styled.h1`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #C90000;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  @media (max-width: 768px) { font-size: 1.3rem; margin-bottom: 12px; }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 768px) { flex-direction: column; gap: 10px; }
`;

export const SearchBar = styled.input`
  font-family: 'Barlow Condensed', sans-serif;
  flex: 1;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ECECEC;
  font-size: 1rem;
  &:focus { outline: none; border-color: #C90000; }
  @media (max-width: 768px) { padding: 10px 15px; font-size: 0.9rem; }
`;

export const AddButton = styled.button`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 12px 24px;
  background: #C90000;
  border: none;
  border-radius: 8px;
  color: #ECECEC;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  &:hover { background: #860000; transform: translateY(-2px); }
  i { margin-right: 8px; }
  @media (max-width: 768px) { padding: 10px 16px; font-size: 0.9rem; width: 100%; }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 0 15px; }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
  position: relative;
  filter: ${props => props.$unavailable ? 'grayscale(1)' : 'none'};
  opacity: ${props => props.$unavailable ? '0.6' : '1'};
  &:hover { transform: translateY(-5px); }
  @media (max-width: 768px) {
    padding: 12px;
    display: flex;
    flex-direction: column;
  }
`;

export const CardBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #C90000;
  color: #ECECEC;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 1;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 120px;
  }
`;

export const CardContent = styled.div`
  padding: 20px;
  @media (max-width: 768px) {
    padding: 8px 0;
  }
`;

export const CardTitle = styled.h3`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.3rem;
  color: #ECECEC;
  margin: 0 0 10px 0;
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 4px;
  }
`;

export const CardCategory = styled.p`
  font-family: 'Barlow Condensed', sans-serif;
  color: #C90000;
  font-size: 0.9rem;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  font-weight: 600;
`;

export const CardPrice = styled.p`
  font-family: 'Barlow Condensed', sans-serif;
  color: rgba(236, 236, 236, 0.7);
  font-size: 1rem;
  margin: 0 0 15px 0;
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 8px;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const ActionButton = styled.button`
  font-family: 'Barlow Condensed', sans-serif;
  flex: 1;
  padding: 10px;
  background: ${props => props.$danger ? 'rgba(244, 67, 54, 0.1)' : 'rgba(201, 0, 0, 0.1)'};
  border: 1px solid ${props => props.$danger ? '#f44336' : '#C90000'};
  border-radius: 6px;
  color: ${props => props.$danger ? '#f44336' : '#C90000'};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover { background: ${props => props.$danger ? 'rgba(244, 67, 54, 0.2)' : 'rgba(201, 0, 0, 0.2)'}; }
  i { margin-right: 5px; }
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.75rem;
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
  max-width: 800px;
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
  @media (max-width: 768px) { padding: 20px; }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const ModalTitle = styled.h2`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.8rem;
  color: #C90000;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ECECEC;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover { color: #C90000; }
`;

export const Form = styled.form``;

export const FormSection = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:last-of-type { border-bottom: none; }
`;

export const SectionTitle = styled.h3`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.3rem;
  color: #ECECEC;
  margin-bottom: 20px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 12px; }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-family: 'Barlow Condensed', sans-serif;
  color: #ECECEC;
  font-size: 0.95rem;
  font-weight: 600;
`;

export const Input = styled.input`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ECECEC;
  font-size: 1rem;
  &:focus { outline: none; border-color: #C90000; }
`;

export const Select = styled.select`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ECECEC;
  font-size: 1rem;
  cursor: pointer;
  &:focus { outline: none; border-color: #C90000; }
`;

export const Textarea = styled.textarea`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ECECEC;
  font-size: 1rem;
  resize: vertical;
  &:focus { outline: none; border-color: #C90000; }
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-family: 'Barlow Condensed', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ECECEC;
  cursor: pointer;
`;

export const DynamicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

export const DynamicItem = styled.div`
  display: ${props => props.$isBenefit ? 'flex' : 'grid'};
  grid-template-columns: ${props => props.$isBenefit ? 'auto' : '2fr 1.5fr 2fr 1fr auto'};
  gap: 10px;
  align-items: flex-end;
  @media (max-width: 1024px) {
    grid-template-columns: ${props => props.$isBenefit ? 'auto' : '1fr'};
  }
`;

export const RemoveButton = styled.button`
  padding: 10px 12px;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  border-radius: 6px;
  color: #f44336;
  cursor: pointer;
  height: fit-content;
  width: ${props => props.$isBenefit ? '8%' : 'auto'};
  flex-shrink: 0;
  &:hover { background: rgba(244, 67, 54, 0.2); }
`;

export const AddItemButton = styled.button`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 10px 20px;
  background: rgba(201, 0, 0, 0.1);
  border: 1px solid #C90000;
  border-radius: 8px;
  color: #C90000;
  cursor: pointer;
  font-weight: 600;
  &:hover { background: rgba(201, 0, 0, 0.2); }
  i { margin-right: 8px; }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
`;

export const CancelButton = styled.button`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 12px 30px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ECECEC;
  cursor: pointer;
  font-weight: 600;
  &:hover { background: rgba(255, 255, 255, 0.1); }
`;

export const SubmitButton = styled.button`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 12px 30px;
  background: #C90000;
  border: none;
  border-radius: 8px;
  color: #ECECEC;
  cursor: pointer;
  font-weight: 700;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  &:hover { background: #860000; }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: rgba(236, 236, 236, 0.4);
  i { font-size: 60px; margin-bottom: 20px; }
  p { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin: 0; }
  @media (max-width: 768px) { padding: 40px 15px; i { font-size: 40px; } p { font-size: 1rem; } }
`;
