import { SnackbarProvider } from 'notistack'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRoot } from './app/AppRoot.tsx'
import { store } from './app/store.ts'
import { ColorModeProvider } from './app/theme/ColorModeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ColorModeProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={4000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <BrowserRouter>
            <AppRoot />
          </BrowserRouter>
        </SnackbarProvider>
      </ColorModeProvider>
    </Provider>
  </StrictMode>,
)
