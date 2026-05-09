'use client'
import { AgentComponentProps } from '../contracts/types'
import { EmptyState } from './StateGuards'

interface Incident {
  id: string
  title: string
  severity: 'P1' | 'P2' | 'P3'
  startedAt: string
  affectedServices: string[]
  timeline?: Array<{ at: string; event: string }>
}

const severityColors = {
  P1: { bg: 'bg-red-950', border: 'border-red-500', text: 'text-red-400', badge: 'bg-red-500 text-white' },
  P2: { bg: 'bg-yellow-950', border: 'border-yellow-500', text: 'text-yellow-400', badge: 'bg-yellow-500 text-black' },
  P3: { bg: 'bg-blue-950', border: 'border-blue-500', text: 'text-blue-400', badge: 'bg-blue-500 text-white' },
}

function elapsed(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  return `${Math.floor(secs / 3600)}h ago`
}

export function IncidentDashboard({ data, onAction, className }: AgentComponentProps) {
  const incident = data as unknown as Incident
  if (!incident?.id || !incident?.title) return <EmptyState message="No incident data" />
  const colors = severityColors[incident.severity] ?? severityColors.P3

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} p-5 font-mono${className ? ` ${className}` : ''}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${colors.badge}`}>
          {incident.severity}
        </span>
        <span className={`text-sm font-semibold ${colors.text}`}>{incident.title}</span>
        <span className="ml-auto text-xs text-gray-500">{elapsed(incident.startedAt)}</span>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Servicios afectados</p>
        <div className="flex flex-wrap gap-2">
          {incident.affectedServices.map(s => (
            <span key={s} className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300">{s}</span>
          ))}
        </div>
      </div>

      {incident.timeline && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Timeline</p>
          <div className="space-y-1.5">
            {incident.timeline.map((e, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <span className="text-gray-600 shrink-0">{new Date(e.at).toLocaleTimeString()}</span>
                <span className="text-gray-300">{e.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onAction({ type: 'rollback', label: 'Rollback', payload: { incidentId: incident.id }, requiresConfirmation: true })}
          className="px-3 py-1.5 bg-red-700 hover:bg-red-600 rounded text-xs font-medium transition-colors"
        >
          &#8617; Rollback
        </button>
        <button
          onClick={() => onAction({ type: 'escalate', label: 'Escalar', payload: { incidentId: incident.id }, requiresConfirmation: true })}
          className="px-3 py-1.5 bg-yellow-700 hover:bg-yellow-600 rounded text-xs font-medium transition-colors"
        >
          &#9889; Escalar
        </button>
      </div>
    </div>
  )
}
