import PassWordleGame from './components/PassWordleGame.tsx';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PassWordleGame />
    </StrictMode>,
)