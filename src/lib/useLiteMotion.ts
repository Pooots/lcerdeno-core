import { useEffect, useState } from 'react'

/** Phones, tablets and other touch devices get lighter (fewer, cheaper) animations. */
const QUERY = '(max-width: 767px), (hover: none) and (pointer: coarse)'

export function useLiteMotion(): boolean {
  const [lite, setLite] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setLite(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return lite
}
