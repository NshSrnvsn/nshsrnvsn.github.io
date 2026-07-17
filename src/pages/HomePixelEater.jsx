import React, { useEffect, useRef } from 'react'
import styles from './HomePixelEater.module.css'

const CELL_SIZE = 22
const BITE_RADIUS = 58
const BITE_ARC = Math.PI * 0.42
const SPRITE_SIZE = 112

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function wrapAngle(angle) {
  let result = angle
  while (result > Math.PI) result -= Math.PI * 2
  while (result < -Math.PI) result += Math.PI * 2
  return result
}

export default function HomePixelEater({ active = true, spriteUrl = '/pacman.svg' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const sprite = new Image()
    sprite.src = spriteUrl

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      cols: 0,
      rows: 0,
      eaten: new Set(),
      robot: { x: 0, y: 0, angle: 0 },
      pointer: { x: 0, y: 0, active: false },
      time: 0,
      spriteReady: false,
    }

    let rafId = 0

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const dpr = window.devicePixelRatio || 1

      state.width = width
      state.height = height
      state.dpr = dpr
      state.cols = Math.ceil(width / CELL_SIZE)
      state.rows = Math.ceil(height / CELL_SIZE)
      state.eaten = new Set()
      state.robot.x = width * 0.16
      state.robot.y = height * 0.42

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.imageSmoothingEnabled = false
    }

    sprite.onload = () => {
      state.spriteReady = true
    }

    if (sprite.complete) {
      state.spriteReady = true
    }

    const onPointerMove = (event) => {
      state.pointer.x = event.clientX
      state.pointer.y = event.clientY
      state.pointer.active = true
    }

    const drawRobot = (x, y, angle) => {
      context.save()
      context.translate(x, y)
      context.rotate(angle)

      if (state.spriteReady) {
        context.drawImage(
          sprite,
          -SPRITE_SIZE / 2,
          -SPRITE_SIZE / 2,
          SPRITE_SIZE,
          SPRITE_SIZE
        )
      }

      context.restore()
    }

    const draw = () => {
      const { width, height, cols, rows, eaten, robot, pointer } = state

      context.clearRect(0, 0, width, height)

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const key = `${col}:${row}`
          if (eaten.has(key)) continue

          const x = col * CELL_SIZE
          const y = row * CELL_SIZE
          const shimmer = 0.06 + ((col + row) % 7) * 0.008

          context.fillStyle = `rgba(26, 26, 24, ${shimmer})`
          context.fillRect(x, y, CELL_SIZE - 1, CELL_SIZE - 1)
        }
      }

      state.time += 1

      const targetX = pointer.active
        ? pointer.x
        : width * (0.22 + 0.56 * (0.5 + 0.5 * Math.sin(state.time * 0.0032)))
      const targetY = pointer.active
        ? pointer.y
        : height * (0.42 + 0.13 * Math.sin(state.time * 0.0018))

      const dx = targetX - robot.x
      const dy = targetY - robot.y
      const nextAngle = Math.atan2(dy, dx)

      robot.x += dx * 0.045
      robot.y += dy * 0.045
      robot.angle += wrapAngle(nextAngle - robot.angle) * 0.16

      const minCol = clamp(Math.floor((robot.x - BITE_RADIUS) / CELL_SIZE), 0, cols - 1)
      const maxCol = clamp(Math.ceil((robot.x + BITE_RADIUS) / CELL_SIZE), 0, cols - 1)
      const minRow = clamp(Math.floor((robot.y - BITE_RADIUS) / CELL_SIZE), 0, rows - 1)
      const maxRow = clamp(Math.ceil((robot.y + BITE_RADIUS) / CELL_SIZE), 0, rows - 1)

      for (let row = minRow; row <= maxRow; row += 1) {
        for (let col = minCol; col <= maxCol; col += 1) {
          const centerX = col * CELL_SIZE + CELL_SIZE / 2
          const centerY = row * CELL_SIZE + CELL_SIZE / 2
          const distance = Math.hypot(centerX - robot.x, centerY - robot.y)
          if (distance > BITE_RADIUS) continue

          const direction = Math.atan2(centerY - robot.y, centerX - robot.x)
          if (Math.abs(wrapAngle(direction - robot.angle)) < BITE_ARC) {
            eaten.add(`${col}:${row}`)
          }
        }
      }

      if (state.spriteReady) {
        drawRobot(robot.x, robot.y, robot.angle)
      }
      rafId = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mousedown', onPointerMove)
    rafId = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mousedown', onPointerMove)
      window.cancelAnimationFrame(rafId)
    }
  }, [active, spriteUrl])

  if (!active) return null

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}