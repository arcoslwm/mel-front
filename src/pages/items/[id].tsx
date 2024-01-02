import { Inter } from 'next/font/google';
import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Image from "next/image";
import { getItem } from '@/lib/api-client';
import Error from 'next/error'


const inter = Inter({ subsets: ['latin'] })

// type Item = {
//     id: string
//     title: string
//     price: number
//     text: string
//     plain_text: string
//     date_created: string
//     last_updated: string
// }
/**
 * https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props
 */
export const getServerSideProps = (async ({ params, query }) => {
    const itemResp = await getItem(params.id);
    console.debug("getServerSideProps itemResp", itemResp);
    if (!itemResp) {
        return { notFound: true }
    }
    else if (itemResp.item) {
        return { props: { item: itemResp.item, error: null } }
    } else {
        return { props: { error: { message: itemResp.message, statusCode: itemResp.statusCode } } };
    }
})


export default function Item({ error, item }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    if (error) {
        return <Error statusCode={error.statusCode} title={error.message} />
    }
    return (
        <main
            className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}
        >
            {item && (
                <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg p-8">
                    <div className="flex">
                        <div className="w-2/3 pr-8">
                            <img src={item.picture} alt={item.title} className="w-full rounded-lg" />
                        </div>

                        <div className="w-1/3">
                            <p className="text-sm text-gray-500">{(item.condition == 'new') ? 'Nuevo' : ''}</p>

                            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>

                            <p className="text-xl font-semibold mb-2">${item.price.amount} {item.price.currency}</p>

                            
                                <p className="text-sm text-gray-500 mb-4">{(item.free_shipping) ? 'Despacho gratis' : ''}</p>

                            <a href="" className="block bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600">
                                Comprar
                            </a>
                        </div>
                    </div>
                    {item.description && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-2">Descripción del Producto</h3>
                            <p className="text-sm text-gray-700">
                                {item.description.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}