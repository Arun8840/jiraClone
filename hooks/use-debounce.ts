import React, { useEffect, useState } from "react"

interface DebounceProps {
  value: string
  delay: number
}
export const useDebounce = ({ delay, value }: DebounceProps) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}
