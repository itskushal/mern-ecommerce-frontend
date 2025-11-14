export default function Orders() {
  // ✅ Temporary mock orders (later we use backend)
  const orders = [
    {
      id: "ORD123456",
      amount: 1299,
      date: "2025-02-10",
      status: "Delivered",
    },
    {
      id: "ORD987654",
      amount: 2499,
      date: "2025-02-14",
      status: "Pending",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-xl">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow p-4 rounded-lg">
              <p className="text-xl font-semibold">Order ID: {order.id}</p>
              <p>Total Amount: ₹{order.amount}</p>
              <p>Date: {order.date}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
