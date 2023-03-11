import React, { useEffect, useLayoutEffect, useRef, forwardRef } from "react"
import Container from "./styled"
import photos from "./data"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useLenis } from "@studio-freight/react-lenis"

const Home = () => {
  const START = 0
  const lenis = useLenis()
  const columnRef = useRef()
  const leftColRef = useRef()
  const midColRef = useRef()
  const rightColRef = useRef()
  const imgRefs = useRef([])
  const q = ref => gsap.utils.selector(ref)

  const handleImageMouseEnter = event => {
    const current = event.currentTarget
    gsap
      .timeline({
        defaults: { duration: 1.2, ease: "expo" },
      })
      .to(
        current,
        {
          scale: 0.9,
        },
        START
      ).to(q(current)('img'), {
        scale: 1.4,
      }, START)
  }

  const handleImageMouseLeave = event => {
    const current = event.currentTarget

    gsap
      .timeline({
        defaults: { duration: 1.2, ease: "expo" },
      })
      .to(
        current,
        {
          scale: 1,
        },
        START
      ).to(q(current)('img'), {
        scale: 1,
      }, START)
  }

  const GridImage = forwardRef(({ key, data, ...props }, ref) => {
    return (
      <div ref={ref}>
        <div
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
          className="relative img-wrapper rounded-xl overflow-hidden h-[35vw] m-8 cursor-pointer"
          key={key}
        >
          <img className="img bg-cover w-full h-full" src={data.url} alt="" />
        </div>
      </div>
    )
  })

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  useEffect(() => {
    if (!lenis) return

    lenis.on("scroll", obj => {
      leftColRef.current.style.transform = `translateY(${obj.scroll}px)`
      rightColRef.current.style.transform = `translateY(${obj.scroll}px)`
      q(leftColRef.current)(".wrapper").forEach(
        el => (el.style.transform = `translateY(${obj.scroll}px)`)
      )
      q(rightColRef.current)(".wrapper").forEach(
        el => (el.style.transform = `translateY(${obj.scroll}px)`)
      )
    })

    return () => {}
  }, [lenis])

  return (
    <Container className="px-16">
      <div ref={columnRef} className="relative flex min-h-screen">
        <div
          ref={leftColRef}
          className="py-16 flex flex-col-reverse w-full h-screen items-center flex-auto"
        >
          <div className="wrapper flex flex-col">
            {[...photos].splice(0, 5).map((data, index) => (
              <GridImage
                data={data}
                ref={el => (imgRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>

        <div className="py-16 flex flex-col w-full h-full items-center">
          <div className="flex flex-col" ref={midColRef}>
            {[...photos].splice(5, 5).map((data, index) => (
              <GridImage
                data={data}
                ref={el => (imgRefs.current[(index += 5)] = el)}
              />
            ))}
          </div>
        </div>
        <div
          ref={rightColRef}
          className="py-16 flex flex-col-reverse w-full h-screen items-center"
        >
          <div className="wrapper flex flex-col">
            {[...photos].splice(10, 5).map((data, index) => (
              <GridImage
                data={data}
                ref={el => (imgRefs.current[(index += 10)] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home
