import { createCanvas } from 'canvas'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')

function drawIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = '#020709'
  ctx.fillRect(0, 0, size, size)

  // Subtle radial glow
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size * 0.6)
  gradient.addColorStop(0, 'rgba(99,102,241,0.2)')
  gradient.addColorStop(1, 'rgba(99,102,241,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  // "Z" letter
  ctx.fillStyle = '#6366f1'
  ctx.font = `bold ${Math.round(size * 0.65)}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Z', size / 2, size / 2)

  return canvas
}

function drawOG() {
  const w = 1200, h = 630
  const canvas = createCanvas(w, h)
  const ctx = canvas.getContext('2d')

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, '#020709')
  bg.addColorStop(0.5, '#0d0f1a')
  bg.addColorStop(1, '#0a0518')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'
  ctx.lineWidth = 1
  for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
  for (let y = 0; y < h; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }

  // Label
  ctx.fillStyle = '#6366f1'
  ctx.font = '24px sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('SET IT. IT GROWS.', 80, 220)

  // Heading
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 96px serif'
  ctx.fillText('Zenth', 80, 330)

  // Subheading
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '32px sans-serif'
  ctx.fillText('Your autonomous SEO agent.', 80, 390)

  // Pills
  const pills = ['3× traffic', '94% time saved', '1-2hr setup']
  let pillX = 80
  ctx.font = '20px sans-serif'
  ctx.textBaseline = 'middle'
  pills.forEach((label) => {
    const tw = ctx.measureText(label).width
    const pw = tw + 48, ph = 44, pr = 22
    ctx.beginPath()
    ctx.moveTo(pillX + pr, 460 - ph / 2)
    ctx.arcTo(pillX + pw, 460 - ph / 2, pillX + pw, 460 + ph / 2, pr)
    ctx.arcTo(pillX + pw, 460 + ph / 2, pillX, 460 + ph / 2, pr)
    ctx.arcTo(pillX, 460 + ph / 2, pillX, 460 - ph / 2, pr)
    ctx.arcTo(pillX, 460 - ph / 2, pillX + pw, 460 - ph / 2, pr)
    ctx.closePath()
    ctx.fillStyle = 'rgba(99,102,241,0.15)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(99,102,241,0.3)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = '#e8f0f4'
    ctx.fillText(label, pillX + 24, 460)
    pillX += pw + 16
  })

  // Z monogram (right side)
  ctx.fillStyle = 'rgba(99,102,241,0.15)'
  ctx.font = 'bold 260px serif'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(99,102,241,0.4)'
  ctx.shadowBlur = 120
  ctx.fillText('Z', w - 80, h / 2)
  ctx.shadowBlur = 0

  return canvas
}

// Generate icons
const icon32 = drawIcon(32)
fs.writeFileSync(path.join(publicDir, 'favicon.png'), icon32.toBuffer('image/png'))

const icon180 = drawIcon(180)
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), icon180.toBuffer('image/png'))

// Generate OG image
const og = drawOG()
fs.writeFileSync(path.join(publicDir, 'og.png'), og.toBuffer('image/png'))

console.log('✓ public/favicon.png (32×32)')
console.log('✓ public/apple-touch-icon.png (180×180)')
console.log('✓ public/og.png (1200×630)')
