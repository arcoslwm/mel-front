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


export default function Item({error, item }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    if (error) {
        return <Error statusCode={error.statusCode} title={error.message} />
    }
    return (
        <main
            className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}
        >
            {item && (
                <div key={item.id} className=' bg-slate-50 border rounded-md"'>
                    <div>
                        <Image
                            src={item.picture}
                            width={240}
                            height={240}
                            className="block"
                            alt={item.title}
                        />
                    </div>
                    <div>
                        <h1>nombre: {item.title}</h1>
                        <p>precio: {item.price.amount}</p>
                        <p>descripcion: {item.description}</p>
                    </div>
                </div>
            )}
        </main>
    )
}