import React, { useState, useEffect, useCallback } from 'react';
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
  const [combos, setCombos] = useState([]);
  const [serviceType, setServiceType] = useState('normal');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchServices = useCallback(async () => {
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
  }, [search]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const openModal = (service = null) => {
    setEditingService(service);
    setImageFile(null);
    setImagePreview(service?.image || null);
    if (service) {
      if (service.category === 'combo') {
        setServiceType('combo');
        setCombos(service.combos || [{ name: service.name, icon: service.icon, originalPrice: service.originalPrice, price: service.price, includes: service.includes || [], popular: service.popular }]);
      } else {
        setServiceType('normal');
        reset({
          title: service.title,
          category: service.category,
          description: service.description
        });
        setSpecs(service.tiers?.map(tier => ({
          label: tier.name,
          icon: tier.icon,
          coverage: tier.coverage,
          value: tier.price,
          popular: tier.popular
        })) || []);
        setFeatures(service.benefits || []);
        setCombos([]);
      }
    } else {
      setServiceType('normal');
      reset({});
      setSpecs([]);
      setFeatures([]);
      setCombos([]);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingService(null);
    setImageFile(null);
    setImagePreview(null);
    reset({});
    setSpecs([]);
    setFeatures([]);
    setCombos([]);
    setServiceType('normal');
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
      
      let serviceData;
      
      if (serviceType === 'combo') {
        const validCombos = combos.filter(c => c.name && c.price);
        if (validCombos.length === 0) {
          toast.error('Add at least one combo package');
          return;
        }
        serviceData = {
          category: 'combo',
          combos: validCombos.map((combo, idx) => ({
            id: combo.id || `combo-${idx}`,
            name: combo.name,
            icon: combo.icon,
            includes: combo.includes || [],
            originalPrice: parseInt(combo.originalPrice),
            price: parseInt(combo.price),
            popular: combo.popular || false
          }))
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
          benefits: features,
          tiers
        };
      }
      
      Object.keys(serviceData).forEach(key => {
        submitData.append(key, typeof serviceData[key] === 'object' ? JSON.stringify(serviceData[key]) : serviceData[key]);
      });
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }
      
      if (editingService) {
        await axios.put(`${apiUrl}/api/services/${editingService._id}`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Service updated successfully');
      } else {
        await axios.post(`${apiUrl}/api/services`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
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

  const addCombo = () => setCombos([...combos, { name: '', icon: '', originalPrice: '', price: '', includes: [], popular: false }]);
  const removeCombo = (index) => setCombos(combos.filter((_, i) => i !== index));
  const updateCombo = (index, field, value) => {
    const updated = [...combos];
    updated[index][field] = value;
    setCombos(updated);
  };
  const addComboService = (comboIndex) => {
    const updated = [...combos];
    updated[comboIndex].includes = [...(updated[comboIndex].includes || []), ''];
    setCombos(updated);
  };
  const removeComboService = (comboIndex, serviceIndex) => {
    const updated = [...combos];
    updated[comboIndex].includes = updated[comboIndex].includes.filter((_, i) => i !== serviceIndex);
    setCombos(updated);
  };
  const updateComboService = (comboIndex, serviceIndex, value) => {
    const updated = [...combos];
    updated[comboIndex].includes[serviceIndex] = value;
    setCombos(updated);
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
                <CardImage src={service.image || 'https://via.placeholder.com/300x200?text=Service'} alt={service.title || 'Combo'} />
                <CardContent>
                  <CardTitle>{service.title || 'Combo Packages'}</CardTitle>
                  <CardCategory>{service.category}</CardCategory>
                  <CardPrice>₹{(service.tiers?.[0]?.price || service.combos?.[0]?.price)?.toLocaleString()}</CardPrice>
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
                          setCombos([]);
                        }}>
                          <option value="normal">Normal Service</option>
                          <option value="combo">Combo Package</option>
                        </Select>
                      </FormGroup>
                    </FormGrid>
                  </FormSection>

                  {serviceType === 'combo' ? (
                    <FormSection>
                      <SectionTitle>Combo Packages</SectionTitle>
                      <DynamicList>
                        {combos.map((combo, comboIndex) => (
                          <div key={comboIndex} style={{ border: '1px solid rgba(236, 236, 236, 0.1)', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
                            <FormGrid>
                              <FormGroup>
                                <Label>Package Name *</Label>
                                <Input
                                  placeholder="e.g., Starter Shield"
                                  value={combo.name}
                                  onChange={(e) => updateCombo(comboIndex, 'name', e.target.value)}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label>Icon *</Label>
                                <Input
                                  placeholder="e.g., fa-solid fa-layer-group"
                                  value={combo.icon}
                                  onChange={(e) => updateCombo(comboIndex, 'icon', e.target.value)}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label>Original Price (₹) *</Label>
                                <Input
                                  type="number"
                                  value={combo.originalPrice}
                                  onChange={(e) => updateCombo(comboIndex, 'originalPrice', e.target.value)}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Label>Discounted Price (₹) *</Label>
                                <Input
                                  type="number"
                                  value={combo.price}
                                  onChange={(e) => updateCombo(comboIndex, 'price', e.target.value)}
                                />
                              </FormGroup>
                              <CheckboxLabel>
                                <Checkbox
                                  type="checkbox"
                                  checked={combo.popular}
                                  onChange={(e) => updateCombo(comboIndex, 'popular', e.target.checked)}
                                />
                                Mark as Popular
                              </CheckboxLabel>
                            </FormGrid>

                            <div style={{ marginTop: '15px' }}>
                              <Label>Included Services</Label>
                              <DynamicList>
                                {combo.includes?.map((service, serviceIndex) => (
                                  <DynamicItem key={serviceIndex}>
                                    <Input
                                      placeholder="Service Name (e.g., Basic PPF)"
                                      value={service}
                                      onChange={(e) => updateComboService(comboIndex, serviceIndex, e.target.value)}
                                    />
                                    <RemoveButton type="button" onClick={() => removeComboService(comboIndex, serviceIndex)}>
                                      <i className="fas fa-times"></i>
                                    </RemoveButton>
                                  </DynamicItem>
                                ))}
                              </DynamicList>
                              <AddItemButton type="button" onClick={() => addComboService(comboIndex)}>
                                <i className="fas fa-plus"></i> Add Service
                              </AddItemButton>
                            </div>

                            <RemoveButton type="button" onClick={() => removeCombo(comboIndex)} style={{ marginTop: '10px', width: '100%' }}>
                              <i className="fas fa-trash"></i> Remove Package
                            </RemoveButton>
                          </div>
                        ))}
                      </DynamicList>
                      <AddItemButton type="button" onClick={addCombo}>
                        <i className="fas fa-plus"></i> Add Combo Package
                      </AddItemButton>
                    </FormSection>
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
                            <Label>Service Image *</Label>
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
