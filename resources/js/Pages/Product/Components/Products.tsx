import Image from '@/Components/Image';
import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import { Star } from 'lucide-react';

export default function Products({ products }: { products: Product[] }) {
    return (
        <div className="container mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
                <Link
                    key={p.id}
                    className="flex flex-col bg-white p-2"
                    href={route('products.viewOne', { id: p.id })}
                >
                    <Image src={p.image} />
                    <p className="mt-2">{p.title}</p>
                    <div className="flex items-center gap-2">
                        <Star size={16} fill="#fdc700" strokeWidth={0} />
                        <span className="text-sm text-gray-600">
                            {p.rating}
                        </span>
                    </div>
                    <p className="font-medium">${p.price}</p>
                </Link>
            ))}
        </div>
    );
}
