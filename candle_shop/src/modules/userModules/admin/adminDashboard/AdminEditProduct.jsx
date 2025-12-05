import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminEditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [oldImage, setOldImage] = useState("");

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setPrice(data.price);
                setDescription(data.description);
                setOldImage(data.image);
                setPreview(data.image);
            });
    }, [id]);

    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);

        if (image) {
            formData.append("image", image);
        }

        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            body: formData
        });

        if (res.ok) {
            navigate("/admin/products");
        } else {
            alert("Update failed");
        }
    }

    return (
        <div className="p-6 max-w-xl">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Product Name</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        className="w-full border p-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-medium">New Image (optional)</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />

                    {preview && (
                        <img
                            src={preview.startsWith("blob:") ? preview : oldImage}
                            className="w-32 h-32 object-cover rounded mt-3 shadow"
                            alt="preview"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 text-white rounded-lg"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}
