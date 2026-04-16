import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container, Header, Title, HeaderActions, SearchBar, AddButton, Table, TableHeader, TableBody, TableRow, TableCell,
  ProductImage, StatusBadge, ActionButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton,
  Form, FormSection, SectionTitle, FormGrid, FormGroup, Label, Input, Select, Textarea, Checkbox, CheckboxLabel,
  DynamicList, DynamicItem, RemoveButton, AddItemButton, FormActions, CancelButton, SubmitButton, EmptyState, Pagination,
  PageButton
} from './ProductsStyles';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [specs, setSpecs] = useState([]);
  const [features, setFeatures] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${apiUrl}/api/products`, {
        params: { page, limit: 10, search, category },
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [page, search, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openModal = (product = null) => {
    setEditingProduct(product);
    setImageFile(null);
    setImagePreview(product?.image || null);
    if (product) {
      reset(product);
      setSpecs(product.specifications || []);
      setFeatures(product.features || []);
    } else {
      reset({});
      setSpecs([]);
      setFeatures([]);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview(null);
    reset({});
    setSpecs([]);
    setFeatures([]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'specifications' && key !== 'features') {
          submitData.append(key, formData[key]);
        }
      });
      submitData.append('specifications', JSON.stringify(specs));
      submitData.append('features', JSON.stringify(features));
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }
      
      if (editingProduct) {
        await axios.put(`${apiUrl}/api/products/${editingProduct._id}`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Product updated successfully');
      } else {
        await axios.post(`${apiUrl}/api/products`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Product created successfully');
      }
      closeModal();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.delete(`${apiUrl}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const addSpec = () => setSpecs([...specs, { label: '', value: '' }]);
  const removeSpec = (index) => setSpecs(specs.filter((_, i) => i !== index));
  const updateSpec = (index, field, value) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (index) => setFeatures(features.filter((_, i) => i !== index));
  const updateFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  return (
    <AdminLayout>
      <Container>
        <Header>
          <Title>PRODUCT MANAGEMENT</Title>
          <HeaderActions>
            <SearchBar
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="PPF">PPF</option>
              <option value="Ceramic Coating">Ceramic Coating</option>
              <option value="Accessories">Accessories</option>
            </Select>
            <AddButton onClick={() => openModal()}>
              <i className="fas fa-plus"></i> Add Product
            </AddButton>
          </HeaderActions>
        </Header>

        {loading ? (
          <EmptyState><i className="fas fa-spinner fa-spin"></i></EmptyState>
        ) : products.length === 0 ? (
          <EmptyState>
            <i className="fas fa-box-open"></i>
            <p>No products found. Add your first product!</p>
          </EmptyState>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product._id}>
                    <TableCell data-label="Image"><ProductImage src={product.image} alt={product.name} /></TableCell>
                    <TableCell data-label="Name">{product.name}</TableCell>
                    <TableCell data-label="Category">{product.category}</TableCell>
                    <TableCell data-label="Brand">{product.brand}</TableCell>
                    <TableCell data-label="Price">₹{product.price.toLocaleString()}</TableCell>
                    <TableCell data-label="Stock">{product.stock}</TableCell>
                    <TableCell data-label="Status">
                      <StatusBadge $available={product.available}>
                        {product.available ? 'Available' : 'Unavailable'}
                      </StatusBadge>
                    </TableCell>
                    <TableCell data-label="Actions">
                      <ActionButton onClick={() => openModal(product)}>
                        <i className="fas fa-edit"></i>
                      </ActionButton>
                      <ActionButton $danger onClick={() => deleteProduct(product._id)}>
                        <i className="fas fa-trash"></i>
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageButton key={i + 1} $active={page === i + 1} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </PageButton>
              ))}
            </Pagination>
          </>
        )}

        {modalOpen && (
          <>
            <ModalOverlay onClick={closeModal} />
            <Modal>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</ModalTitle>
                  <CloseButton onClick={closeModal}><i className="fas fa-times"></i></CloseButton>
                </ModalHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormSection>
                    <SectionTitle>Basic Information</SectionTitle>
                    <FormGrid>
                      <FormGroup>
                        <Label>Category *</Label>
                        <Select {...register('category', { required: true })}>
                          <option value="">Select category</option>
                          <option value="PPF">PPF</option>
                          <option value="Ceramic Coating">Ceramic Coating</option>
                          <option value="Accessories">Accessories</option>
                        </Select>
                        {errors.category && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                      </FormGroup>
                      <FormGroup>
                        <Label>Product Name *</Label>
                        <Input {...register('name', { required: true })} />
                        {errors.name && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                      </FormGroup>
                      <FormGroup>
                        <Label>Brand *</Label>
                        <Input {...register('brand', { required: true })} />
                        {errors.brand && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                      </FormGroup>
                      <FormGroup>
                        <Label>Badge</Label>
                        <Input {...register('badge')} placeholder="e.g., NEW, BESTSELLER" />
                      </FormGroup>
                      <FormGroup style={{ gridColumn: '1 / -1' }}>
                        <Label>Product Image *</Label>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <Input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ padding: '8px' }}
                            />
                            <small style={{ color: '#999', marginTop: '5px', display: 'block' }}>
                              {imageFile ? imageFile.name : 'Choose an image file'}
                            </small>
                          </div>
                          {imagePreview && (
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          )}
                        </div>
                      </FormGroup>
                    </FormGrid>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>Pricing & Stock</SectionTitle>
                    <FormGrid>
                      <FormGroup>
                        <Label>Price (₹) *</Label>
                        <Input type="number" {...register('price', { required: true, min: 0 })} />
                        {errors.price && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                      </FormGroup>
                      <FormGroup>
                        <Label>Stock *</Label>
                        <Input type="number" {...register('stock', { required: true, min: 0 })} />
                        {errors.stock && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                      </FormGroup>
                      <FormGroup>
                        <Label>Rating</Label>
                        <Input type="number" step="0.1" {...register('rating', { min: 0, max: 5 })} />
                      </FormGroup>
                      <FormGroup>
                        <Label>Rating Count</Label>
                        <Input type="number" {...register('ratingCount', { min: 0 })} />
                      </FormGroup>
                    </FormGrid>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>Product Details</SectionTitle>
                    <FormGroup>
                      <Label>Short Description *</Label>
                      <Textarea {...register('shortDescription', { required: true })} rows="3" />
                      {errors.shortDescription && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                    </FormGroup>
                    <FormGroup>
                      <Label>Full Description</Label>
                      <Textarea {...register('fullDescription')} rows="5" />
                    </FormGroup>
                    <FormGrid>
                      <FormGroup>
                        <Label>Durability</Label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <Input type="number" {...register('durability', { min: 0 })} placeholder="e.g., 10" style={{ flex: 1 }} />
                          <span style={{ color: '#ECECEC', whiteSpace: 'nowrap' }}>Years</span>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label>Warranty</Label>
                        <Textarea {...register('warranty')} placeholder="e.g., 5 Years Manufacturer Warranty" rows="1" style={{ resize: 'none' }} />
                      </FormGroup>
                    </FormGrid>
                    <FormGrid>
                      <CheckboxLabel>
                        <Checkbox type="checkbox" {...register('featured')} />
                        Featured Product
                      </CheckboxLabel>
                      <CheckboxLabel>
                        <Checkbox type="checkbox" {...register('available')} defaultChecked />
                        Available
                      </CheckboxLabel>
                    </FormGrid>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>Specifications</SectionTitle>
                    <DynamicList>
                      {specs.map((spec, index) => (
                        <DynamicItem key={index}>
                          <Input
                            placeholder="Label"
                            value={spec.label}
                            onChange={(e) => updateSpec(index, 'label', e.target.value)}
                          />
                          <Input
                            placeholder="Value"
                            value={spec.value}
                            onChange={(e) => updateSpec(index, 'value', e.target.value)}
                          />
                          <RemoveButton type="button" onClick={() => removeSpec(index)}>
                            <i className="fas fa-times"></i>
                          </RemoveButton>
                        </DynamicItem>
                      ))}
                    </DynamicList>
                    <AddItemButton type="button" onClick={addSpec}>
                      <i className="fas fa-plus"></i> Add Specification
                    </AddItemButton>
                  </FormSection>

                  <FormSection>
                    <SectionTitle>Features</SectionTitle>
                    <DynamicList>
                      {features.map((feature, index) => (
                        <DynamicItem key={index}>
                          <Input
                            placeholder="Feature"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                          />
                          <RemoveButton type="button" onClick={() => removeFeature(index)}>
                            <i className="fas fa-times"></i>
                          </RemoveButton>
                        </DynamicItem>
                      ))}
                    </DynamicList>
                    <AddItemButton type="button" onClick={addFeature}>
                      <i className="fas fa-plus"></i> Add Feature
                    </AddItemButton>
                  </FormSection>

                  <FormActions>
                    <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                    <SubmitButton type="submit">{editingProduct ? 'Update' : 'Create'} Product</SubmitButton>
                  </FormActions>
                </Form>
              </ModalContent>
            </Modal>
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default Products;
