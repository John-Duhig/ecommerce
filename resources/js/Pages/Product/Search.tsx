import Header from '@/Components/Header';
import NavLink from '@/Components/NavLink';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import ProductLayout from '@/Layouts/ProductLayout';
import Products from '@/Pages/Product/Components/Products';
import { PaginatedProps } from '@/Pages/Product/ViewAll';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Search({
    pagination,
}: {
    pagination?: PaginatedProps;
}) {
    const { data, setData, get } = useForm({
        query: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        get(route('products.search'));
    };

    return (
        <ProductLayout>
            <Head title="Browse products" />
            <Header>
                <NavLink
                    href={route('products.viewAll')}
                    active={route().current('products.viewAll')}
                >
                    Products
                </NavLink>
                <div className="flex items-center gap-2">
                    <Link
                        href={route('login')}
                        className="h-max rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                    >
                        Log in
                    </Link>
                    <Link
                        href={route('register')}
                        className="h-max rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                    >
                        Register
                    </Link>
                </div>
            </Header>
            <div className="container flex items-center justify-between px-8 pt-10">
                <h1 className="text-2xl font-bold">Browse</h1>
                <form onSubmit={submit}>
                    <TextInput
                        id="search"
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={data.query}
                        onChange={(e) => {
                            setData('query', e.target.value);
                        }}
                        className="flex h-10 w-64 items-center rounded-full border border-gray-300 bg-white pl-4"
                    />
                </form>
            </div>
            {pagination && pagination?.data?.length > 0 ? (
                <div className="p-8">
                    <Products products={pagination.data} />
                    {pagination.meta && (
                        <Pagination links={pagination.meta.links} />
                    )}
                </div>
            ) : (
                <div className="container px-8">No products found</div>
            )}
        </ProductLayout>
    );
}
