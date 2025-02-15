import Header from '@/Components/Header';
import NavLink from '@/Components/NavLink';
import ProductLayout from '@/Layouts/ProductLayout';
import SingleProduct from '@/Pages/Product/Components/SingleProduct';
import EditProduct from '@/Pages/Product/EditProduct';
import { PageProps, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function ViewOne({
    product,
    auth,
}: PageProps<{ product: Product }>) {
    return (
        <>
            {auth.user ? (
                <EditProduct product={product} />
            ) : (
                <ProductLayout>
                    <Head title={product.title} />
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

                    <SingleProduct product={product} />
                </ProductLayout>
            )}
        </>
    );
}
