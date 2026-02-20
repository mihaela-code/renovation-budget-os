'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

export default function Home() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')

      if (error) {
        setMessage('Error: ' + error.message)
      } else {
        setMessage('Connected to Supabase ✅ Projects count: ' + data.length)
      }
    }

    testConnection()
  }, [])

  return (
    <main style={{ padding: 40 }}>
      <h1>Renovation Budget OS</h1>
      <p>{message}</p>
    </main>
  )
}
