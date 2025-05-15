import React from 'react'
import ReactDOM from 'react-dom/client'
import AppPatient from './App'
import './index.css'

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <AppPatient />
    </React.StrictMode>
)
