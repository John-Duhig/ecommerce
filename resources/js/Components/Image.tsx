import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Image({ src }: { src: string }) {
    const [loading, setLoading] = useState(true);

    return (
        <img
            src={src}
            className={cn(
                'aspect-square w-full bg-gray-300 object-cover',
                loading ? 'animate-pulse' : '',
            )}
            onLoad={() => {
                setLoading(false);
            }}
        />
    );
}
