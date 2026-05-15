import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export const askKrishiSage = async (message) => {
  const response = await axios.post(
    `${API_BASE}/agri-assistant`,
    { message },
    { timeout: 60_000 } // 60s — LLM fallback chain can take a moment
  )

  const data = response.data

  // Backend returns success:false when all models are exhausted
  if (!data.success) {
    throw new Error(data.response)
  }

  return data
}