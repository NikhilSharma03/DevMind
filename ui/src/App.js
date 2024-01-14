import React, { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from './components/Layout/Layout'

import AppRouter from './setup/routes-manager'

import { AutoAuthHandler } from './redux/actions/user'

function App() {
  const dispatch = useDispatch()
  const onAutoAuthHandler = () => dispatch(AutoAuthHandler())

  useEffect(() => {
    onAutoAuthHandler()
  }, [])

  return (
    <HashRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </HashRouter>
  )
}

export default App
