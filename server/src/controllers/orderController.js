export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;


        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });


        order.status = status;
        await order.save();


        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};