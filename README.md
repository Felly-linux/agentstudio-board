# agentstudio-board — M2: Visualization Library

> AgentWarRoom · Generative UI Hackathon · May 9, 2026

**M2 exports visualization components** that the M1 agent can render at runtime. You build components here; M1 loads them automatically via npm.

## Components

| Name | Description |
|------|-------------|
| `IncidentDashboard` | Full incident view — severity, timeline, affected services |
| `ServiceHealth` | Real-time service health grid — latency p99, error rates, status |
| `SprintBoard` | Sprint progress — tasks in flight, blocked, done |
| `MetricsChart` | Time-series chart for any engineering metric (recharts) |

## How M1 Uses This

```typescript
// M1 does this at startup:
import('@agentstudio/board').then(m => registry.registerAll(m.boardComponents))

// Agent reads descriptions and decides:
// "User asked about an incident → render IncidentDashboard"
```

## Quick Start

```bash
npm install
npm run build   # produces dist/ for M1 to consume
npm run dev     # storybook or test page
```

## Cross-Module Context

See `CLAUDE.md` for full system context.
See `CONTEXT/core-api.md` for M1 types.
Run `sync-context.sh` to pull latest contracts from M1.
