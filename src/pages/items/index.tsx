import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import ListItem from "@/components/list-item";
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Item from './[id]';
import { searchItems } from '@/lib/api-client';
import Image  from "next/image";
import Link from "next/link";
import Error from 'next/error'

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


export default function Items ({error, categories, items }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
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
            <div className=' bg-slate-50 border rounded-md"'>
                <h1>Resultados de la búsqueda</h1>
                <ul role="list" className="p-6 divide-y bg-slate-50 divide-slate-200 border rounded-md">
                    {items.map((item) => (
                        <li key={item.id} className="flex py-3 mx-auto">
                            <Image
                                src={item.picture}
                                width={90}
                                height={90}
                                className="block h-24 w-24"
                                alt={item.title}
                            />
                            <Link className="font-semibold text-sm" key={item.id} href={{ pathname: '/items/[id]', query: { id: item.id } }}>
                                <div className="ml-2 hover:bg-slate-400">
                                    {item.price.amount}
                                    {item.title}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
