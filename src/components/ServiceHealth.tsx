'use client'
import { AgentComponentProps } from '../contracts/types'
import { EmptyState, LoadingState } from './StateGuards'

type ServiceStatus = 'healthy' | 'degraded' | 'down'

interface Service {
  name: string
  status: ServiceStatus
  latencyP99: number
  errorRate: number
  rps: number
}

const statusConfig: Record<ServiceStatus, { dot: string; text: string; border: string }> = {
  healthy: { dot: 'bg-green-400', text: 'text-green-400', border: 'border-green-900' },
  degraded: { dot: 'bg-yellow-400', text: 'text-yellow-400', border: 'border-yellow-900' },
  down: { dot: 'bg-red-400', text: 'text-red-400', border: 'border-red-900' },
}

export function ServiceHealth({ data, onAction, className }: AgentComponentProps) {
  const { services } = data as { services: Service[] }
  if (!services) return <LoadingState rows={4} />
  if (services.length === 0) return <EmptyState message="No services to display" />

  return (
    <div className={`rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">Service Health</h3>
        <button
          onClick={() => onAction({ type: 'escalate', label: 'Page On-Call', payload: { source: 'service_health' }, requiresConfirmation: true })}
          className="px-3 py-1 bg-yellow-700 hover:bg-yellow-600 rounded text-xs font-medium transition-colors"
        >
          &#9889; Page On-Call
        </button>
      </div>
      <div className="space-y-2">
        {services.map(s => {
          const cfg = statusConfig[s.status]
          return (
            <div key={s.name} className={`flex items-center gap-3 rounded px-3 py-2 border ${cfg.border} bg-gray-900`}>
              <div className={`w-2 h-2 rounded-full ${cfg.dot} shrink-0`} />
              <span className="text-xs text-gray-300 w-28 shrink-0">{s.name}</span>
              <span className={`text-xs ${cfg.text} w-16`}>{s.status}</span>
              <span className="text-xs text-gray-500 ml-auto">p99: {s.latencyP99}ms</span>
              <span className={`text-xs w-20 text-right ${s.errorRate > 1 ? 'text-red-400' : 'text-gray-600'}`}>
                err: {s.errorRate}%
              </span>
              <span className="text-xs text-gray-700 w-20 text-right">{s.rps} rps</span>
              {s.status !== 'healthy' && (
                <button
                  onClick={() => onAction({ type: 'investigate_service', label: `Investigate ${s.name}`, payload: { service: s.name, status: s.status, latencyP99: s.latencyP99, errorRate: s.errorRate } })}
                  className="px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors shrink-0"
                >
                  Investigate
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
