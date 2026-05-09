import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { IncidentDashboard } from '../src/components/IncidentDashboard'
import { ServiceHealth } from '../src/components/ServiceHealth'
import { SprintBoard } from '../src/components/SprintBoard'
import { MetricsChart } from '../src/components/MetricsChart'
import { DeployHistory } from '../src/components/DeployHistory'
import { LoadingState, EmptyState } from '../src/components/StateGuards'
import {
  mockIncident,
  mockServices,
  mockSprint,
  mockLatencyMetric,
  mockDeployHistory,
} from '../src/mock-data'
import type { AgentAction } from '../src/contracts/types'

type Tab = 'components' | 'edge-cases'

function Preview() {
  const [lastAction, setLastAction] = useState<AgentAction | null>(null)
  const [tab, setTab] = useState<Tab>('components')

  const onAction = (action: AgentAction) => {
    console.log('[action]', action)
    setLastAction(action)
  }

  return (
    <div className="p-6 space-y-5 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-mono text-lg font-bold">agentstudio-board — preview</h1>
        <div className="flex gap-1 font-mono text-xs">
          {(['components', 'edge-cases'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded transition-colors ${tab === t ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {lastAction && (
        <div className="rounded border border-blue-700 bg-blue-950 px-4 py-2 font-mono text-xs text-blue-300 flex items-start gap-2">
          <span className="text-blue-500 shrink-0">action →</span>
          <span className="break-all">{JSON.stringify(lastAction)}</span>
          <button onClick={() => setLastAction(null)} className="ml-auto text-blue-700 hover:text-blue-500 shrink-0">✕</button>
        </div>
      )}

      {tab === 'components' && (
        <div className="space-y-6">
          <Section label="IncidentDashboard — P1 active incident">
            <IncidentDashboard data={mockIncident} onAction={onAction} />
          </Section>

          <Section label="ServiceHealth — mixed health">
            <ServiceHealth data={mockServices} onAction={onAction} />
          </Section>

          <Section label="DeployHistory — auth-service">
            <DeployHistory data={mockDeployHistory} onAction={onAction} />
          </Section>

          <Section label="MetricsChart — latency spike (threshold=300ms)">
            <MetricsChart data={{ ...mockLatencyMetric, threshold: 300 }} onAction={onAction} />
          </Section>

          <Section label="MetricsChart — no spike (threshold=1000ms)">
            <MetricsChart data={{ ...mockLatencyMetric, threshold: 1000 }} onAction={onAction} />
          </Section>

          <Section label="SprintBoard — Sprint 14">
            <SprintBoard data={mockSprint} onAction={onAction} />
          </Section>
        </div>
      )}

      {tab === 'edge-cases' && (
        <div className="space-y-6">
          <Section label="IncidentDashboard — missing data → EmptyState">
            <IncidentDashboard data={{}} onAction={onAction} />
          </Section>

          <Section label="ServiceHealth — no services → EmptyState">
            <ServiceHealth data={{ services: [] }} onAction={onAction} />
          </Section>

          <Section label="ServiceHealth — undefined services → LoadingState">
            <ServiceHealth data={{}} onAction={onAction} />
          </Section>

          <Section label="DeployHistory — empty deploys → EmptyState">
            <DeployHistory data={{ service: 'auth-service', deploys: [] }} onAction={onAction} />
          </Section>

          <Section label="DeployHistory — undefined deploys → LoadingState">
            <DeployHistory data={{ service: 'auth-service' }} onAction={onAction} />
          </Section>

          <Section label="MetricsChart — no points → EmptyState">
            <MetricsChart data={{ metric: 'latency', unit: 'ms', data: [] }} onAction={onAction} />
          </Section>

          <Section label="SprintBoard — empty tasks → EmptyState">
            <SprintBoard data={{ sprintName: 'Sprint 15', daysRemaining: 5, tasks: [] }} onAction={onAction} />
          </Section>

          <Section label="SprintBoard — undefined tasks → LoadingState">
            <SprintBoard data={{ sprintName: 'Sprint 15', daysRemaining: 5 }} onAction={onAction} />
          </Section>

          <Section label="LoadingState (standalone)">
            <LoadingState rows={4} />
          </Section>

          <Section label="EmptyState (standalone)">
            <EmptyState message="Nothing to display here" />
          </Section>
        </div>
      )}
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-gray-600 font-mono text-xs mb-2">{label}</p>
      {children}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<Preview />)
