import React, { useState, useEffect } from 'react';
import SignupForm  from './components/SignupForm';
import Verify2FA   from './components/Verify2FA';
import LoginForm   from './components/LoginForm';
import axios       from 'axios';

function App() {
  const [step, setStep]         = useState('signup');
  const [userId, setUserId]     = useState(null);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    if (step === 'home') {
      axios.get('/test')
           .then(res => setTestResult(res.data.message))
           .catch(console.error);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gray-50">
      {step === 'signup' && (
        <SignupForm
          onCodeSent={id => {
            setUserId(id);
            setStep('verify');
          }}
          onSwitchToLogin={() => setStep('login')}
        />
      )}

      {step === 'verify' && (
        <Verify2FA
          userId={userId}
          onVerified={() => setStep('login')}
        />
      )}

      {step === 'login' && (
        <LoginForm
          onLoggedIn={() => setStep('home')}
          onSwitchToSignup={() => setStep('signup')}
        />
      )}

      {step === 'home' && (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">✅ You’re logged in!</h2>
          <p>Backend says:</p>
          <pre className="bg-gray-100 p-4 rounded">
            {testResult || 'Loading...'}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
