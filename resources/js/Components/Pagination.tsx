import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export type PaginationLinks = {
    active: boolean;
    label: string;
    url: string;
};

export default function Pagination({ links }: { links: PaginationLinks[] }) {
    return (
        <nav className="mx-auto mt-4 flex w-max rounded bg-white px-4 py-2">
            {links.map((link, index) => (
                <Link
                    key={index}
                    preserveScroll
                    href={link.url}
                    className={cn(
                        'flex items-center justify-center rounded-lg px-3 py-2 text-sm text-gray-600',
                        link.active ? 'bg-gray-200' : '',
                        !link.url ? '!text-gray-300' : '',
                    )}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
