import React from 'react'
import ReactDOM from 'react-dom/client'
import RandomQuoteMachine from './RandomQuoteMachine.tsx'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RandomQuoteMachine />
    </QueryClientProvider>
  </React.StrictMode>,
)
