import Pagination, { PaginationLinks } from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Products from '@/Pages/Product/Components/Products';
import Search from '@/Pages/Product/Search';
import { PageProps, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export type PaginatedProps = {
    data: Product[];
    links: {
        first: string;
        last: string;
        next: string;
        prev: string;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: PaginationLinks[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
};

export default function ViewAll({
    pagination,
    auth,
}: PageProps<{ current_page: number; pagination: PaginatedProps }>) {
    return (
        <>
            {auth.user ? (
                <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Products
                        </h2>
                    }
                    extra={
                        <Link
                            href={route('products.create')}
                            className="flex items-center gap-2 rounded-md border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                        >
                            <Plus size={16} /> Upload product
                        </Link>
                    }
                >
                    <Head
                        title={`Products - ${pagination.meta.current_page}`}
                    />
                    <Products products={pagination.data} />
                    {pagination.meta && (
                        <Pagination links={pagination.meta.links} />
                    )}
                </AuthenticatedLayout>
            ) : (
                <Search pagination={pagination} />
            )}
        </>
    );
}
