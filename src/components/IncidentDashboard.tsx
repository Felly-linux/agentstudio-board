'use client'
import { AgentComponentProps } from '../contracts/types'
import { EmptyState } from './StateGuards'

type IncidentStatus = 'investigating' | 'identified' | 'resolved'

interface Incident {
  id: string
  title: string
  severity: 'P1' | 'P2' | 'P3'
  startedAt: string
  affectedServices: string[]
  status?: IncidentStatus
  resolvedAt?: string
  timeline?: Array<{ at: string; event: string }>
}

const severityColors = {
  P1: { bg: 'bg-red-950',    border: 'border-red-500',    text: 'text-red-400',    badge: 'bg-red-500 text-white'    },
  P2: { bg: 'bg-yellow-950', border: 'border-yellow-500', text: 'text-yellow-400', badge: 'bg-yellow-500 text-black' },
  P3: { bg: 'bg-blue-950',   border: 'border-blue-500',   text: 'text-blue-400',   badge: 'bg-blue-500 text-white'   },
}

const statusBadge: Record<IncidentStatus, string> = {
  investigating: 'bg-red-800 text-red-200',
  identified:    'bg-yellow-800 text-yellow-200',
  resolved:      'bg-green-800 text-green-200',
}

function elapsed(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  return `${Math.floor(secs / 3600)}h ${Math.floor((secs % 3600) / 60)}m ago`
}

export function IncidentDashboard({ data, onAction, className }: AgentComponentProps) {
  const incident = data as unknown as Incident
  if (!incident?.id || !incident?.title) return <EmptyState message="No incident data" />

  const colors = severityColors[incident.severity] ?? severityColors.P3
  const isResolved = incident.status === 'resolved'

  return (
    <div className={`rounded-lg border ${colors.border} ${isResolved ? 'bg-gray-950 opacity-75' : colors.bg} p-5 font-mono${className ? ` ${className}` : ''}`}>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${colors.badge}`}>
          {incident.severity}
        </span>
        {incident.status && (
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadge[incident.status]}`}>
            {incident.status}
          </span>
        )}
        <span className={`text-sm font-semibold ${colors.text} flex-1`}>{incident.title}</span>
        <span className="text-xs text-gray-500">
          {isResolved && incident.resolvedAt
            ? `resolved ${elapsed(incident.resolvedAt)}`
            : elapsed(incident.startedAt)}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Servicios afectados</p>
        <div className="flex flex-wrap gap-2">
          {incident.affectedServices.map(s => (
            <span key={s} className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300">{s}</span>
          ))}
        </div>
      </div>

      {incident.timeline && incident.timeline.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Timeline</p>
          <div className="space-y-1.5 border-l border-gray-800 pl-3">
            {incident.timeline.map((e, i) => (
              <div key={i} className="flex gap-3 text-xs relative">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 absolute -left-4 top-1" />
                <span className="text-gray-600 shrink-0">{new Date(e.at).toLocaleTimeString()}</span>
                <span className="text-gray-300">{e.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isResolved && (
        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-800">
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
          <button
            onClick={() => onAction({ type: 'resolve_incident', label: 'Resolve', payload: { incidentId: incident.id }, requiresConfirmation: true })}
            className="px-3 py-1.5 bg-green-800 hover:bg-green-700 rounded text-xs font-medium transition-colors ml-auto"
          >
            &#10003; Resolve
          </button>
        </div>
      )}

      {isResolved && (
        <div className="mt-4 pt-3 border-t border-gray-800">
          <span className="text-xs text-green-500">&#10003; Incident resolved</span>
        </div>
      )}
    </div>
  )
}
