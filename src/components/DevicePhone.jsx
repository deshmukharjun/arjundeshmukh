/** Rounded-corner phone frame — shows video when provided */
export default function DevicePhone({ className = '', video }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-[2.5rem] bg-surface-900 border border-surface-700 shadow-2xl ${className}`}
      style={{
        width: 'min(280px, 22vw)',
        height: 'min(560px, 44vw)',
        minWidth: 200,
        minHeight: 400,
      }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-surface-950 rounded-b-2xl z-10" />
      {/* Screen area — video or placeholder */}
      <div className="w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[2rem] bg-surface-800/80 flex items-center justify-center overflow-hidden">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="text-surface-500 text-sm text-center px-4">
            Work in progress!
          </div>
        )}
      </div>
    </div>
  )
}
