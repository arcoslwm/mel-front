import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Item from './[id]';
import { searchItems } from '@/lib/api-client';
import Image from "next/image";
import Link from "next/link";
import Error from 'next/error'
import Breadcrumbs from '@/components/breadcrumbs';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps = (async ({ params, query }) => {
    // serverSide exec
    let error = null;
    const searchQuery: string = query.search;

    const searchResult = await searchItems(searchQuery);
    console.debug("getServerSideProps:searchResult:", searchResult);

    if (searchResult.statusCode) {
        console.debug("searchResult.statusCode so ERROR!");
        error = { message: searchResult.message, statusCode: searchResult.statusCode };
    }

    return { props: { error: error, categories: searchResult.categories || null, items: searchResult.items || null } }

}) satisfies GetServerSideProps<{ error: any, categories: any, items: any }>


export default function Items({ error, categories, items }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    if (error) {
        return <Error statusCode={error.statusCode} title={error.message} />
    }
    const router = useRouter();
    const navigateToDetail = (id: string) => {
        router.push(`/items/${id}`);
    };

    return (
        <main
            className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}
        >
            <div className=' bg-slate-50 rounded-md"'>
                <Breadcrumbs items={categories} />
                <ul role="list" className="p-6 divide-y bg-slate-50 divide-slate-200 border rounded-md">
                    {items.map((item) => (
                        <li className="flex items-center w-full border-b border-gray-200 py-4">
                            <Link className="flex w-full" href={{ pathname: '/items/[id]', query: { id: item.id } }}>
                                <div className="flex-shrink-0 mr-4">
                                    <Image src={item.picture} alt={item.title} width={112} height={112} />
                                </div>

                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>

                                    <p className="text-gray-700 font-medium mb-2">${item.price.amount} {item.price.currency}</p>

                                    <p className="text-sm text-gray-500">
                                        {(item.condition == 'new') ? 'Nuevo' : ''}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {(item.free_shipping) ? 'Despacho gratis' : ''}
                                    </p>
                                </div>
                            </Link>
                        </li>

                    ))}
                </ul>
            </div>
        </main>
    );
}
