// src/pages/Orders.tsx
import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";

interface Order {
  id: string;
  date: string;
  status: string;
  items: string[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Replace with API call
    setOrders([
      { id: "ORD123", date: "2025-08-01", status: "Shipped", items: ["Product 1", "Product 2"] },
      { id: "ORD124", date: "2025-08-05", status: "Delivered", items: ["Product 3"] },
    ]);
  }, []);

  const getStatusBadge = (status: string) => {
    if (status === "Shipped") return <Badge bg="warning">{status}</Badge>;
    if (status === "Delivered") return <Badge bg="success">{status}</Badge>;
    return <Badge bg="secondary">{status}</Badge>;
  };

  return (
    <div className="orders-page container mt-5 pt-4">
      <h3>My Orders</h3>
      <Table bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.items.join(", ")}</td>
              <td>{getStatusBadge(order.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
