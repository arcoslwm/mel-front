import React, { useState } from "react";
import Link from "next/link";
import Image  from "next/image";

const ListItem = (props: any) => {
    console.log("ListItem: ",props);
    const {itemId, itemTitle} = props;
    return (
        <li key={itemId} className="flex py-3 mx-auto">
            {/* <!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
            <img class="w-16 md:w-32 lg:w-48" src="..."></img> */}
            <Image
                src="https://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg"
                // ref="https://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg"
                width={90}
                height={90}
                className="block h-24 w-24"
                alt="Logo MeLi"
            />
            <div className="ml-2 hover:bg-slate-400">
                <Link className="font-semibold text-sm" key={itemTitle} href={{pathname:'/items/[id]',query:{id:itemId}}}>
                    List Item: {itemTitle}
                </Link>

            </div>
        </li>
    );
};

export default ListItem;