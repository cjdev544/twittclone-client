import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'

import client from './apolloClient'
import AuthState from './context/authState'
import App from './App'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <AuthState>
      <App />
    </AuthState>
  </ApolloProvider>
)
