const escapeXml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const formatDateTime = (value) => {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-GB');
};

const formatDate = (value) => {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB');
};

const buildWorksheetXml = (name, columns, rows) => {
  const headerCells = columns.map((column) => `
      <Cell ss:StyleID="header"><Data ss:Type="String">${escapeXml(column)}</Data></Cell>`).join('');

  const rowXml = rows.map((row) => `
    <Row>
      ${row.map((cell) => `<Cell><Data ss:Type="String">${escapeXml(cell)}</Data></Cell>`).join('')}
    </Row>`).join('');

  return `
  <Worksheet ss:Name="${escapeXml(name)}">
    <Table>
      <Row>${headerCells}
      </Row>
      ${rowXml}
    </Table>
  </Worksheet>`;
};

const createWorkbookXml = (worksheets) => `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook
  xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:html="http://www.w3.org/TR/REC-html40">
  <Styles>
    <Style ss:ID="header">
      <Interior ss:Color="#C90000" ss:Pattern="Solid" />
      <Font ss:Bold="1" ss:Color="#FFFFFF" />
    </Style>
  </Styles>
  ${worksheets.join('')}
</Workbook>`;

const orderColumns = [
  'Order ID',
  'Record ID',
  'Created At',
  'Updated At',
  'Customer Name',
  'Customer Email',
  'Customer Phone',
  'User Name',
  'User Email',
  'Delivery Type',
  'Order Status',
  'Payment Status',
  'Total Amount',
  'Items Count',
  'Items Summary',
  'Product Names',
  'Product Quantities',
  'Product Prices',
  'Delivery Name',
  'Delivery Phone',
  'Address Line',
  'City',
  'State',
  'Pincode'
];

const bookingColumns = [
  'Booking ID',
  'Record ID',
  'Created At',
  'Updated At',
  'Customer Name',
  'Customer Email',
  'Customer Phone',
  'User Name',
  'User Email',
  'Service',
  'Service Type',
  'Service Tier',
  'Service Package',
  'Booking Date',
  'Time Slot',
  'Car Brand',
  'Car Model',
  'Car Year',
  'Car Type',
  'Car Color',
  'Pickup Option',
  'Is Combo',
  'Original Price',
  'Total Amount',
  'Status',
  'Payment Status',
  'Notes'
];

const orderRows = (orders) => orders.map((order) => {
  const items = Array.isArray(order.items) ? order.items : [];
  const delivery = order.deliveryAddress || {};

  return [
    order.orderId,
    order._id,
    formatDateTime(order.createdAt),
    formatDateTime(order.updatedAt),
    order.customerName,
    order.customerEmail,
    order.customerPhone,
    order.user?.name || '',
    order.user?.email || '',
    order.deliveryType,
    order.status,
    order.paymentStatus,
    order.totalAmount,
    items.length,
    items.map((item) => `${item.name} x${item.quantity} @ ${item.price}`).join(' | '),
    items.map((item) => item.name).join(', '),
    items.map((item) => item.quantity).join(', '),
    items.map((item) => item.price).join(', '),
    delivery.fullName,
    delivery.phone,
    delivery.addressLine,
    delivery.city,
    delivery.state,
    delivery.pincode
  ];
});

const bookingRows = (bookings) => bookings.map((booking) => [
  booking.bookingId,
  booking._id,
  formatDateTime(booking.createdAt),
  formatDateTime(booking.updatedAt),
  booking.customerName,
  booking.customerEmail,
  booking.customerPhone,
  booking.user?.name || '',
  booking.user?.email || '',
  booking.service,
  booking.serviceType,
  booking.serviceTier,
  booking.servicePackage,
  formatDate(booking.date),
  booking.timeSlot,
  booking.carBrand,
  booking.carModel,
  booking.carYear,
  booking.carType,
  booking.carColor,
  booking.pickupOption,
  booking.isCombo ? 'Yes' : 'No',
  booking.originalPrice ?? '',
  booking.totalAmount,
  booking.status,
  booking.paymentStatus,
  booking.notes
]);

export const downloadAdminExport = ({
  orders = [],
  bookings = [],
  includeOrders,
  includeBookings,
  filenamePrefix = 'jass-admin-export'
}) => {
  const worksheets = [];

  if (includeOrders) {
    worksheets.push(buildWorksheetXml('Orders', orderColumns, orderRows(orders)));
  }

  if (includeBookings) {
    worksheets.push(buildWorksheetXml('Bookings', bookingColumns, bookingRows(bookings)));
  }

  const workbook = createWorkbookXml(worksheets);
  const blob = new Blob([workbook], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateLabel = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `${filenamePrefix}-${dateLabel}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
