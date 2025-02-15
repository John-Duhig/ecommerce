import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function Header({ children }: { children: ReactNode }) {
    return (
        <nav className="border-b border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex w-full">
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>

                        <div className="hidden w-full justify-between space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
