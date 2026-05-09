// Demo data for all M2 components — the hackathon demo runs fully offline

export const mockIncident = {
  id: 'INC-2024-047',
  title: 'auth-service: latency spike (+400ms)',
  severity: 'P1' as const,
  startedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
  affectedServices: ['auth-service', 'api-gateway', 'user-sessions'],
  timeline: [
    { at: new Date(Date.now() - 8 * 60 * 1000).toISOString(), event: 'Alert triggered: p99 > 500ms' },
    { at: new Date(Date.now() - 6 * 60 * 1000).toISOString(), event: 'On-call paged: @juan' },
    { at: new Date(Date.now() - 3 * 60 * 1000).toISOString(), event: 'Root cause identified: DB connection pool exhausted' },
  ],
}

export const mockServices = {
  services: [
    { name: 'prod-api', status: 'healthy', latencyP99: 210, errorRate: 0.1, rps: 1240 },
    { name: 'auth-service', status: 'degraded', latencyP99: 610, errorRate: 2.1, rps: 340 },
    { name: 'api-gateway', status: 'healthy', latencyP99: 45, errorRate: 0.3, rps: 3100 },
    { name: 'user-sessions', status: 'degraded', latencyP99: 890, errorRate: 1.8, rps: 120 },
    { name: 'billing-service', status: 'healthy', latencyP99: 150, errorRate: 0.0, rps: 89 },
  ],
}

export const mockSprint = {
  sprintName: 'Sprint 14',
  daysRemaining: 2,
  tasks: [
    { id: 'T-101', title: 'Auth token refresh flow', status: 'in_flight' as const, assignee: '@maria' },
    { id: 'T-102', title: 'Rate limiting middleware', status: 'blocked' as const, assignee: '@carlos', blocker: 'Waiting for infra quota approval' },
    { id: 'T-103', title: 'Session cleanup cron', status: 'done' as const, assignee: '@juan' },
    { id: 'T-104', title: 'DB connection pool config', status: 'blocked' as const, assignee: '@juan', blocker: 'Related to current incident INC-2024-047' },
    { id: 'T-105', title: 'API docs update', status: 'in_flight' as const, assignee: '@maria' },
  ],
}

export const mockDeployHistory = {
  service: 'auth-service',
  deploys: [
    {
      id: 'deploy-2024-193',
      service: 'auth-service',
      version: 'v2.5.0',
      deployedAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
      deployedBy: '@carlos',
      status: 'in_progress' as const,
      commitSha: 'a3f9c12',
      changeCount: 8,
    },
    {
      id: 'deploy-2024-192',
      service: 'auth-service',
      version: 'v2.4.1',
      deployedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      deployedBy: '@juan',
      status: 'success' as const,
      commitSha: 'b7e2a41',
      changeCount: 3,
    },
    {
      id: 'deploy-2024-191',
      service: 'auth-service',
      version: 'v2.4.0',
      deployedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      deployedBy: '@maria',
      status: 'success' as const,
      commitSha: 'c1d5f93',
      changeCount: 12,
    },
  ],
}

export const mockLatencyMetric = {
  metric: 'auth-service p99 latency',
  unit: 'ms',
  data: Array.from({ length: 30 }, (_, i) => ({
    t: new Date(Date.now() - (30 - i) * 60 * 1000).toLocaleTimeString(),
    value: i < 22
      ? Math.round(150 + Math.random() * 50)
      : Math.round(400 + Math.random() * 200 + (i - 22) * 40),
  })),
}
