import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
  Button
} from './ProductModalStyles';

const ProductModal = ({ product, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: product || {}
  });

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = product
        ? await adminAPI.updateProduct(product.id, data)
        : await adminAPI.createProduct(data);

      if (response.success) {
        showToast.success(product ? 'Product updated successfully' : 'Product created successfully');
        onSuccess();
      } else {
        showToast.error(response.message || 'Operation failed');
      }
    } catch (error) {
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
          <InputGroup>
            <Label>Product Name</Label>
            <Input
              type="text"
              placeholder="Enter product name"
              $hasError={!!errors.name}
              {...register('name', { required: 'Product name is required' })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Category</Label>
            <Input
              type="text"
              placeholder="Enter category"
              $hasError={!!errors.category}
              {...register('category', { required: 'Category is required' })}
            />
            {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Price</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="Enter price"
              $hasError={!!errors.price}
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
            />
            {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Stock</Label>
            <Input
              type="number"
              placeholder="Enter stock quantity"
              $hasError={!!errors.stock}
              {...register('stock', { 
                required: 'Stock is required',
                min: { value: 0, message: 'Stock must be positive' }
              })}
            />
            {errors.stock && <ErrorMessage>{errors.stock.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Description</Label>
            <TextArea
              placeholder="Enter product description"
              $hasError={!!errors.description}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </InputGroup>

          <ButtonGroup>
            <Button type="button" $variant="secondary" onClick={onClose}>
              Cancel
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
                  {product ? 'Update' : 'Create'}
                </>
              )}
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default ProductModal;
