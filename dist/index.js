"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  EmptyState: () => EmptyState,
  LoadingState: () => LoadingState,
  boardComponents: () => boardComponents
});
module.exports = __toCommonJS(index_exports);

// src/components/StateGuards.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function EmptyState({ message }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rounded-lg border border-dashed border-gray-700 bg-gray-950 p-8 font-mono flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-gray-600", children: message }) });
}
function LoadingState({ rows = 3 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-gray-800 rounded animate-pulse w-1/3" }),
    Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 bg-gray-800 rounded animate-pulse" }, i))
  ] });
}

// src/components/IncidentDashboard.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var severityColors = {
  P1: { bg: "bg-red-950", border: "border-red-500", text: "text-red-400", badge: "bg-red-500 text-white" },
  P2: { bg: "bg-yellow-950", border: "border-yellow-500", text: "text-yellow-400", badge: "bg-yellow-500 text-black" },
  P3: { bg: "bg-blue-950", border: "border-blue-500", text: "text-blue-400", badge: "bg-blue-500 text-white" }
};
function elapsed(iso) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1e3);
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  return `${Math.floor(secs / 3600)}h ago`;
}
function IncidentDashboard({ data, onAction, className }) {
  const incident = data;
  if (!(incident == null ? void 0 : incident.id) || !(incident == null ? void 0 : incident.title)) return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EmptyState, { message: "No incident data" });
  const colors = severityColors[incident.severity] ?? severityColors.P3;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `rounded-lg border ${colors.border} ${colors.bg} p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `px-2 py-0.5 rounded text-xs font-bold ${colors.badge}`, children: incident.severity }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `text-sm font-semibold ${colors.text}`, children: incident.title }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ml-auto text-xs text-gray-500", children: elapsed(incident.startedAt) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-gray-500 mb-1", children: "Servicios afectados" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex flex-wrap gap-2", children: incident.affectedServices.map((s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300", children: s }, s)) })
    ] }),
    incident.timeline && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-gray-500 mb-2", children: "Timeline" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-1.5", children: incident.timeline.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex gap-3 text-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-gray-600 shrink-0", children: new Date(e.at).toLocaleTimeString() }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-gray-300", children: e.event })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex gap-2 mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: () => onAction({ type: "rollback", label: "Rollback", payload: { incidentId: incident.id }, requiresConfirmation: true }),
          className: "px-3 py-1.5 bg-red-700 hover:bg-red-600 rounded text-xs font-medium transition-colors",
          children: "\u21A9 Rollback"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: () => onAction({ type: "escalate", label: "Escalar", payload: { incidentId: incident.id }, requiresConfirmation: true }),
          className: "px-3 py-1.5 bg-yellow-700 hover:bg-yellow-600 rounded text-xs font-medium transition-colors",
          children: "\u26A1 Escalar"
        }
      )
    ] })
  ] });
}

// src/components/ServiceHealth.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var statusConfig = {
  healthy: { dot: "bg-green-400", text: "text-green-400", border: "border-green-900" },
  degraded: { dot: "bg-yellow-400", text: "text-yellow-400", border: "border-yellow-900" },
  down: { dot: "bg-red-400", text: "text-red-400", border: "border-red-900" }
};
function ServiceHealth({ data, onAction, className }) {
  const { services } = data;
  if (!services) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(LoadingState, { rows: 4 });
  if (services.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(EmptyState, { message: "No services to display" });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-sm font-semibold text-gray-300", children: "Service Health" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          onClick: () => onAction({ type: "escalate", label: "Page On-Call", payload: { source: "service_health" }, requiresConfirmation: true }),
          className: "px-3 py-1 bg-yellow-700 hover:bg-yellow-600 rounded text-xs font-medium transition-colors",
          children: "\u26A1 Page On-Call"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "space-y-2", children: services.map((s) => {
      const cfg = statusConfig[s.status];
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `flex items-center gap-3 rounded px-3 py-2 border ${cfg.border} bg-gray-900`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `w-2 h-2 rounded-full ${cfg.dot} shrink-0` }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-xs text-gray-300 w-28 shrink-0", children: s.name }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `text-xs ${cfg.text} w-16`, children: s.status }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs text-gray-500 ml-auto", children: [
          "p99: ",
          s.latencyP99,
          "ms"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: `text-xs w-20 text-right ${s.errorRate > 1 ? "text-red-400" : "text-gray-600"}`, children: [
          "err: ",
          s.errorRate,
          "%"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs text-gray-700 w-20 text-right", children: [
          s.rps,
          " rps"
        ] }),
        s.status !== "healthy" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            onClick: () => onAction({ type: "investigate_service", label: `Investigate ${s.name}`, payload: { service: s.name, status: s.status, latencyP99: s.latencyP99, errorRate: s.errorRate } }),
            className: "px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors shrink-0",
            children: "Investigate"
          }
        )
      ] }, s.name);
    }) })
  ] });
}

// src/components/SprintBoard.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var taskConfig = {
  in_flight: { label: "In Flight", text: "text-blue-400", bg: "bg-blue-950", border: "border-blue-900" },
  blocked: { label: "Blocked", text: "text-red-400", bg: "bg-red-950", border: "border-red-900" },
  done: { label: "Done", text: "text-green-400", bg: "bg-green-950", border: "border-green-900" }
};
function SprintBoard({ data, onAction, className }) {
  const { sprintName, daysRemaining, tasks } = data;
  if (!tasks) return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LoadingState, { rows: 3 });
  if (tasks.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(EmptyState, { message: "No tasks in sprint" });
  const blocked = tasks.filter((t) => t.status === "blocked").length;
  const done = tasks.filter((t) => t.status === "done").length;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-sm font-semibold text-gray-300", children: sprintName }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex gap-4 text-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-red-400", children: [
          blocked,
          " blocked"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-green-400", children: [
          done,
          " done"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-gray-500", children: [
          daysRemaining,
          "d left"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "space-y-2", children: tasks.map((t) => {
      const cfg = taskConfig[t.status];
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `rounded border ${cfg.border} ${cfg.bg} px-3 py-2`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-xs text-gray-600", children: t.id }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-xs text-gray-200 flex-1", children: t.title }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: `text-xs ${cfg.text}`, children: cfg.label }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-xs text-gray-600", children: t.assignee }),
          t.status === "blocked" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              onClick: () => onAction({ type: "unblock_task", label: `Unblock ${t.id}`, payload: { taskId: t.id, blocker: t.blocker } }),
              className: "px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors shrink-0",
              children: "Unblock"
            }
          )
        ] }),
        t.blocker && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-xs text-red-300 mt-1 ml-8", children: [
          "\u26A1 ",
          t.blocker
        ] })
      ] }, t.id);
    }) })
  ] });
}

// src/components/MetricsChart.tsx
var import_recharts = require("recharts");
var import_jsx_runtime5 = require("react/jsx-runtime");
function MetricsChart({ data, onAction, className }) {
  const { metric, unit, data: points, threshold } = data;
  if (!points || points.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EmptyState, { message: "No metric data" });
  const max = Math.max(...points.map((p) => p.value));
  const hasSpike = threshold != null && max > threshold;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "text-sm font-semibold text-gray-300", children: metric }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-3 text-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-gray-600", children: [
          "unit: ",
          unit
        ] }),
        hasSpike && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-red-400", children: "\u26A0 threshold exceeded" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_recharts.ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_recharts.LineChart, { data: points, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_recharts.XAxis, { dataKey: "t", tick: { fontSize: 9, fill: "#6b7280" }, interval: 4 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_recharts.YAxis, { tick: { fontSize: 9, fill: "#6b7280" } }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_recharts.Tooltip,
        {
          contentStyle: { background: "#111827", border: "1px solid #374151", fontSize: 11, borderRadius: 6 },
          formatter: (v) => [`${v}${unit}`, metric]
        }
      ),
      threshold != null && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_recharts.ReferenceLine, { y: threshold, stroke: "#f59e0b", strokeDasharray: "3 3" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_recharts.Line,
        {
          type: "monotone",
          dataKey: "value",
          stroke: hasSpike ? "#ef4444" : "#3b82f6",
          strokeWidth: 2,
          dot: false,
          activeDot: { r: 4 }
        }
      )
    ] }) }),
    hasSpike && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "button",
      {
        onClick: () => onAction({ type: "create_incident", label: "Create Incident", payload: { metric, value: max, threshold }, requiresConfirmation: true }),
        className: "px-3 py-1.5 bg-red-700 hover:bg-red-600 rounded text-xs font-medium transition-colors",
        children: "+ Create Incident"
      }
    ) })
  ] });
}

// src/components/DeployHistory.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var statusConfig2 = {
  success: { dot: "bg-green-400", text: "text-green-400" },
  rolled_back: { dot: "bg-red-400", text: "text-red-400" },
  in_progress: { dot: "bg-yellow-400", text: "text-yellow-400" }
};
function elapsed2(iso) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1e3);
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  return `${Math.floor(secs / 3600)}h ago`;
}
function DeployHistory({ data, onAction, className }) {
  const { service, deploys } = data;
  if (!deploys) return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(LoadingState, { rows: 3 });
  if (deploys.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(EmptyState, { message: `No deploys found for ${service ?? "service"}` });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: `rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("h3", { className: "text-sm font-semibold text-gray-300 mb-4", children: [
      "Deploy History \u2014 ",
      service
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "space-y-2", children: deploys.map((d, i) => {
      const cfg = statusConfig2[d.status];
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-3 rounded px-3 py-2 border border-gray-800 bg-gray-900 flex-wrap", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: `w-2 h-2 rounded-full ${cfg.dot} shrink-0` }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-semibold text-gray-200 w-14 shrink-0", children: d.version }),
        i === 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "px-1.5 py-0.5 bg-blue-900 border border-blue-700 rounded text-xs text-blue-300 shrink-0", children: "LATEST" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: `text-xs ${cfg.text} w-20 shrink-0`, children: d.status }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs text-gray-500", children: elapsed2(d.deployedAt) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs text-gray-600", children: d.deployedBy }),
        d.commitSha && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs text-gray-700 bg-gray-800 px-1.5 rounded font-mono", children: d.commitSha }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "ml-auto", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "button",
          {
            onClick: () => onAction({ type: "rollback", label: `Rollback to ${d.version}`, payload: { deployId: d.id, service: d.service, version: d.version }, requiresConfirmation: true }),
            className: "px-2 py-0.5 bg-red-900 hover:bg-red-800 border border-red-700 rounded text-xs text-red-300 transition-colors whitespace-nowrap",
            children: [
              "\u21A9 Rollback to ",
              d.version
            ]
          }
        ) })
      ] }, d.id);
    }) })
  ] });
}

// src/index.ts
var boardComponents = [
  {
    name: "IncidentDashboard",
    description: "Shows active incident details: severity (P1/P2/P3), elapsed time, affected services, and event timeline. Use when user reports or asks about an incident \u2014 trigger words: incidente, alerta, falla, degradado. Pair with ServiceHealth and DeployHistory for full context. Has Rollback and Escalate action buttons.",
    component: IncidentDashboard,
    category: "board",
    requiredData: ["id", "title", "severity", "startedAt", "affectedServices"]
  },
  {
    name: "ServiceHealth",
    description: "Shows real-time health grid for all services: latency p99 (ms), error rate (%), requests/sec, and status (healthy/degraded/down). Use when user asks about system health, performance, or which services are degraded. Each degraded/down service row has an Investigate button. Header has a Page On-Call button.",
    component: ServiceHealth,
    category: "board",
    requiredData: ["services"]
  },
  {
    name: "SprintBoard",
    description: "Shows current sprint task board: in-flight tasks, blocked tasks with their blockers, done count, and days remaining. Use when user asks about sprint status, blocked work, or team capacity \u2014 trigger words: sprint, blocked, bloqueado. Each blocked task has an Unblock action button.",
    component: SprintBoard,
    category: "board",
    requiredData: ["sprintName", "tasks", "daysRemaining"]
  },
  {
    name: "MetricsChart",
    description: "Time-series line chart for a single engineering metric (latency ms, error rate %, RPS, memory MB) with optional threshold line. Use when user wants to see a trend, spike, or degradation over time. Shows a Create Incident button when threshold is exceeded.",
    component: MetricsChart,
    category: "board",
    requiredData: ["metric", "data", "unit"]
  },
  {
    name: "DeployHistory",
    description: "Shows recent deployment history for a service: version number, deploy timestamp, deployer, commit SHA, and outcome (success/in_progress/rolled_back). Use when user asks what changed before an incident, wants to rollback, or asks about recent deploys \u2014 trigger words: deploy, deploy\xF3, rollback, qu\xE9 cambi\xF3. Pair with IncidentDashboard when rollback is likely. Each deploy row has a Rollback button.",
    component: DeployHistory,
    category: "board",
    requiredData: ["service", "deploys"]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyState,
  LoadingState,
  boardComponents
});
