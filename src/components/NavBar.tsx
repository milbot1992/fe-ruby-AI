import React from 'react';
import { CubeTransparentIcon } from '@heroicons/react/24/solid';

const NavBar: React.FC = () => {
    return (
        <nav className="w-full bg-white shadow-lg p-4 flex items-center border-b-2 border-gray-300">
            <CubeTransparentIcon className="h-6 w-6 text-blue-800 mr-2" aria-hidden="true" />
            <h1 className="text-blue-800 text-lg font-medium">Ruby Health Analytics Ltd</h1>
        </nav>
    );
};

export default NavBar;
