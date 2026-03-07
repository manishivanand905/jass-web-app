import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../../services/user/api';
import Sidebar from '../../../components/common/Sidebar/Sidebar';
import { Container, Header, Title, Subtitle, FilterBar, SearchInput, OrderCard, StatusPill, OrderHeader, OrderId, ProductItem, ProductImage, ProductInfo, ProductName, Timeline, TimelineRow, SectionTitle, AddressBox, PriceRow, TotalRow, ActionRow, ActionButton, NoOrders } from './MyOrdersStyles';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await userAPI.getUserOrders();
      if (response.success) {
        setOrders(response.orders);
      }
    } catch (error) {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filter === 'all' || o.status.toLowerCase() === filter;
    const matchesSearch = o.orderId?.toLowerCase().includes(search.toLowerCase()) || o.items?.some(item => item.name?.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <Sidebar>
        <Container>
          <Header>
            <div>
              <Title><span>Your</span> Orders</Title>
              <Subtitle>Loading orders...</Subtitle>
            </div>
          </Header>
        </Container>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <Container>
        <Header>
          <div>
            <Title><span>Your</span> Orders</Title>
            <Subtitle>{orders.length} orders found</Subtitle>
          </div>
        </Header>

        <FilterBar>
          <SearchInput>
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchInput>
          {(search || filter !== 'all') && (
            <button onClick={() => { setSearch(''); setFilter('all'); }} style={{ padding: '10px 20px', background: 'rgba(204,0,0,0.1)', border: '1px solid #cc0000', borderRadius: '6px', color: '#cc0000', cursor: 'pointer', fontFamily: 'Barlow Condensed', fontSize: '0.85rem', fontWeight: '700' }}>
              <i className="fa-solid fa-xmark" /> Clear
            </button>
          )}
        </FilterBar>

        {filteredOrders.length === 0 ? (
          <NoOrders>
            <i className="fa-solid fa-box-open" />
            <h2>No Orders Found</h2>
            <p>{filter !== 'all' ? `No ${filter} orders found` : "You haven't placed any orders yet. Start shopping today!"}</p>
            <button onClick={() => navigate('/products')}>
              <i className="fa-solid fa-shopping-bag" /> Browse Products
            </button>
          </NoOrders>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard key={order._id} $status={order.status}>
              <OrderHeader>
                <div>
                  <StatusPill $status={order.status}>{order.status.toUpperCase()}</StatusPill>
                  <OrderId>REF: #{order.orderId}</OrderId>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Ordered on: {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </OrderHeader>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', marginBottom: '20px' }}>
                {order.items.map((item, idx) => (
                  <ProductItem key={idx}>
                    <ProductImage src={item.image} alt={item.name} />
                    <ProductInfo>
                      <ProductName>{item.name}</ProductName>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '5px' }}>
                        <span style={{ color: '#cc0000', fontSize: '1rem', fontWeight: '700' }}>₹{item.price}</span>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>× {item.quantity}</span>
                        <span style={{ color: '#ECECEC', fontSize: '0.9rem', fontWeight: '600' }}>= ₹{item.price * item.quantity}</span>
                      </div>
                    </ProductInfo>
                  </ProductItem>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', marginBottom: '20px' }}>
                <SectionTitle>ORDER TIMELINE</SectionTitle>
                <Timeline>
                  <TimelineRow>
                    <span>Order Placed</span>
                    <span>{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </TimelineRow>
                  {order.status === 'completed' && (
                    <TimelineRow>
                      <span>Delivered <i className="fa-solid fa-circle-check" style={{ color: '#27ae60', marginLeft: '5px' }} /></span>
                      <span>{new Date(order.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </TimelineRow>
                  )}
                </Timeline>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', marginBottom: '20px' }}>
                <SectionTitle>DELIVERY ADDRESS</SectionTitle>
                <AddressBox>
                  {order.deliveryType === 'pickup' ? (
                    <p>Store Pickup</p>
                  ) : (
                    <>
                      <p><strong>{order.customerName}</strong></p>
                      <p>{order.customerPhone}</p>
                      <p>{order.deliveryAddress?.addressLine}</p>
                      <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}</p>
                    </>
                  )}
                </AddressBox>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', marginBottom: '20px' }}>
                <SectionTitle>PRICE BREAKDOWN</SectionTitle>
                <PriceRow>
                  <span>Subtotal</span>
                  <span>₹{order.totalAmount}</span>
                </PriceRow>
                <PriceRow>
                  <span>Delivery</span>
                  <span>₹0 (Free)</span>
                </PriceRow>
                <TotalRow>
                  <strong>Total</strong>
                  <strong>₹{order.totalAmount}</strong>
                </TotalRow>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', marginBottom: '20px' }}>
                <SectionTitle>PAYMENT METHOD</SectionTitle>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ECECEC', fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-money-bill-wave" style={{ color: '#cc0000' }} /> Cash on Delivery (COD)
                </p>
              </div>

              <ActionRow>
                <ActionButton $variant="ghost">View Details</ActionButton>
                {order.status === 'processing' && (
                  <>
                    <ActionButton $variant="ghost"><i className="fa-solid fa-location-dot" /> Track Order</ActionButton>
                    <ActionButton $variant="danger">Cancel Order</ActionButton>
                  </>
                )}
                {order.status === 'shipped' && (
                  <ActionButton $variant="ghost"><i className="fa-solid fa-location-dot" /> Track Order</ActionButton>
                )}
                {order.status === 'completed' && (
                  <>
                    <ActionButton $variant="ghost"><i className="fa-solid fa-download" /> Download Invoice</ActionButton>
                    <ActionButton $variant="primary"><i className="fa-solid fa-rotate-right" /> Reorder</ActionButton>
                  </>
                )}
                {order.status === 'cancelled' && (
                  <ActionButton $variant="primary"><i className="fa-solid fa-rotate-right" /> Reorder</ActionButton>
                )}
              </ActionRow>
            </OrderCard>
          ))
        )}
      </Container>
    </Sidebar>
  );
};

export default MyOrders;
