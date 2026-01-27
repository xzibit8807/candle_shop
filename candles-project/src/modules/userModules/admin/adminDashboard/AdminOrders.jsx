import { useEffect, useState } from "react";
import axios from "axios";
import { Download } from "lucide-react";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/orders")
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const updateStatus = async (id, newStatus) => {
        await axios.put(`http://localhost:5000/api/orders/${id}`, { status: newStatus });

        setOrders(prev =>
            prev.map(order =>
                order._id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    const exportCSV = () => {
        const header = "OrderID,User,Items,Total,Status,Date";
        const rows = orders.map(o =>
            `${o._id},${o.user?.name ?? ""},${o.items.length},${o.totalPrice},${o.status},${new Date(o.createdAt).toLocaleString()}`
        );
        const csv = [header, ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `orders-${Date.now()}.csv`;
        link.click();
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Orders Dashboard</h1>

                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                >
                    <Download size={18} /> Export CSV
                </button>
            </div>

            {orders.map(order => (
                <div
                    key={order._id}
                    className="shadow-xl rounded-2xl border p-4 space-y-3 bg-white"
                >
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Order ID: {order._id}</p>
                        <p className="text-sm text-gray-400">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>

                    <p><strong>User:</strong> {order.user?.name}</p>
                    <p><strong>Total:</strong> {order.totalPrice.toFixed(2)} лв</p>
                    <p><strong>Items:</strong> {order.items.length}</p>

                    <select
                        className="border rounded-xl p-2"
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            ))}
        </div>
    );
}
