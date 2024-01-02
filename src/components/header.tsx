import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

const Header = ({ title }: any) => {
    // console.log("Header titledesc:",title);
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            router.push("/items?search=" + inputValue);
        }
    }

    function onSearch() {
        const searchTerm = inputValue;
        router.push("/items?search=" + searchTerm);
    };
    return (
        <div className="flex items-center justify-center p-3 bg-meli-yellow">
            <div className="max-w-screen-lg w-full flex items-center justify-center">
                <Link className="mx-5" href={{ pathname: "/" }}>
                    <Image
                        src="/logo__large_plus.png"
                        width={134}
                        height={34}
                        alt="Logo MeLi"
                    />
                </Link>
                <div className="flex w-96 bg-white rounded-lg overflow-hidden">
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full px-4 py-3 focus:outline-none"
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={onSearch}
                        className="flex items-center justify-center px-4 bg-gray-200"
                    >
                        <p className="text-sm text-gray-500">
                            Buscar
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;