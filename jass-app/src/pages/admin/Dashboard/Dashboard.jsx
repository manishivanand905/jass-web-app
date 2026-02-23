import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { adminAPI } from "../../../services/admin/api";
import { showToast } from "../../../components/common/Toast/toastConfig";
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import ProductModal from "../../../components/admin/ProductModal/ProductModal";
import AdminLayout from "../../../components/admin/AdminLayout/AdminLayout";
import AdminOverview from "../../../components/admin/AdminOverview/AdminOverview";
import { mockProducts, mockBookings } from "../../../data/adminData";
import {
  Section,
  SectionHeader,
  SectionTitle,
  ActionButton,
  SearchBar,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  StatusBadge,
  ActionButtons,
  IconButton,
  Pagination,
  PageButton,
  EmptyState
} from "./DashboardStyles";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState(mockProducts);
  const [bookings, setBookings] = useState(mockBookings);
  const [loading, setLoading] = useState(false);
  const [productPage, setProductPage] = useState(1);
  const [bookingPage, setBookingPage] = useState(1);
  const [productSearch, setProductSearch] = useState("");
  const [bookingSearch, setBookingSearch] = useState("");
  const [productModal, setProductModal] = useState({
    open: false,
    product: null,
  });
  const [totalPages, setTotalPages] = useState({ products: 1, bookings: 1 });

  const { admin } = useAuth();
  const navigate = useNavigate();

  const loadStats = useCallback(async () => {
    const response = await adminAPI.getStats();
    if (response.success) return response.stats;
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      setProducts(mockProducts);
      setTotalPages((prev) => ({ ...prev, products: 1 }));
    } catch (error) {
      showToast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    try {
      setBookings(mockBookings);
      setTotalPages((prev) => ({ ...prev, bookings: 1 }));
    } catch (error) {
      showToast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!admin) navigate("/admin/login");
    else loadStats();
  }, [admin, navigate, loadStats]);

  useEffect(() => {
    if (activeTab === "products") loadProducts();
  }, [activeTab, loadProducts]);

  useEffect(() => {
    if (activeTab === "bookings") loadBookings();
  }, [activeTab, loadBookings]);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await adminAPI.deleteProduct(id);
      if (response.success) {
        showToast.success("Product deleted successfully");
        loadProducts();
      } else {
        showToast.error(response.message || "Failed to delete product");
      }
    } catch (error) {
      showToast.error("An error occurred");
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    const updatedBookings = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updatedBookings);
    showToast.success("Booking status updated");
  };

  const getPageTitle = () => {
    switch(activeTab) {
      case 'overview': return 'OVERVIEW';
      case 'products': return 'PRODUCTS';
      case 'bookings': return 'BOOKINGS';
      default: return 'OVERVIEW';
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab} pageTitle={getPageTitle()}>
      {activeTab === "overview" && <AdminOverview onTabChange={setActiveTab} />}

      {activeTab === "products" && (
          <Section>
            <SectionHeader>
              <SectionTitle>Product Management</SectionTitle>
              <ActionButton
                onClick={() => setProductModal({ open: true, product: null })}
              >
                <i className="fas fa-plus" />
                Add Product
              </ActionButton>
            </SectionHeader>

            <SearchBar
              type="text"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => {
                setProductSearch(e.target.value);
                setProductPage(1);
              }}
            />

            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "40px",
                }}
              >
                <LoadingSpinner size="40px" />
              </div>
            ) : products.length > 0 ? (
              <>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Category</TableHeader>
                      <TableHeader>Price</TableHeader>
                      <TableHeader>Stock</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <ActionButtons>
                            <IconButton
                              onClick={() =>
                                setProductModal({ open: true, product })
                              }
                            >
                              <i className="fas fa-edit" />
                            </IconButton>
                            <IconButton
                              $variant="danger"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <i className="fas fa-trash" />
                            </IconButton>
                          </ActionButtons>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>

                <Pagination>
                  <PageButton
                    onClick={() => setProductPage((prev) => prev - 1)}
                    disabled={productPage === 1}
                  >
                    <i className="fas fa-chevron-left" />
                  </PageButton>
                  {[...Array(totalPages.products)].map((_, i) => (
                    <PageButton
                      key={i}
                      $active={productPage === i + 1}
                      onClick={() => setProductPage(i + 1)}
                    >
                      {i + 1}
                    </PageButton>
                  ))}
                  <PageButton
                    onClick={() => setProductPage((prev) => prev + 1)}
                    disabled={productPage === totalPages.products}
                  >
                    <i className="fas fa-chevron-right" />
                  </PageButton>
                </Pagination>
              </>
            ) : (
              <EmptyState>
                <i className="fas fa-box-open" />
                <p>No products found</p>
              </EmptyState>
            )}
          </Section>
        )}

      {activeTab === "bookings" && (
          <Section>
            <SectionHeader>
              <SectionTitle>Booking Management</SectionTitle>
            </SectionHeader>

            <SearchBar
              type="text"
              placeholder="Search bookings..."
              value={bookingSearch}
              onChange={(e) => {
                setBookingSearch(e.target.value);
                setBookingPage(1);
              }}
            />

            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "40px",
                }}
              >
                <LoadingSpinner size="40px" />
              </div>
            ) : bookings.length > 0 ? (
              <>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Customer</TableHeader>
                      <TableHeader>Service</TableHeader>
                      <TableHeader>Date</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>
                          {new Date(booking.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <StatusBadge $status={booking.status}>
                            {booking.status}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
                          <ActionButtons>
                            {booking.status === "pending" && (
                              <IconButton
                                onClick={() =>
                                  handleUpdateBookingStatus(
                                    booking.id,
                                    "confirmed",
                                  )
                                }
                              >
                                <i className="fas fa-check" />
                              </IconButton>
                            )}
                            {booking.status === "confirmed" && (
                              <IconButton
                                onClick={() =>
                                  handleUpdateBookingStatus(
                                    booking.id,
                                    "completed",
                                  )
                                }
                              >
                                <i className="fas fa-check-double" />
                              </IconButton>
                            )}
                            <IconButton
                              $variant="danger"
                              onClick={() =>
                                handleUpdateBookingStatus(
                                  booking.id,
                                  "cancelled",
                                )
                              }
                            >
                              <i className="fas fa-times" />
                            </IconButton>
                          </ActionButtons>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>

                <Pagination>
                  <PageButton
                    onClick={() => setBookingPage((prev) => prev - 1)}
                    disabled={bookingPage === 1}
                  >
                    <i className="fas fa-chevron-left" />
                  </PageButton>
                  {[...Array(totalPages.bookings)].map((_, i) => (
                    <PageButton
                      key={i}
                      $active={bookingPage === i + 1}
                      onClick={() => setBookingPage(i + 1)}
                    >
                      {i + 1}
                    </PageButton>
                  ))}
                  <PageButton
                    onClick={() => setBookingPage((prev) => prev + 1)}
                    disabled={bookingPage === totalPages.bookings}
                  >
                    <i className="fas fa-chevron-right" />
                  </PageButton>
                </Pagination>
              </>
            ) : (
              <EmptyState>
                <i className="fas fa-calendar-times" />
                <p>No bookings found</p>
              </EmptyState>
            )}
          </Section>
        )}

      {productModal.open && (
        <ProductModal
          product={productModal.product}
          onClose={() => setProductModal({ open: false, product: null })}
          onSuccess={() => {
            setProductModal({ open: false, product: null });
            loadProducts();
          }}
        />
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
