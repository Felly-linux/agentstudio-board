import { ComponentType } from 'react'
import type { AgentComponent, AgentComponentProps } from './contracts/types'
import { IncidentDashboard } from './components/IncidentDashboard'
import { ServiceHealth } from './components/ServiceHealth'
import { SprintBoard } from './components/SprintBoard'
import { MetricsChart } from './components/MetricsChart'
import { DeployHistory } from './components/DeployHistory'

export const boardComponents: AgentComponent[] = [
  {
    name: 'IncidentDashboard',
    description: 'Shows active incident details: severity (P1/P2/P3), elapsed time, affected services, and event timeline. Use when user reports or asks about an incident — trigger words: incidente, alerta, falla, degradado. Pair with ServiceHealth and DeployHistory for full context. Has Rollback and Escalate action buttons.',
    component: IncidentDashboard as ComponentType<AgentComponentProps>,
    category: 'board',
    requiredData: ['id', 'title', 'severity', 'startedAt', 'affectedServices'],
  },
  {
    name: 'ServiceHealth',
    description: 'Shows real-time health grid for all services: latency p99 (ms), error rate (%), requests/sec, and status (healthy/degraded/down). Use when user asks about system health, performance, or which services are degraded. Each degraded/down service row has an Investigate button. Header has a Page On-Call button.',
    component: ServiceHealth as ComponentType<AgentComponentProps>,
    category: 'board',
    requiredData: ['services'],
  },
  {
    name: 'SprintBoard',
    description: 'Shows current sprint task board: in-flight tasks, blocked tasks with their blockers, done count, and days remaining. Use when user asks about sprint status, blocked work, or team capacity — trigger words: sprint, blocked, bloqueado. Each blocked task has an Unblock action button.',
    component: SprintBoard as ComponentType<AgentComponentProps>,
    category: 'board',
    requiredData: ['sprintName', 'tasks', 'daysRemaining'],
  },
  {
    name: 'MetricsChart',
    description: 'Time-series line chart for a single engineering metric (latency ms, error rate %, RPS, memory MB) with optional threshold line. Use when user wants to see a trend, spike, or degradation over time. Shows a Create Incident button when threshold is exceeded.',
    component: MetricsChart as ComponentType<AgentComponentProps>,
    category: 'board',
    requiredData: ['metric', 'data', 'unit'],
  },
  {
    name: 'DeployHistory',
    description: 'Shows recent deployment history for a service: version number, deploy timestamp, deployer, commit SHA, and outcome (success/in_progress/rolled_back). Use when user asks what changed before an incident, wants to rollback, or asks about recent deploys — trigger words: deploy, deployó, rollback, qué cambió. Pair with IncidentDashboard when rollback is likely. Each deploy row has a Rollback button.',
    component: DeployHistory as ComponentType<AgentComponentProps>,
    category: 'board',
    requiredData: ['service', 'deploys'],
  },
]

export type { AgentComponent, AgentComponentProps }
export { EmptyState, LoadingState } from './components/StateGuards'
