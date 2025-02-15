import UploadProduct from '@/Pages/Product/UploadProduct';
import { Product } from '@/types';

export default function EditProduct({ product }: { product: Product }) {
    return <UploadProduct product={product} />;
}
