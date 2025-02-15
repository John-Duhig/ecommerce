import { Product } from '@/types';
import { Star } from 'lucide-react';
import { ReactNode } from 'react';

export default function SingleProduct({
    product: { title, price, image, description, rating },
    deleteButton,
}: {
    product: Product;
    deleteButton?: ReactNode;
}) {
    return (
        <div className="container flex justify-center">
            <div className="inline-block p-10">
                <div className="flex justify-between text-2xl font-bold">
                    <h2>{title}</h2>
                    <h2>${price}</h2>
                </div>
                {image && (
                    <img
                        src={image}
                        className="mt-6 max-h-[50vh] min-w-[50vw] max-w-full bg-gray-200 object-contain"
                    />
                )}
                <div className="mt-4 flex">
                    <div className="w-0 grow">
                        <div>
                            <span className="text-gray-500">Description</span>
                            <p>{description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star size={16} fill="#fdc700" strokeWidth={0} />
                            <p>{rating}</p>
                        </div>
                    </div>
                </div>

                {deleteButton}
            </div>
        </div>
    );
}
