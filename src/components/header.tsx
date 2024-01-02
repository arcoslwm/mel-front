import { useRouter } from "next/router";
import Image  from "next/image";
import React, { useState } from "react";
import Link from "next/link";

const Header = ({ title }: any) => {
    // console.log("Header titledesc:",title);
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();

    function onSearch() {
        const searchTerm = inputValue;
        console.log("HEADER onSearch:", searchTerm);
        // Navegar a la página de resultados de búsqueda
        router.push("/items?search=" + searchTerm);
    };
    return (
        // #fff159
        // rgba(255, 241, 89, 1)
        // bg-yellow-300
        <div className="flex items-center p-3 bg-meli-yellow">
            <Link className="" key={'home'} href={{pathname:'/'}}>
            <Image
                src="/logo__large_plus.png"
                width={134}
                height={34}
                className="block mx-5"
                alt="Logo MeLi"
                />
            </Link>
            <div className="header min-h-fit flex-col items-center">
                <input
                    type="text"
                    placeholder="Buscar"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={onSearch}>Buscar</button>
            </div>
        </div>
    );
};

export default Header;