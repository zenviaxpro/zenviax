import React from 'react';

const SecurityCheck: React.FC = () => {
  const envVars = Object.keys(import.meta.env).reduce((acc, key) => {
    acc[key] = key.startsWith('VITE_') 
      ? `${import.meta.env[key]?.toString().slice(0, 10)}...` 
      : '[PROTECTED]';
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="p-4 bg-red-50 rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-red-600">⚠️ Security Check (Development Only)</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Exposed Environment Variables:</h3>
          <pre className="bg-white p-4 rounded shadow text-sm">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Build Info:</h3>
          <pre className="bg-white p-4 rounded shadow text-sm">
            {JSON.stringify({
              MODE: import.meta.env.MODE,
              BASE_URL: import.meta.env.BASE_URL,
              PROD: import.meta.env.PROD,
              DEV: import.meta.env.DEV,
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SecurityCheck; 