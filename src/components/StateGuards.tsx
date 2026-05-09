'use client'

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-700 bg-gray-950 p-8 font-mono flex items-center justify-center">
      <span className="text-xs text-gray-600">{message}</span>
    </div>
  )
}

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono space-y-3">
      <div className="h-3 bg-gray-800 rounded animate-pulse w-1/3" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-8 bg-gray-800 rounded animate-pulse" />
      ))}
    </div>
  )
}
