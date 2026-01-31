/** Rounded-corner laptop frame — shows video when provided */
export default function DeviceLaptop({ className = '', video }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Screen — larger for better visibility */}
      <div
        className="relative flex items-center justify-center rounded-t-xl bg-surface-900 border border-b-0 border-surface-700 shadow-2xl overflow-hidden"
        style={{
          width: 'min(560px, 85vw)',
          height: 'min(350px, 53vw)',
          minWidth: 320,
          minHeight: 200,
        }}
      >
        <div
          className="w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-t-[10px] bg-surface-800/80 flex items-center justify-center overflow-hidden"
          style={{ marginTop: 6 }}
        >
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
        {/* Webcam */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-surface-700" />
      </div>
      {/* Base */}
      <div
        className="rounded-b-xl border border-t-2 border-surface-700 bg-surface-900 h-4 flex justify-center"
        style={{
          width: 'min(600px, 92vw)',
          minWidth: 340,
          borderTopColor: 'rgb(64 64 64)',
        }}
      >
        <div className="w-32 h-1 rounded-full bg-surface-800 -mt-0.5" />
      </div>
    </div>
  )
}
