// src/main-doctor.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppDoctor from './AppDoctor'
import './index.css'       // or whatever global CSS you use

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <AppDoctor />
    </React.StrictMode>
)
