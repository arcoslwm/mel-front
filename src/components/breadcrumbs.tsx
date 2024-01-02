import React from 'react';

interface BreadcrumbsProps {
    items: string[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <ol className="flex items-center whitespace-nowrap bg-gray-300" aria-label="Breadcrumb">
            {items.map((item, index) => (
                <li key={index} className="inline-flex items-center">
                    {index === items.length - 1 ? (
                        <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500" href="#">
                            {item}
                        </a>
                    ) : (
                        <a className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500" href="#">
                            {item}
                            <svg
                                className="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400 dark:text-neutral-600 dark:text-neutral-600"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </a>
                    )}
                </li>
            ))}
        </ol>
    );
};

export default Breadcrumbs;;