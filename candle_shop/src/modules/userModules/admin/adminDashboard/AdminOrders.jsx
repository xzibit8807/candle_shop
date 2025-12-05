import { useEffect, useState } from "react";
const exportCSV = () => {
    const header = "OrderID,User,Items,Total,Status,Date";
    const rows = orders.map(o =>
        `${o._id},${o.user.name},${o.items.length},${o.totalPrice},${o.status},${new Date(o.createdAt).toLocaleString()}`
    );
    const csv = [header, ...rows].join("");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `orders-${Date.now()}.csv`;
    link.click();
};


if (loading) return <p>Loading...</p>;


return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Orders Dashboard</h1>
            <Button onClick={exportCSV} className="flex items-center gap-2">
                <Download size={18} /> Export CSV
            </Button>
        </div>


        {orders.map(order => (
            <Card key={order._id} className="shadow-xl rounded-2xl">
                <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Order ID: {order._id}</p>
                        <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>


                    <p><strong>User:</strong> {order.user?.name}</p>
                    <p><strong>Total:</strong> {order.totalPrice.toFixed(2)} лв</p>
                    <p><strong>Items:</strong> {order.items.length}</p>


                    <div className="flex gap-2 mt-3">
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
                </CardContent>
            </Card>
        ))}
    </div>
);
