import { profile } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-800/50 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-surface-500 text-sm">
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#about" className="text-surface-500 text-sm hover:text-surface-300 transition-colors">
            About
          </a>
          <a href="#work" className="text-surface-500 text-sm hover:text-surface-300 transition-colors">
            Work
          </a>
          <a href="#contact" className="text-surface-500 text-sm hover:text-surface-300 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
