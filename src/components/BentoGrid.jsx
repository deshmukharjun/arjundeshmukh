import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  bentoIntro,
  bentoRole,
  bentoQuote,
  bentoTechStack,
  bentoContact,
  profile,
} from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/** GitHub contribution graph dark theme colors (matches github.com dark) */
const GITHUB_DARK_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']

const cardBase =
  'rounded-2xl bg-surface-900/80 border border-surface-800/60 p-3 sm:p-4 flex flex-col overflow-hidden h-full min-h-0'

/** Official brand SVG icons for tech stack (Simple Icons / brand guidelines) */
const techIcons = {
  React: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#61DAFB" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.236-2.235 2.236 2.236 0 0 1 2.235 2.235Z" />
      <path d="M12 21.954c-.075 0-.15-.004-.225-.011-.3-.022-.595-.07-.882-.142-.285-.07-.565-.164-.834-.28a5.964 5.964 0 0 1-.717-.358 11.94 11.94 0 0 1-.578-.408 12.022 12.022 0 0 1-2.438-2.245 11.911 11.911 0 0 1-1.704-2.576 5.976 5.976 0 0 1-.358-.717 5.851 5.851 0 0 1-.28-.834c-.072-.287-.12-.582-.142-.882-.007-.075-.011-.15-.011-.225 0-.075.004-.15.011-.225.022-.3.07-.595.142-.882.07-.285.164-.565.28-.834.066-.135.14-.265.223-.39.08-.12.168-.234.261-.345.094-.11.19-.216.297-.315.106-.1.214-.194.327-.282.113-.088.23-.17.354-.246.247-.153.506-.28.776-.378.27-.098.55-.168.834-.21.284-.041.572-.054.861-.036.29.018.576.063.857.135.281.072.556.17.822.293.267.123.524.27.768.44.244.17.475.362.69.575.216.213.415.446.594.697.18.25.339.518.475.801.136.283.249.579.336.886.088.307.15.623.185.944.035.32.043.644.024.968a11.896 11.896 0 0 1-.185.968 5.976 5.976 0 0 1-.336.886 5.851 5.851 0 0 1-.475.801 12.022 12.022 0 0 1-.594.697 11.94 11.94 0 0 1-.69.575 5.964 5.964 0 0 1-.768.44 5.851 5.851 0 0 1-.822.293c-.281.072-.567.117-.857.135-.29.018-.577.005-.861-.036a5.976 5.976 0 0 1-.834-.21 5.964 5.964 0 0 1-.776-.378 5.851 5.851 0 0 1-.354-.246 12.022 12.022 0 0 1-.327-.282 11.94 11.94 0 0 1-.297-.315 5.976 5.976 0 0 1-.261-.345 5.851 5.851 0 0 1-.223-.39c-.116-.269-.21-.549-.28-.834-.072-.287-.12-.582-.142-.882-.007-.075-.011-.15-.011-.225 0-.075.004-.15.011-.225.022-.3.07-.595.142-.882.07-.285.164-.565.28-.834.066-.135.14-.265.223-.39.081-.12.168-.234.261-.345.093-.11.19-.216.297-.315.106-.1.214-.194.327-.282.113-.088.23-.17.354-.246.247-.153.506-.28.776-.378.27-.098.55-.168.834-.21.284-.041.572-.054.861-.036.29.018.576.063.857.135.281.072.556.17.822.293.267.123.524.27.768.44.244.17.475.362.69.575.216.213.415.446.594.697.18.25.339.518.475.801.136.283.249.579.336.886.088.307.15.623.185.944.035.32.043.644.024.968-.019.324-.067.648-.153.968-.086.32-.21.634-.372.94-.163.305-.354.598-.574.877-.22.279-.468.543-.743.792-.275.248-.576.48-.9.696-.324.215-.67.413-1.037.594-.367.18-.753.342-1.156.486-.403.144-.822.27-1.254.377-.432.107-.875.195-1.327.263-.452.068-.91.116-1.372.144-.462.028-.925.036-1.387.024Z" />
      <path d="M8.597 20.34a.298.298 0 0 1-.207-.085.302.302 0 0 1 0-.426l8.168-8.168a.302.302 0 0 1 .426 0 .302.302 0 0 1 0 .426l-8.168 8.168a.298.298 0 0 1-.219.085Z" />
      <path d="M15.403 20.34a.298.298 0 0 1-.219-.085l-8.168-8.168a.302.302 0 0 1 0-.426.302.302 0 0 1 .426 0l8.168 8.168a.302.302 0 0 1 0 .426.298.298 0 0 1-.207.085Z" />
      <path d="M5.762 15.896c-.075 0-.15-.004-.225-.011-.3-.022-.595-.07-.882-.142a5.976 5.976 0 0 1-.717-.358 11.94 11.94 0 0 1-.578-.408 12.022 12.022 0 0 1-2.438-2.245 11.911 11.911 0 0 1-1.704-2.576 5.976 5.976 0 0 1-.358-.717 5.851 5.851 0 0 1-.28-.834c-.072-.287-.12-.582-.142-.882-.007-.075-.011-.15-.011-.225 0-.075.004-.15.011-.225.022-.3.07-.595.142-.882.07-.285.164-.565.28-.834.066-.135.14-.265.223-.39.08-.12.168-.234.261-.345.094-.11.19-.216.297-.315.106-.1.214-.194.327-.282.113-.088.23-.17.354-.246.247-.153.506-.28.776-.378.27-.098.55-.168.834-.21.284-.041.572-.054.861-.036.29.018.576.063.857.135.281.072.556.17.822.293.267.123.524.27.768.44.244.17.475.362.69.575.216.213.415.446.594.697.18.25.339.518.475.801.136.283.249.579.336.886.088.307.15.623.185.944.035.32.043.644.024.968a11.896 11.896 0 0 1-.185.968 5.976 5.976 0 0 1-.336.886 5.851 5.851 0 0 1-.475.801 12.022 12.022 0 0 1-.594.697 11.94 11.94 0 0 1-.69.575 5.964 5.964 0 0 1-.768.44 5.851 5.851 0 0 1-.822.293c-.281.072-.567.117-.857.135-.29.018-.577.005-.861-.036a5.976 5.976 0 0 1-.834-.21 5.964 5.964 0 0 1-.776-.378 5.851 5.851 0 0 1-.354-.246 12.022 12.022 0 0 1-.327-.282 11.94 11.94 0 0 1-.297-.315 5.976 5.976 0 0 1-.261-.345 5.851 5.851 0 0 1-.223-.39c-.116-.269-.21-.549-.28-.834-.072-.287-.12-.582-.142-.882-.007-.075-.011-.15-.011-.225 0-.075.004-.15.011-.225.022-.3.07-.595.142-.882.07-.285.164-.565.28-.834.066-.135.14-.265.223-.39.081-.12.168-.234.261-.345.093-.11.19-.216.297-.315.106-.1.214-.194.327-.282.113-.088.23-.17.354-.246.247-.153.506-.28.776-.378.27-.098.55-.168.834-.21.284-.041.572-.054.861-.036.29.018.576.063.857.135.281.072.556.17.822.293.267.123.524.27.768.44.244.17.475.362.69.575.216.213.415.446.594.697.18.25.339.518.475.801.136.283.249.579.336.886.088.307.15.623.185.944.035.32.043.644.024.968-.019.324-.067.648-.153.968-.086.32-.21.634-.372.94-.163.305-.354.598-.574.877-.22.279-.468.543-.743.792-.275.248-.576.48-.9.696-.324.215-.67.413-1.037.594-.367.18-.753.342-1.156.486-.403.144-.822.27-1.254.377-.432.107-.875.195-1.327.263-.452.068-.91.116-1.372.144-.462.028-.925.036-1.387.024Z" />
      <path d="M18.238 15.896c-.462.012-.925.004-1.387-.024-.462-.028-.92-.076-1.372-.144-.452-.068-.875-.156-1.327-.263-.432-.107-.851-.233-1.254-.377-.403-.144-.789-.306-1.156-.486-.367-.18-.713-.379-1.037-.594-.324-.215-.625-.448-.9-.696-.275-.248-.523-.513-.743-.792-.22-.279-.411-.572-.574-.877a5.976 5.976 0 0 1-.372-.94c-.086-.32-.134-.644-.153-.968-.019-.324-.011-.648.024-.968.035-.321.097-.637.185-.944.087-.307.2-.603.336-.886.136-.283.295-.551.475-.801.18-.251.378-.484.594-.697.215-.213.446-.405.69-.575.244-.17.501-.317.768-.44.266-.123.541-.221.822-.293.281-.072.567-.117.857-.135.29-.018.577-.005.861.036.284.042.564.112.834.21.27.098.529.225.776.378.124.076.241.158.354.246.113.088.221.182.327.282.106.099.203.205.297.315.093.111.18.225.261.345.083.125.157.255.223.39.116.269.21.549.28.834.072.287.12.582.142.882.007.075.011.15.011.225 0 .075-.004.15-.011.225-.022.3-.07.595-.142.882-.07.285-.164.565-.28.834a5.976 5.976 0 0 1-.358.717 11.911 11.911 0 0 1-1.704 2.576 12.022 12.022 0 0 1-2.438 2.245 11.94 11.94 0 0 1-.578.408 5.964 5.964 0 0 1-.717.358c-.287.072-.582.12-.882.142-.075.007-.15.011-.225.011Z" />
    </svg>
  ),
  'Three.js': (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45v6.9L12 19.82l-6.9-3.45v-6.9L12 4.18zM4 8.82l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5zM12 9.32L5.1 5.82 12 2.18l6.9 3.64L12 9.32z" />
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  Android: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#3DDC84" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.523 15.341c-.551 0-.999.448-.999 1s.448 1 .999 1 .999-.448.999-1-.448-1-.999-1zm-11.046 0c-.551 0-.999.448-.999 1s.448 1 .999 1 .999-.448.999-1-.448-1-.999-1zm11.404-6.02l1.997-3.459a.416.416 0 00-.152-.567.416.416 0 00-.568.152L17.355 9.03c-1.022-1.436-2.666-2.43-4.531-2.643l.769-2.999c.07-.273-.14-.535-.42-.605-.28-.07-.535.14-.605.419l-.75 2.924a7.603 7.603 0 00-2.476 0l-.75-2.924c-.07-.279-.325-.489-.605-.419-.28.07-.49.332-.42.605l.769 2.999c-1.865.213-3.509 1.207-4.531 2.643L4.842 6.447a.416.416 0 00-.568-.152.416.416 0 00-.152.567l1.997 3.459C3.112 11.363 1.65 13.485 1.65 15.9v.1h20.7v-.1c0-2.415-1.462-4.537-3.473-6.279zM3.75 18.3c0 .469.381.85.85.85h.85v2.55c0 .469.381.85.85.85s.85-.381.85-.85v-2.55h6.8v2.55c0 .469.381.85.85.85s.85-.381.85-.85v-2.55h.85c.469 0 .85-.381.85-.85V16H3.75v2.3z" />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#F05032" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.383-.07 1.886.434.516.515.658 1.258.438 1.9l2.66 2.66c.892-.264 1.53-.938 1.557-1.658.047-.879-.312-1.741-1.057-2.281-.462-.326-.994-.481-1.536-.453.309-.459.473-1.021.471-1.604-.003-.594-.194-1.153-.546-1.604L10.873 6.45c.323-.333.523-.77.523-1.258 0-.968-.783-1.751-1.751-1.751-.482 0-.921.199-1.241.523L4.217 9.38c-.324.32-.523.759-.523 1.241 0 .968.783 1.751 1.751 1.751.482 0 .921-.199 1.241-.523l2.382-2.382c-.042.177-.065.36-.065.548 0 .968.783 1.751 1.751 1.751.968 0 1.751-.783 1.751-1.751 0-.188-.023-.371-.065-.548l3.304-3.304 7.015 7.015c.604.604 1.582 1.582 0 2.188l-10.462 10.46c-.604.604-1.582.604-2.188 0-.604-.602-.604-1.582 0-2.187l10.478-10.478z" />
    </svg>
  ),
  Firebase: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFA000" d="M3.89 15.673L6.255 2.46a.483.483 0 01.928-.005l2.36 6.98.884-2.29a.482.482 0 01.9 0l3.54 9.238-3.816-.001L3.89 15.673z" />
      <path fill="#F57C00" d="M15.696 21.944L12.3 14.3l-2.89 7.644-.03.013L3.89 15.673l7.286 6.271 4.52-.001z" />
      <path fill="#FFCA28" d="M12.3 14.3l3.396 7.644 2.89-7.644-2.89-2.89-3.396 2.89z" />
      <path fill="#FF8F00" d="M12.3 14.3L9.41 21.944l-.03.013-5.49-6.284 8.41-.373L12.3 14.3z" />
      <path fill="#FFB300" d="M3.89 15.673l8.41.373-2.89-7.644-5.52 7.271z" />
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#ED8B00" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.851 18.56s-.917.534.653.714c2.098.244 3.035.196 5.444-.224 0 0 .552.346 1.321.646-4.762 2.051-11.668.224-7.418-1.136m-2.722-2.03s-.869.614.604.767c2.006.207 4.093.183 6.808-.207 0 0 .276.414.967.655-5.285 1.587-12.43.483-8.379-1.215M14.116 11.475c1.084 1.361-.304 2.616-.304 2.616s2.003-1.518.967-3.418c-1.03-1.898-1.754-2.808 1.038-4.539 0-.001 4.008 2.493 2.021 5.341m4.214 8.805s.679.559-.747.991c-2.712.813-10.348 1.151-14.657.165-.333-.076.77-.559.917-.843.26-.494-.055-.77-.055-.77s-1.464 1.052-.385 1.644c2.256 1.239 9.487 1.015 13.216-.228 0-.001.447.305.645 1.041M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.158 3.561.123 5.77-.083 0 0 .304.217.532.559-2.72.532-7.305.743-10.133.165 0 0 .552.457 2.021.559c2.942.165 7.418-.228 7.418-.228s.304.304.608.559c-4.219.391-12.591.532-13.847-.087 0 0 .914.304 2.773.391 2.098.087 5.444-.087 5.444-.087s.196.217.435.391a21.159 21.159 0 01-4.662.087c-2.773-.217-4.036-.522-4.036-.522s.196.348.653.457c2.34.559 8.424.435 11.668-.261 0 0 .435.304.77.696-5.118.696-14.01.609-15.266-.13 0 0 .87.261 2.773.348 2.355.087 6.165-.174 6.165-.174M17.116 17.584s.696.609-.435 1.022c-2.355.87-8.424 1.239-12.591.696-.304-.043.522-.609.696-.87.261-.391.174-.609.174-.609s-.696.87.392 1.239c2.355.783 8.77.696 11.668-.435 0 0 .261.435.667 1.157M18.67 17.584s.696.522-.304.87c-2.098.696-7.418.957-11.24.435-.304-.043.435-.478.609-.696.261-.348.174-.522.174-.522s-.609.696.261 1.022c1.881.696 7.418.696 10.591-.261 0 0 .261.348.509 1.092M10.321 15.98c-2.098-.087-3.356-.261-3.356-.261s-.087.435-.174.696c-.609 1.322 2.355 1.685 5.444 1.618 2.773-.052 4.536-.348 4.536-.348s-.087.261-.261.522c-1.239 1.322-5.77 1.5-8.424 1.322-2.355-.174-4.319-.609-4.319-.609s.435.217 1.322.348c1.881.261 5.444.261 7.418-.435 0 0 .174.217.304.478-.957.696-4.319 1.151-7.418 1.075-3.618-.087-5.444-.696-5.444-.696s.696.087 1.881.261c1.881.217 5.77.348 7.679-.261 0 0 .087.304.174.565-2.355.87-7.679 1.151-8.424 1.018" />
    </svg>
  ),
  Kotlin: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#7F52FF" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 1.5h3l10 10 8-10H24L12 13.5 1.5 1.5zm0 21l10.5-10.5L22.5 22.5h-3L12 16.5 4.5 22.5h-3z" />
    </svg>
  ),
}

const socialIcons = {
  instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.265.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  ),
  email: (
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  ),
  github: (
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  ),
  linkedin: (
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  ),
}

const contactSocialLinks = [
  { label: 'Instagram', href: profile.social.instagram, icon: 'instagram' },
  { label: 'Art', href: profile.social.instagramArt, icon: 'instagram' },
  { label: 'GitHub', href: profile.social.github, icon: 'github' },
  { label: 'LinkedIn', href: profile.social.linkedin, icon: 'linkedin' },
]

function IntroCard() {
  return (
    <article className={`${cardBase} w-full min-w-0 flex-1`}>
      <h3 className="text-sm font-bold text-surface-300 mb-2">{bentoIntro.title}</h3>
      <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{bentoIntro.heading}</h4>
      <p className="text-surface-400 text-xs sm:text-sm leading-relaxed flex-1">{bentoIntro.body}</p>
    </article>
  )
}

function ImageCard() {
  return (
    <article className="rounded-2xl overflow-hidden border border-surface-800/60 aspect-video w-full max-h-[140px] sm:max-h-[160px] md:max-h-[180px] shrink-0">
      <img
        src="/bike1.png"
        alt=""
        className="w-full h-full object-cover"
      />
    </article>
  )
}

function RoleCard() {
  return (
    <article className={`${cardBase} bg-surface-800/90 border-surface-700/60 justify-center py-2`}>
      <p className="text-white font-bold text-base sm:text-lg leading-tight text-center">
        {bentoRole.text}
      </p>
    </article>
  )
}

/** Build contribution grid: last 53 weeks from today (Sun–Sat). Left = oldest, right = newest. grid[col][row] = intensity 0–4. */
function buildContributionGrid(contributions) {
  const dateToIntensity = new Map(contributions.map((c) => [c.date, parseInt(c.intensity, 10) || 0]))
  const today = new Date()
  const weekStart = new Date(today)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())

  const cols = 53
  const rows = 7
  const grid = Array(cols)
    .fill(0)
    .map(() => Array(rows).fill(0))

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const d = new Date(weekStart)
      d.setDate(d.getDate() - (cols - 1 - col) * 7 + row)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      grid[col][row] = dateToIntensity.get(key) ?? 0
    }
  }
  return grid
}

/** GitHub contribution graph — fetch API and render dark-theme SVG; fallback to image if API fails */
function GitHubContributionCard() {
  const [grid, setGrid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [useFallback, setUseFallback] = useState(false)
  const profileUrl = profile.social.github
  const apiUrl =
    import.meta.env.DEV
      ? `/api/github-contributions/api/v1/${profile.githubUsername}`
      : `https://github-contributions.vercel.app/api/v1/${profile.githubUsername}`
  const chartImageUrl = `https://ghchart.rshah.org/${profile.githubUsername}`

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setUseFallback(false)
    fetch(apiUrl, { mode: 'cors' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then((data) => {
        if (cancelled || !data?.contributions?.length) {
          if (!cancelled) setUseFallback(true)
          return
        }
        setGrid(buildContributionGrid(data.contributions))
      })
      .catch(() => {
        if (!cancelled) setUseFallback(true)
      })
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [apiUrl])

  const cellSize = 10
  const gap = 3
  const width = 53 * (cellSize + gap) + gap
  const height = 7 * (cellSize + gap) + gap

  return (
    <article className={`${cardBase} flex-col`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-surface-300">GitHub activity</h3>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-surface-500 hover:text-surface-300 transition-colors inline-flex items-center gap-1"
        >
          View profile
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block flex-1 min-h-0 rounded-xl overflow-hidden bg-[#0d1117] border border-surface-700/50 p-2"
        aria-label="View GitHub profile"
      >
        {loading && !useFallback && (
          <div className="w-full h-full min-h-[120px] flex items-center justify-center text-surface-500 text-sm">
            Loading…
          </div>
        )}
        {!loading && useFallback && (
          <img
            src={chartImageUrl}
            alt="GitHub contribution graph"
            className="w-full h-full min-h-[120px] max-h-[140px] sm:max-h-[160px] object-contain object-left-top rounded-lg opacity-90"
          />
        )}
        {!loading && !useFallback && grid && (
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full max-h-[140px] sm:max-h-[160px] object-contain"
            style={{ minHeight: 120 }}
          >
            {grid.map((column, colIndex) =>
              column.map((intensity, rowIndex) => {
                const x = gap + colIndex * (cellSize + gap)
                const y = gap + rowIndex * (cellSize + gap)
                const fill = GITHUB_DARK_COLORS[Math.min(intensity, 4)]
                return (
                  <rect
                    key={`${colIndex}-${rowIndex}`}
                    x={x}
                    y={y}
                    width={cellSize}
                    height={cellSize}
                    rx={2}
                    ry={2}
                    fill={fill}
                    className="transition-opacity duration-150 hover:opacity-90"
                  />
                )
              })
            )}
          </svg>
        )}
      </a>
    </article>
  )
}

function QuoteCard() {
  return (
    <article className={`${cardBase} bg-surface-800/90 border-surface-700/60 justify-center py-2`}>
      <p className="text-white font-bold text-md sm:text-base leading-snug text-center italic">
        {bentoQuote.text}
      </p>
    </article>
  )
}

function TechStackCard() {
  return (
    <article className={cardBase}>
      <h3 className="text-sm font-bold text-surface-300 mb-2">{bentoTechStack.heading}</h3>
      <div className="grid grid-cols-4 gap-1.5 flex-1 min-h-0">
        {bentoTechStack.items.map((item) => (
          <div
            key={item.name}
            className="rounded-xl bg-surface-800/80 border border-surface-700/50 p-1.5 flex flex-col items-center justify-center gap-0.5 text-center"
          >
            <span className="flex items-center justify-center text-surface-200 [&>svg]:w-5 [&>svg]:h-5 shrink-0">
              {techIcons[item.name]}
            </span>
            <span className="text-surface-400 text-[10px] font-medium truncate w-full">{item.name}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

function ContactCard() {
  return (
    <article className={cardBase}>
      <h3 className="text-sm font-bold text-white mb-1.5">{bentoContact.heading}</h3>
      <a
        href={`mailto:${bentoContact.email}`}
        className="inline-flex items-center gap-1.5 text-surface-300 hover:text-white font-medium transition-colors mb-2 text-xs"
      >
        <svg className="w-4 h-4 shrink-0 text-surface-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        {bentoContact.email}
      </a>
      <div className="grid grid-cols-2 gap-1.5">
        {contactSocialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.icon === 'email' ? undefined : '_blank'}
            rel={link.icon === 'email' ? undefined : 'noopener noreferrer'}
            className="rounded-xl bg-surface-800/80 border border-surface-700/50 px-2 py-1.5 flex items-center gap-1.5 text-surface-400 hover:text-white hover:border-surface-600 transition-colors text-xs"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              {socialIcons[link.icon]}
            </svg>
            <span className="truncate">{link.label}</span>
          </a>
        ))}
      </div>
    </article>
  )
}

export default function BentoGrid() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.04 * i,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-12 md:py-16 px-5 sm:px-6 min-h-0">
      <div className="max-w-5xl mx-auto">
        <h2 ref={headingRef} className="text-2xl md:text-3xl font-semibold text-white mb-5 md:mb-6">
          About
        </h2>
        {/* Layer 1: Image | Contact me | Who am I (wide). */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_minmax(220px,260px)_1fr] gap-3 sm:gap-4">
          {/* Layer 1 */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="md:col-start-1 md:col-end-2 md:row-start-1 flex items-stretch"
          >
            <ImageCard />
          </div>
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="md:col-start-2 md:col-end-3 md:row-start-1 min-h-[160px] md:min-h-0 min-w-0"
          >
            <ContactCard />
          </div>
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="md:col-start-3 md:col-end-4 md:row-start-1 min-h-[160px] md:min-h-0 min-w-0 flex flex-col"
          >
            <IntroCard />
          </div>
          {/* Layer 2 */}
          <div
            ref={(el) => (cardsRef.current[3] = el)}
            className="md:col-start-1 md:col-end-4 md:row-start-2 min-h-[72px] md:min-h-0"
          >
            <RoleCard />
          </div>
          {/* Layer 3 */}
          <div
            ref={(el) => (cardsRef.current[4] = el)}
            className="md:col-start-1 md:col-end-2 md:row-start-3 min-h-[160px] md:min-h-0"
          >
            <TechStackCard />
          </div>
          <div
            ref={(el) => (cardsRef.current[5] = el)}
            className="md:col-start-2 md:col-end-4 md:row-start-3 min-h-[160px] md:min-h-0"
          >
            <GitHubContributionCard />
          </div>
          {/* Layer 4 */}
          <div
            ref={(el) => (cardsRef.current[6] = el)}
            className="md:col-start-1 md:col-end-4 md:row-start-4 min-h-[56px] md:min-h-0"
          >
            <QuoteCard />
          </div>
        </div>
      </div>
    </section>
  )
}
