import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from './context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App/>}/>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
  </StrictMode>,
)

