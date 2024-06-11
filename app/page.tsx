'use client'

import Image from "next/image";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosFakeApi from "./services/api/base.face";

interface Products {
  "id": number,
  "title": string,
  "price": number,
  "description": string,
  "category": string,
  "image": string,
  "rating": {
    "rate": number,
    "count": number
  };
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosFakeApi.get<Product[]>('products');        
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <Image src={product.image} alt={product.title} width={200} height={200} />
                  <h3>{product.title}</h3>
                  <p>{product.price} USD</p>
                  <Link href={`/products/${product.id}`}>
                    <p className="text-blue-500">View Product</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default  Home;