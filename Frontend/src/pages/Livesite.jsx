import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'

function Livesite() {
  const { id } = useParams()
  const [html, setHtml] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/web/get-by-slug/${id}`
        )

        setHtml(result.data.code)

      } catch (err) {
        console.log(err)
        setError("Site not found")
      }
    }

    handleGetWebsite()
  }, [id])

  if (error) {
    return (
      <div className='h-screen flex items-center justify-center bg-black text-white'>
        {error}
      </div>
    )
  }

  return (
    <iframe
      title='Live Site'
      srcDoc={html}
      className='w-screen h-screen border-none'
      sandbox='allow-scripts'
    />
  )
}

export default Livesite
