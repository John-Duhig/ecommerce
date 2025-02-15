export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export type Product = {
    created_at: Date;
    description: string;
    image: string;
    id: number;
    price: number;
    rating: number;
    title: string;
};
