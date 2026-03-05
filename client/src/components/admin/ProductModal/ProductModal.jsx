import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';
import { adminAPI } from '../../../services/admin/api';
import { showToast } from '../../../components/common/Toast/toastConfig';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../../../components/common/FormError/FormErrorStyles';
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Form,
  InputGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  Button,
  Row,
  CheckboxGroup,
  ArraySection,
  ArrayItem,
  RemoveButton,
  AddButton,
  SectionTitle
} from './ProductModalStyles';

const categoryOptions = [
  { value: 'Paint Protection Film', label: 'Paint Protection Film', tag: 'PPF' },
  { value: 'Ceramic Coating', label: 'Ceramic Coating', tag: 'Ceramic' },
  { value: 'Accessories', label: 'Accessories', tag: 'Accessory' }
];

const categoryTemplates = {
  'Paint Protection Film': [
    { label: 'Thickness', value: '' },
    { label: 'Width', value: '' },
    { label: 'Coverage', value: '' },
    { label: 'Durability', value: '' }
  ],
  'Ceramic Coating': [
    { label: 'Hardness', value: '' },
    { label: 'Volume', value: '' },
    { label: 'Coverage', value: '' },
    { label: 'Durability', value: '' }
  ],
  'Accessories': [
    { label: '', value: '' }
  ]
};

const ProductModal = ({ product, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, control, watch, setValue } = useForm({
    defaultValues: product || {
      specifications: [{ label: '', value: '' }],
      features: [''],
      availability: true,
      featured: false
    }
  });

  const selectedCategory = watch('category');

  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control,
    name: 'specifications'
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'features'
  });

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  useEffect(() => {
    if (selectedCategory) {
      const categoryOption = categoryOptions.find(opt => opt.value === selectedCategory);
      if (categoryOption) {
        setValue('tag', categoryOption.tag);
      }
      if (categoryTemplates[selectedCategory] && !product) {
        setValue('specifications', categoryTemplates[selectedCategory]);
      }
    }
  }, [selectedCategory, product, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        rating: Number(data.rating) || 0,
        ratingCount: Number(data.ratingCount) || 0,
        durability: data.durability ? Number(data.durability) : null,
        features: data.features.filter(f => f.trim()),
        specifications: data.specifications.filter(s => s.label && s.value)
      };

      const response = product
        ? await adminAPI.updateProduct(product.id, formattedData)
        : await adminAPI.createProduct(formattedData);

      if (response.success) {
        showToast.success(product ? 'Product updated successfully' : 'Product created successfully');
        onSuccess();
      } else {
        showToast.error(response.message || 'Operation failed');
      }
    } catch {
      showToast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{product ? 'Edit Product' : 'Add Product'}</Title>
          <CloseButton onClick={onClose}>
            <i className="fas fa-times" />
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle>Basic Information</SectionTitle>
          
          <InputGroup>
            <Label>Category *</Label>
            <Input
              as="select"
              $hasError={!!errors.category}
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select category</option>
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Input>
            {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Tag *</Label>
            <Input
              type="text"
              placeholder="Select category first"
              readOnly
              style={{ backgroundColor: '#1a1a1a', cursor: 'not-allowed' }}
              $hasError={!!errors.tag}
              {...register('tag', { required: 'Tag is required' })}
            />
            {errors.tag && <ErrorMessage>{errors.tag.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Product Name *</Label>
            <Input
              type="text"
              placeholder="Enter product name"
              $hasError={!!errors.name}
              {...register('name', { required: 'Product name is required' })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputGroup>

          <Row>
            <InputGroup>
              <Label>Brand *</Label>
              <Input
                type="text"
                placeholder="Enter brand name"
                $hasError={!!errors.brand}
                {...register('brand', { required: 'Brand is required' })}
              />
              {errors.brand && <ErrorMessage>{errors.brand.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label>Badge</Label>
              <Input
                type="text"
                placeholder="Best Seller, Premium, etc."
                {...register('badge')}
              />
            </InputGroup>
          </Row>

          <InputGroup>
            <Label>Image URL *</Label>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              $hasError={!!errors.image}
              {...register('image', { required: 'Image URL is required' })}
            />
            {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
          </InputGroup>

          <SectionTitle>Pricing & Stock</SectionTitle>

          <Row>
            <InputGroup>
              <Label>Price (₹) *</Label>
              <Input
                type="number"
                placeholder="12999"
                $hasError={!!errors.price}
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' }
                })}
              />
              {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label>Stock *</Label>
              <Input
                type="number"
                placeholder="25"
                $hasError={!!errors.stock}
                {...register('stock', { 
                  required: 'Stock is required',
                  min: { value: 0, message: 'Stock must be positive' }
                })}
              />
              {errors.stock && <ErrorMessage>{errors.stock.message}</ErrorMessage>}
            </InputGroup>
          </Row>

          <Row>
            <InputGroup>
              <Label>Rating</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="4.8"
                {...register('rating', { min: 0, max: 5 })}
              />
            </InputGroup>

            <InputGroup>
              <Label>Rating Count</Label>
              <Input
                type="number"
                placeholder="124"
                {...register('ratingCount', { min: 0 })}
              />
            </InputGroup>
          </Row>

          <SectionTitle>Product Details</SectionTitle>

          <InputGroup>
            <Label>Short Description *</Label>
            <TextArea
              placeholder="Brief description (max 100 chars)"
              rows="2"
              $hasError={!!errors.description}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Full Description</Label>
            <TextArea
              placeholder="Detailed product description"
              rows="4"
              {...register('fullDescription')}
            />
          </InputGroup>

          <Row>
            <InputGroup>
              <Label>Durability (years)</Label>
              <Input
                type="number"
                step="0.5"
                placeholder="10"
                {...register('durability')}
              />
            </InputGroup>

            <InputGroup>
              <Label>Warranty</Label>
              <Input
                type="text"
                placeholder="10 years manufacturer warranty"
                {...register('warranty')}
              />
            </InputGroup>
          </Row>

          <CheckboxGroup>
            <label>
              <input type="checkbox" {...register('featured')} />
              <span>Featured Product</span>
            </label>
            <label>
              <input type="checkbox" {...register('availability')} />
              <span>Available</span>
            </label>
          </CheckboxGroup>

          <SectionTitle>Specifications</SectionTitle>
          <ArraySection>
            {specFields.map((field, index) => (
              <ArrayItem key={field.id}>
                <Input
                  type="text"
                  placeholder="Label (e.g., Thickness)"
                  {...register(`specifications.${index}.label`)}
                />
                <Input
                  type="text"
                  placeholder="Value (e.g., 8 mil)"
                  {...register(`specifications.${index}.value`)}
                />
                <RemoveButton type="button" onClick={() => removeSpec(index)}>
                  <i className="fas fa-trash" />
                </RemoveButton>
              </ArrayItem>
            ))}
            <AddButton type="button" onClick={() => appendSpec({ label: '', value: '' })}>
              <i className="fas fa-plus" /> Add Specification
            </AddButton>
          </ArraySection>

          <SectionTitle>Features</SectionTitle>
          <ArraySection>
            {featureFields.map((field, index) => (
              <ArrayItem key={field.id}>
                <Input
                  type="text"
                  placeholder="Feature description"
                  {...register(`features.${index}`)}
                />
                <RemoveButton type="button" onClick={() => removeFeature(index)}>
                  <i className="fas fa-trash" />
                </RemoveButton>
              </ArrayItem>
            ))}
            <AddButton type="button" onClick={() => appendFeature('')}>
              <i className="fas fa-plus" /> Add Feature
            </AddButton>
          </ArraySection>

          <ButtonGroup>
            <Button type="button" $variant="secondary" onClick={onClose}>
              <i className="fas fa-times" /> Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="16px" color="#fff" />
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save" />
                  {product ? 'Update Product' : 'Create Product'}
                </>
              )}
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};

ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default ProductModal;
