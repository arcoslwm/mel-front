import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function Custom404() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center p-4 ${inter.className}`}
        >
            <div className="text-center pb-44 mb-24">
                <h1 className="text-4xl font-bold mb-2">404</h1>
                <div>
                    <h2 className="text-lg font-medium">Page Not Found</h2>
                </div>
            </div>
        </main>
    )
}