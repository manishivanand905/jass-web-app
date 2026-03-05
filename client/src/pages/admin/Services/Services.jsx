import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminLayout from '../../../components/admin/AdminLayout/AdminLayout';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container, Header, Title, HeaderActions, SearchBar, AddButton, Grid, Card, CardImage, CardContent, CardTitle,
  CardCategory, CardPrice, CardBadge, CardActions, ActionButton, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalTitle, CloseButton, Form, FormSection, SectionTitle, FormGrid, FormGroup, Label, Input, Select, Textarea,
  Checkbox, CheckboxLabel, DynamicList, DynamicItem, RemoveButton, AddItemButton, FormActions, CancelButton,
  SubmitButton, EmptyState
} from './ServicesStyles';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [search, setSearch] = useState('');
  const [specs, setSpecs] = useState([]);
  const [features, setFeatures] = useState([]);
  const [serviceType, setServiceType] = useState('normal');
  
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();

  useEffect(() => {
    fetchServices();
  }, [search]);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${apiUrl}/api/services`, {
        params: { search },
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(data);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (service = null) => {
    setEditingService(service);
    if (service) {
      if (service.category === 'combo') {
        setServiceType('combo');
        reset({
          name: service.name,
          icon: service.icon,
          originalPrice: service.originalPrice,
          price: service.price,
          popular: service.popular
        });
        setFeatures(service.includes || []);
      } else {
        setServiceType('normal');
        reset({
          title: service.title,
          category: service.category,
          description: service.description,
          image: service.image
        });
        setSpecs(service.tiers?.map(tier => ({
          label: tier.name,
          icon: tier.icon,
          coverage: tier.coverage,
          value: tier.price,
          popular: tier.popular
        })) || []);
        setFeatures(service.benefits || []);
      }
    } else {
      setServiceType('normal');
      reset({});
      setSpecs([]);
      setFeatures([]);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingService(null);
    reset({});
    setSpecs([]);
    setFeatures([]);
  };

  const onSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      let serviceData;
      if (serviceType === 'combo') {
        serviceData = {
          category: 'combo',
          name: formData.name,
          icon: formData.icon,
          includes: features,
          originalPrice: parseInt(formData.originalPrice),
          price: parseInt(formData.price),
          popular: formData.popular || false
        };
      } else {
        const tiers = specs.map((spec, idx) => ({
          id: `${formData.category}-${idx}`,
          name: spec.label,
          icon: spec.icon,
          coverage: spec.coverage,
          price: parseInt(spec.value),
          tier: spec.label.toLowerCase().replace(/\s+/g, '-'),
          popular: spec.popular || false
        }));
        
        serviceData = {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          image: formData.image,
          benefits: features,
          tiers
        };
      }
      
      if (editingService) {
        await axios.put(`${apiUrl}/api/services/${editingService._id}`, serviceData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Service updated successfully');
      } else {
        await axios.post(`${apiUrl}/api/services`, serviceData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Service created successfully');
      }
      closeModal();
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.delete(`${apiUrl}/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service');
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
          <Title>SERVICE MANAGEMENT</Title>
          <HeaderActions>
            <SearchBar
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <AddButton onClick={() => openModal()}>
              <i className="fas fa-plus"></i> Add Service
            </AddButton>
          </HeaderActions>
        </Header>

        {loading ? (
          <EmptyState><i className="fas fa-spinner fa-spin"></i></EmptyState>
        ) : services.length === 0 ? (
          <EmptyState>
            <i className="fas fa-tools"></i>
            <p>No services found. Add your first service!</p>
          </EmptyState>
        ) : (
          <Grid>
            {services.map(service => (
              <Card key={service._id} $unavailable={!service.available}>
                {service.featured && <CardBadge>FEATURED</CardBadge>}
                <CardImage src={service.image || 'https://via.placeholder.com/300x200?text=Combo+Package'} alt={service.title || service.name} />
                <CardContent>
                  <CardTitle>{service.title || service.name}</CardTitle>
                  <CardCategory>{service.category}</CardCategory>
                  <CardPrice>₹{(service.price || service.tiers?.[0]?.price || service.originalPrice)?.toLocaleString()}</CardPrice>
                  <CardActions>
                    <ActionButton onClick={() => openModal(service)}>
                      <i className="fas fa-edit"></i> Edit
                    </ActionButton>
                    <ActionButton $danger onClick={() => deleteService(service._id)}>
                      <i className="fas fa-trash"></i> Delete
                    </ActionButton>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}

        {modalOpen && (
          <>
            <ModalOverlay onClick={closeModal} />
            <Modal>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>{editingService ? 'Edit Service' : 'Add Service'}</ModalTitle>
                  <CloseButton onClick={closeModal}><i className="fas fa-times"></i></CloseButton>
                </ModalHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormSection>
                    <SectionTitle>Service Type</SectionTitle>
                    <FormGrid>
                      <FormGroup>
                        <Label>Type *</Label>
                        <Select value={serviceType} onChange={(e) => {
                          setServiceType(e.target.value);
                          reset({});
                          setSpecs([]);
                          setFeatures([]);
                        }}>
                          <option value="normal">Normal Service</option>
                          <option value="combo">Combo Package</option>
                        </Select>
                      </FormGroup>
                    </FormGrid>
                  </FormSection>

                  {serviceType === 'combo' ? (
                    <>
                      <FormSection>
                        <SectionTitle>Combo Package Details</SectionTitle>
                        <FormGrid>
                          <FormGroup>
                            <Label>Package Name *</Label>
                            <Input {...register('name', { required: true })} placeholder="e.g., Starter Shield" />
                            {errors.name && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                          </FormGroup>
                          <FormGroup>
                            <Label>Icon *</Label>
                            <Input {...register('icon', { required: true })} placeholder="e.g., fa-solid fa-layer-group" />
                            {errors.icon && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                          </FormGroup>
                          <FormGroup>
                            <Label>Original Price (₹) *</Label>
                            <Input type="number" {...register('originalPrice', { required: true, min: 0 })} />
                            {errors.originalPrice && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                          </FormGroup>
                          <FormGroup>
                            <Label>Discounted Price (₹) *</Label>
                            <Input type="number" {...register('price', { required: true, min: 0 })} />
                            {errors.price && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                          </FormGroup>
                          <CheckboxLabel>
                            <Checkbox type="checkbox" {...register('popular')} />
                            Mark as Popular
                          </CheckboxLabel>
                        </FormGrid>
                      </FormSection>

                      <FormSection>
                        <SectionTitle>Included Services</SectionTitle>
                        <DynamicList>
                          {features.map((feature, index) => (
                            <DynamicItem key={index}>
                              <Input
                                placeholder="Service Name (e.g., Basic PPF)"
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
                          <i className="fas fa-plus"></i> Add Service
                        </AddItemButton>
                      </FormSection>
                    </>
                  ) : (
                    <>
                      <FormSection>
                        <SectionTitle>Basic Information</SectionTitle>
                        <FormGrid>
                          <FormGroup>
                            <Label>Service Name *</Label>
                            <Input {...register('title', { required: true })} />
                            {errors.title && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                          </FormGroup>
                          <FormGroup>
                            <Label>Category *</Label>
                            <Input {...register('category', { required: true })} placeholder="e.g., ppf, ceramic, interior" />
                            {errors.category && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                          </FormGroup>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <Label>Image URL *</Label>
                            <Input {...register('image', { required: true })} />
                            {errors.image && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                          </FormGroup>
                          <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <Label>Description *</Label>
                            <Textarea {...register('description', { required: true })} rows="4" />
                            {errors.description && <span style={{ color: '#f44336', fontSize: '0.85rem' }}>Required</span>}
                          </FormGroup>
                        </FormGrid>
                      </FormSection>

                      <FormSection>
                        <SectionTitle>Benefits</SectionTitle>
                        <DynamicList>
                          {features.map((feature, index) => (
                            <DynamicItem key={index} $isBenefit>
                              <Input
                                placeholder="Benefit"
                                value={feature}
                                onChange={(e) => updateFeature(index, e.target.value)}
                              />
                              <RemoveButton $isBenefit type="button" onClick={() => removeFeature(index)}>
                                <i className="fas fa-times"></i>
                              </RemoveButton>
                            </DynamicItem>
                          ))}
                        </DynamicList>
                        <AddItemButton type="button" onClick={addFeature}>
                          <i className="fas fa-plus"></i> Add Benefit
                        </AddItemButton>
                      </FormSection>

                      <FormSection>
                        <SectionTitle>Service Tiers</SectionTitle>
                        <DynamicList>
                          {specs.map((spec, index) => (
                            <DynamicItem key={index}>
                              <Input
                                placeholder="Tier Name (e.g., Basic Interior)"
                                value={spec.label}
                                onChange={(e) => updateSpec(index, 'label', e.target.value)}
                              />
                              <Input
                                placeholder="Icon (e.g., fa-solid fa-broom)"
                                value={spec.icon || ''}
                                onChange={(e) => updateSpec(index, 'icon', e.target.value)}
                              />
                              <Input
                                placeholder="Coverage"
                                value={spec.coverage || ''}
                                onChange={(e) => updateSpec(index, 'coverage', e.target.value)}
                              />
                              <Input
                                placeholder="Price"
                                type="number"
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
                          <i className="fas fa-plus"></i> Add Tier
                        </AddItemButton>
                      </FormSection>
                    </>
                  )}

                  <FormActions>
                    <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                    <SubmitButton type="submit">{editingService ? 'Update' : 'Create'} Service</SubmitButton>
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

export default Services;
