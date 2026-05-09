'use client'
import { AgentComponentProps } from '../contracts/types'
import { EmptyState, LoadingState } from './StateGuards'

type DeployStatus = 'success' | 'rolled_back' | 'in_progress'

interface Deploy {
  id: string
  service: string
  version: string
  deployedAt: string
  deployedBy: string
  status: DeployStatus
  commitSha?: string
  changeCount?: number
}

interface DeployHistoryData {
  service: string
  deploys: Deploy[]
}

const statusConfig: Record<DeployStatus, { dot: string; text: string }> = {
  success: { dot: 'bg-green-400', text: 'text-green-400' },
  rolled_back: { dot: 'bg-red-400', text: 'text-red-400' },
  in_progress: { dot: 'bg-yellow-400', text: 'text-yellow-400' },
}

function elapsed(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  return `${Math.floor(secs / 3600)}h ago`
}

export function DeployHistory({ data, onAction, className }: AgentComponentProps) {
  const { service, deploys } = data as unknown as DeployHistoryData
  if (!deploys) return <LoadingState rows={3} />
  if (deploys.length === 0) return <EmptyState message={`No deploys found for ${service ?? 'service'}`} />

  return (
    <div className={`rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ''}`}>
      <h3 className="text-sm font-semibold text-gray-300 mb-4">Deploy History — {service}</h3>
      <div className="space-y-2">
        {deploys.map((d, i) => {
          const cfg = statusConfig[d.status]
          return (
            <div key={d.id} className="flex items-center gap-3 rounded px-3 py-2 border border-gray-800 bg-gray-900 flex-wrap">
              <div className={`w-2 h-2 rounded-full ${cfg.dot} shrink-0`} />
              <span className="text-xs font-semibold text-gray-200 w-14 shrink-0">{d.version}</span>
              {i === 0 && (
                <span className="px-1.5 py-0.5 bg-blue-900 border border-blue-700 rounded text-xs text-blue-300 shrink-0">LATEST</span>
              )}
              <span className={`text-xs ${cfg.text} w-20 shrink-0`}>{d.status}</span>
              <span className="text-xs text-gray-500">{elapsed(d.deployedAt)}</span>
              <span className="text-xs text-gray-600">{d.deployedBy}</span>
              {d.commitSha && (
                <span className="text-xs text-gray-700 bg-gray-800 px-1.5 rounded font-mono">{d.commitSha}</span>
              )}
              <div className="ml-auto">
                <button
                  onClick={() => onAction({ type: 'rollback', label: `Rollback to ${d.version}`, payload: { deployId: d.id, service: d.service, version: d.version }, requiresConfirmation: true })}
                  className="px-2 py-0.5 bg-red-900 hover:bg-red-800 border border-red-700 rounded text-xs text-red-300 transition-colors whitespace-nowrap"
                >
                  &#8617; Rollback to {d.version}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
