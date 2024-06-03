import { useEffect, useState } from 'react'

const UseCurrentUrl = () => {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  return currentUrl
}

export default UseCurrentUrl
