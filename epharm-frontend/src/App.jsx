import { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/test`)
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Gabim:", err));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">ePharm Frontend 🚀</h1>
            <p>Rezultati nga backend:</p>
            <pre className="bg-gray-100 p-4 rounded">
        {data ? JSON.stringify(data, null, 2) : "Duke pritur përgjigje..."}
      </pre>
        </div>
    );
}

export default App;
