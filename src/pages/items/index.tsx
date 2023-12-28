import { Inter } from 'next/font/google'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ListItem from "@/components/list-item";

const inter = Inter({ subsets: ['latin'] });

const Items = () => {
    // Obtener los datos de búsqueda
    const { search } = useRouter().query;
    console.log("Items: search:",search);

    // Obtener los resultados de la búsqueda
    const [results, setResults] = useState([]);
    
    const router = useRouter();
    const navigateToDetail = (id: string) => {
        router.push(`/items/${id}`);
    };

    // Cargar los resultados de la búsqueda
    const fetchResults = async () => {
        // Simular una solicitud de API
        // const response = await fetch(`/api/items?search=${searchTerm}`);
        // const data = await response.json();
        // const result = [] as any;
        // const data = {'items':[{'id':"mel-001"},{'id':"mel-001"}]} as any;
        const data = [{'id':"MLA1573435560", title: "Audifonos ss"},{'id':"MLA1573435560", title: "Audifonos AA"}] as any;
        // Establecer los resultados
        setResults(data);
    };

    useEffect(() => {
        fetchResults();
    }, [search]);

    return (
        <main
            // className={`flex w-4/5 min-h-screen flex-col items-center p-4 ${inter.className}`}
            className={`flex min-h-screen flex-col items-center p-4 ${inter.className}`}
        >
             <div className=' bg-slate-50 border rounded-md"'>
             <h1>Resultados de la búsqueda</h1>
                {results.map((result) => (
                    <div key={result.title}>
                        <h2>{result.id}</h2>
                        <button onClick={() => navigateToDetail(result.id)}>Ver detalle</button>
                    </div>
                ))}
                <p>======================================</p>
                <ul  role="list" className="p-6 divide-y bg-slate-50 divide-slate-200 border rounded-md">
                    {results.map((result) => (
                        <ListItem  key={"it"+result.title} itemId={result.id} itemTitle={result.title} >

                        </ListItem>
                    ))}
                </ul>
             </div>
        </main>
    );
};
export default Items;