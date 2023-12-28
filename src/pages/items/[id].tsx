import { Inter } from 'next/font/google';
import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Image from "next/image";
import { getItem } from '@/lib/api-client';


const inter = Inter({ subsets: ['latin'] })

type Item = {
    id: string
    title: string
    price: number
    text: string
    plain_text: string
    date_created: string
    last_updated: string
}
/**
 * https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props
 */
export const getServerSideProps = (async ({params, query}) => {
    // serverSide exec
    // console.debug("getServerSideProps context:",context);
    // console.debug("getServerSideProps context.params:", params);
    console.debug("======================================");
    
    // Fetch data from external API
    const itemDesc = await getItem(params.id);
    if (!itemDesc) {
        return { notFound: true }
    }
    // console.debug("getServerSideProps getItem:",itemDesc);

    const item = {
        id: params.id,
        title: "audifonos-" + params.id,
        price: 1590,
        ...itemDesc,
    }
    // Pass data to the page via props
    return { props: { item } }
}) satisfies GetServerSideProps<{ item: Item }>


export default function Item({ item, }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    //client Exec
    console.debug("###itemDetail: ", item);

    return (
        <main
            className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}
        >
            {item && (
                <div className=' bg-slate-50 border rounded-md"'>
                    <div>
                        <Image
                            src="https://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg"
                            // ref="https://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg"
                            width={150}
                            height={150}
                            className="block"
                            alt="Logo MeLi" />
                    </div>
                    <div>
                        <h1>HTML!Item: {item.id}</h1>
                        <h1>nombre: {item.title}</h1>
                        <p>precio: {item.price}</p>
                        <p>descripcion: {item.plain_text}</p>
                    </div>
                </div>
            )}
        </main>
    )
}