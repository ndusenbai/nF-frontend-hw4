'use client'
import React, { useEffect, useState } from 'react';
import axiosFakeApi from '@/app/services/api/base.face';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface Props {
    params: {
        id: string;
    };
}

const ProductDetail: React.FC<Props> = ({ params }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosFakeApi.get<Product>(`products/${params.id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>No product found</div>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <div className="mt-4">
                <img
                    src={product.image}
                    alt={product.title}
                    className="max-w-full h-auto" // Устанавливаем максимальную ширину и автоматическую высоту
                    style={{ maxWidth: '50%', height: 'auto' }} // Встроенные стили для установки максимальной ширины и автоматической высоты
                />
            </div>
            <p className="mt-4 text-gray-600">{product.description}</p>
            <p className="mt-2 text-gray-700">Price: ${product.price.toFixed(2)}</p>
            <p className="mt-1 text-gray-700">Category: {product.category}</p>
            <p className="mt-1 text-gray-700">Rating: {product.rating.rate} ({product.rating.count} votes)</p>
        </div>
    );
};

export default ProductDetail;
