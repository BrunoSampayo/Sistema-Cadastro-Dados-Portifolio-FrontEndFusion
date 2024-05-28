export async function imgVerification(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    if (!response.ok) {
      return false
    }
    const contentType = response.headers.get('Content-Type')
    return !!contentType && contentType.startsWith('image/')
  } catch (error) {
    return false
  }
}
