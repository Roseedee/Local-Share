import { useEffect, useRef } from 'react'
import { SharedProvider } from './SharedContext'

import FileList from './FileLise'

import '../style/App.css'

import Layout from './layout/Layout'

function App() {

  const calledRef = useRef(false);


  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
  }, []);

  return (
    <SharedProvider>

      <Layout>
        <FileList></FileList>
      </Layout>
    </SharedProvider>

  )
}

export default App
