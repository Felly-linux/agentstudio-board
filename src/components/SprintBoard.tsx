'use client'
import { AgentComponentProps } from '../contracts/types'
import { EmptyState, LoadingState } from './StateGuards'

type TaskStatus = 'in_flight' | 'blocked' | 'done'

interface Task {
  id: string
  title: string
  status: TaskStatus
  assignee: string
  blocker?: string
}

interface SprintData {
  sprintName: string
  daysRemaining: number
  tasks: Task[]
}

const taskConfig: Record<TaskStatus, { label: string; text: string; bg: string; border: string }> = {
  in_flight: { label: 'In Flight', text: 'text-blue-400', bg: 'bg-blue-950', border: 'border-blue-900' },
  blocked: { label: 'Blocked', text: 'text-red-400', bg: 'bg-red-950', border: 'border-red-900' },
  done: { label: 'Done', text: 'text-green-400', bg: 'bg-green-950', border: 'border-green-900' },
}

export function SprintBoard({ data, onAction, className }: AgentComponentProps) {
  const { sprintName, daysRemaining, tasks } = data as unknown as SprintData
  if (!tasks) return <LoadingState rows={3} />
  if (tasks.length === 0) return <EmptyState message="No tasks in sprint" />
  const blocked = tasks.filter(t => t.status === 'blocked').length
  const done = tasks.filter(t => t.status === 'done').length

  return (
    <div className={`rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">{sprintName}</h3>
        <div className="flex gap-4 text-xs">
          <span className="text-red-400">{blocked} blocked</span>
          <span className="text-green-400">{done} done</span>
          <span className="text-gray-500">{daysRemaining}d left</span>
        </div>
      </div>
      <div className="space-y-2">
        {tasks.map(t => {
          const cfg = taskConfig[t.status]
          return (
            <div key={t.id} className={`rounded border ${cfg.border} ${cfg.bg} px-3 py-2`}>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">{t.id}</span>
                <span className="text-xs text-gray-200 flex-1">{t.title}</span>
                <span className={`text-xs ${cfg.text}`}>{cfg.label}</span>
                <span className="text-xs text-gray-600">{t.assignee}</span>
                {t.status === 'blocked' && (
                  <button
                    onClick={() => onAction({ type: 'unblock_task', label: `Unblock ${t.id}`, payload: { taskId: t.id, blocker: t.blocker } })}
                    className="px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors shrink-0"
                  >
                    Unblock
                  </button>
                )}
              </div>
              {t.blocker && (
                <p className="text-xs text-red-300 mt-1 ml-8">&#9889; {t.blocker}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
