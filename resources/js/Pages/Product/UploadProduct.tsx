import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Product } from '@/types';
import { Button, Field, Fieldset, Input, Textarea } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Image, Plus } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

export default function UploadProduct({ product }: { product?: Product }) {
    const [preview, setPreview] = useState(product?.image ?? '');

    const { data, setData, post, errors } = useForm<{
        id: number;
        title: string;
        description: string;
        rating: number;
        price: number;
        image: File | null;
    }>({
        id: product?.id ?? 0,
        title: product?.title ?? '',
        description: product?.description ?? '',
        rating: product?.rating ?? 1,
        price: product?.price ?? 1,
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        product
            ? post(route('products.update', { id: product?.id }))
            : post(route('products.store'));
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(preview);
        };
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title={product ? 'Edit product' : 'Upload a product'} />
            <div className="mx-auto flex max-w-5xl flex-col rounded-lg border bg-white p-8">
                <h2 className="flex justify-between text-2xl font-bold">
                    {product ? 'Edit product' : 'Upload a product'}
                    {product?.id && <DeleteButton id={product.id} />}
                </h2>
                <form onSubmit={submit}>
                    <Fieldset className="flex flex-col gap-5">
                        <Field className="relative">
                            <span>Image</span>
                            <InputLabel
                                htmlFor="image"
                                className="mt-2 flex h-60 w-full cursor-pointer flex-col items-center rounded-md border border-gray-300 py-4"
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        className="size-full object-contain"
                                    />
                                ) : (
                                    <>
                                        <Image className="aspect-video size-full text-gray-300" />
                                        <span className="flex items-center gap-2 text-lg font-bold text-gray-400">
                                            <Plus size={20} />
                                            Upload an image
                                        </span>
                                    </>
                                )}
                            </InputLabel>
                            <Input
                                id="image"
                                type="file"
                                name="image"
                                className="hidden"
                                accept="image/png, image/jpeg"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setPreview(
                                            URL.createObjectURL(
                                                e.target.files[0],
                                            ),
                                        );
                                        const file = e.target.files.item(0);
                                        setData('image', file);
                                    }
                                }}
                            />
                            <InputError
                                message={errors.image}
                                className="mt-2"
                            />
                        </Field>
                        <Field>
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                required
                                value={data.title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </Field>

                        <Field>
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <Textarea
                                id="description"
                                name="description"
                                required
                                value={data.description}
                                className="mt-1 block w-full rounded-md border border-gray-300"
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </Field>

                        <Field>
                            <InputLabel htmlFor="rating" value="Rating" />
                            <TextInput
                                id="rating"
                                type="number"
                                min={1}
                                max={5}
                                step={0.1}
                                name="rating"
                                required
                                value={data.rating}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData(
                                        'rating',
                                        parseFloat(e.target.value),
                                    )
                                }
                            />
                            <InputError
                                message={errors.rating}
                                className="mt-2"
                            />
                        </Field>

                        <Field>
                            <InputLabel htmlFor="price" value="Price" />
                            <TextInput
                                id="price"
                                type="number"
                                name="price"
                                step={0.1}
                                required
                                value={data.price}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData('price', parseFloat(e.target.value))
                                }
                            />
                            <InputError
                                message={errors.price}
                                className="mt-2"
                            />
                        </Field>

                        <Button
                            type="submit"
                            className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
                        >
                            Upload
                        </Button>
                    </Fieldset>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

function DeleteButton({ id }: { id: number }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const { delete: destroy, processing } = useForm();

    const confirmDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteProduct: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('products.destroy', { id }));
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    return (
        <div className="mt-2 flex justify-end">
            <Button
                type="submit"
                className="rounded-md border border-red-400 px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                onClick={confirmDeletion}
            >
                Delete
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteProduct} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your product?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your product is deleted, all of its resources and
                        data will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end gap-4">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton disabled={processing}>
                            Delete
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
