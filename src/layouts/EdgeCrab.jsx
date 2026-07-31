import { useEffect, useState } from 'react'
import crabSprite from 'src/assets/icons/crab.svg'
import styles from './EdgeCrab.module.css'

const POSITIONS = [22, 68, 38, 80, 52]

export default function EdgeCrab({ active = true, spriteUrl = '/pacman.svg'  }) {
  const [positionIndex, setPositionIndex] = useState(0)

  useEffect(() => {
    if (!active) return 

    const intervalId = window.setInterval(() => {
      setPositionIndex((index) => (index + 1) % POSITIONS.length)
    }, 2000)

    return () => window.clearInterval(intervalId)
  }, [active])

  if (!active) return null

  return (
    <img
      className={styles.crab}
      src={spriteUrl}
      alt=""
      aria-hidden="true"
      style={{ top: `${POSITIONS[positionIndex]}vh` }}
    />
  )
}



// export default function EdgeCrab({ active = true }) {
//   const [positionIndex, setPositionIndex] = useState(0);

//   useEffect(() => {
//     if (!active) return;

//     const id = setInterval(() => {
//       setPositionIndex((i) => (i + 1) % POSITIONS.length);
//     }, 2000);

//     return () => clearInterval(id);
//   }, [active]);

//   if (!active) return null;

//   return (
//     <img
//       className={styles.crab}
//       src={crabSprite}
//       alt=""
//       aria-hidden="true"
//       style={{ top: `${POSITIONS[positionIndex]}vh` }}
//     />
//   );
// }
