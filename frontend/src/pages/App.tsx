import { useEffect, useRef } from 'react'

import FileList from './FileLise'

import '../style/App.css'

import Layout from '../layout/Layout'

function App() {

  const calledRef = useRef(false);


  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
  }, []);

  return (
    <Layout>
      <FileList></FileList>
    </Layout>
  )
}

export default App
