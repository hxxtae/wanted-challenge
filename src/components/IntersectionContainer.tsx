import { FC, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { LoadingContainer } from "./LoadingContainer"

interface Params {
  onReFetch: () => void
  rootMargin?: string
  threshold?: number
}

export const IntersectionContainer: FC<Params> = ({
  onReFetch,
  rootMargin = "0px",
  threshold = 0.01,
}) => {
  const elRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const options: IntersectionObserverInit = {
        root: null,
        rootMargin,
        threshold,
      }
      const callback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && elRef.current) {
            setLoading(true)
            setTimeout(() => {
              onReFetch()
              setLoading(false)
            }, 400)
          }
        })
      }
      observer = new IntersectionObserver(callback, options)

      if (elRef.current) {
        observer.observe(elRef.current)
      }
    }

    return () => {
      if (elRef.current && observer !== null) {
        observer.unobserve(elRef.current)
        observer.disconnect()
      }
    }
  }, [])

  return (
    <>
      <div ref={elRef} className="observerEl"></div>
      {loading && createPortal(<LoadingContainer />, document.body)}
    </>
  )
}
