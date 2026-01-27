import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white p-5 space-y-4">
                <h2 className="text-xl font-bold">Admin Panel</h2>

                <nav className="space-y-3">
                    <Link to="/admin/products" className="block hover:text-blue-300">
                        Products
                    </Link>
                    <Link to="/admin/orders" className="block hover:text-blue-300">
                        Orders
                    </Link>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
}
