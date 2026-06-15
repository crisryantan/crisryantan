import React, { useRef } from 'react'
import { m, useInView } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Staggered container. Wrap a list/grid in <Stagger> and each child in
 * <StaggerItem> to get a cascade as the group scrolls into view.
 */
const Stagger = ({
  children,
  as = 'div',
  stagger = 0.1,
  delayChildren = 0,
  once = true,
  amount = 0.15,
  className,
  ...rest
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  const MotionTag = m[as] || m.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export const StaggerItem = ({
  children,
  as = 'div',
  distance = 24,
  className,
  ...rest
}) => {
  const MotionTag = m[as] || m.div
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export default Stagger
