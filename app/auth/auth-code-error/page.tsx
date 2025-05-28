'use client';

import { useEffect, useState } from 'react';

export default function AuthCodeErrorPage() {
    const [errorDescription, setErrorDescription] = useState('');

    useEffect(() => {
        // Parse hash fragment
        const hash = window.location.hash.substring(1); // remove '#'
        const params = new URLSearchParams(hash);
        const description = params.get('error_description');
        setErrorDescription(description ?? 'Terjadi kesalahan saat login.');
    }, []);

    return (
        <div className="p-10 text-center">
            <h1 className="text-2xl font-bold text-red-600">Login Gagal</h1>
            <p className="mt-4 text-gray-700">
                {errorDescription}
            </p>
        </div>
    );
}
