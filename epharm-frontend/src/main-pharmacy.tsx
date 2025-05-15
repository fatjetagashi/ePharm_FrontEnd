import React from 'react'
import ReactDOM from 'react-dom/client'
import AppPharmacy from './AppPharmacy'
import './index.css'

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <AppPharmacy />
    </React.StrictMode>
)
