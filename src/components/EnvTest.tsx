import React from 'react';

const EnvTest: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Environment Variables Test</h2>
      <pre className="bg-white p-4 rounded shadow">
        {JSON.stringify({
          SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL?.slice(0, 10) + '...',
          EVOLUTION_API_URL: import.meta.env.VITE_EVOLUTION_API_URL?.slice(0, 10) + '...',
          APP_URL: import.meta.env.VITE_APP_URL,
          NODE_ENV: import.meta.env.MODE,
        }, null, 2)}
      </pre>
    </div>
  );
};

export default EnvTest; 