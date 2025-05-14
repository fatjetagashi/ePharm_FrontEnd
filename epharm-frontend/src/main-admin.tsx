import React from 'react'
import ReactDOM from 'react-dom/client'
import AppAdmin from './AppAdmin'
import './index.css'

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <AppAdmin />
    </React.StrictMode>
)
