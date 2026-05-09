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
var statusBadge = {
  investigating: "bg-red-800 text-red-200",
  identified: "bg-yellow-800 text-yellow-200",
  resolved: "bg-green-800 text-green-200"
};
function elapsed(iso) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1e3);
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  return `${Math.floor(secs / 3600)}h ${Math.floor(secs % 3600 / 60)}m ago`;
}
function IncidentDashboard({ data, onAction, className }) {
  const incident = data;
  if (!(incident == null ? void 0 : incident.id) || !(incident == null ? void 0 : incident.title)) return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EmptyState, { message: "No incident data" });
  const colors = severityColors[incident.severity] ?? severityColors.P3;
  const isResolved = incident.status === "resolved";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `rounded-lg border ${colors.border} ${isResolved ? "bg-gray-950 opacity-75" : colors.bg} p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-3 mb-4 flex-wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `px-2 py-0.5 rounded text-xs font-bold ${colors.badge}`, children: incident.severity }),
      incident.status && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${statusBadge[incident.status]}`, children: incident.status }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `text-sm font-semibold ${colors.text} flex-1`, children: incident.title }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-xs text-gray-500", children: isResolved && incident.resolvedAt ? `resolved ${elapsed(incident.resolvedAt)}` : elapsed(incident.startedAt) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-gray-500 mb-1", children: "Servicios afectados" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex flex-wrap gap-2", children: incident.affectedServices.map((s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300", children: s }, s)) })
    ] }),
    incident.timeline && incident.timeline.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-gray-500 mb-2", children: "Timeline" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-1.5 border-l border-gray-800 pl-3", children: incident.timeline.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex gap-3 text-xs relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-gray-700 absolute -left-4 top-1" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-gray-600 shrink-0", children: new Date(e.at).toLocaleTimeString() }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-gray-300", children: e.event })
      ] }, i)) })
    ] }),
    !isResolved && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex gap-2 mt-4 pt-3 border-t border-gray-800", children: [
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
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          onClick: () => onAction({ type: "resolve_incident", label: "Resolve", payload: { incidentId: incident.id }, requiresConfirmation: true }),
          className: "px-3 py-1.5 bg-green-800 hover:bg-green-700 rounded text-xs font-medium transition-colors ml-auto",
          children: "\u2713 Resolve"
        }
      )
    ] }),
    isResolved && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-4 pt-3 border-t border-gray-800", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-xs text-green-500", children: "\u2713 Incident resolved" }) })
  ] });
}

// src/components/ServiceHealth.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var statusConfig = {
  down: { dot: "bg-red-400", text: "text-red-400", border: "border-red-900", order: 0 },
  degraded: { dot: "bg-yellow-400", text: "text-yellow-400", border: "border-yellow-900", order: 1 },
  healthy: { dot: "bg-green-400", text: "text-green-400", border: "border-green-900", order: 2 }
};
function ServiceHealth({ data, onAction, className }) {
  const { services } = data;
  if (!services) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(LoadingState, { rows: 4 });
  if (services.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(EmptyState, { message: "No services to display" });
  const sorted = [...services].sort((a, b) => statusConfig[a.status].order - statusConfig[b.status].order);
  const unhealthyCount = sorted.filter((s) => s.status !== "healthy").length;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-sm font-semibold text-gray-300", children: "Service Health" }),
        unhealthyCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs text-red-400 font-semibold", children: [
          unhealthyCount,
          " degraded"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          onClick: () => onAction({ type: "escalate", label: "Page On-Call", payload: { source: "service_health", unhealthyServices: sorted.filter((s) => s.status !== "healthy").map((s) => s.name) }, requiresConfirmation: true }),
          className: "px-3 py-1 bg-yellow-700 hover:bg-yellow-600 rounded text-xs font-medium transition-colors",
          children: "\u26A1 Page On-Call"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "space-y-2", children: sorted.map((s) => {
      const cfg = statusConfig[s.status];
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `flex items-center gap-3 rounded px-3 py-2 border ${cfg.border} bg-gray-900`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `w-2 h-2 rounded-full ${cfg.dot} shrink-0` }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-xs text-gray-300 w-28 shrink-0", children: s.name }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `text-xs ${cfg.text} w-16 shrink-0`, children: s.status }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs text-gray-500", children: [
          "p99: ",
          s.latencyP99,
          "ms"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: `text-xs w-20 text-right ${s.errorRate > 1 ? "text-red-400" : "text-gray-600"}`, children: [
          "err: ",
          s.errorRate,
          "%"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs text-gray-700 w-16 text-right", children: [
          s.rps,
          " rps"
        ] }),
        s.uptimePct != null && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: `text-xs w-16 text-right ${s.uptimePct < 99 ? "text-yellow-500" : "text-gray-700"}`, children: [
          s.uptimePct,
          "%"
        ] }),
        s.status !== "healthy" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            onClick: () => onAction({ type: "investigate_service", label: `Investigate ${s.name}`, payload: { service: s.name, status: s.status, latencyP99: s.latencyP99, errorRate: s.errorRate } }),
            className: "px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors shrink-0 ml-auto",
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
var import_react = require("react");
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
  const [pendingRollback, setPendingRollback] = (0, import_react.useState)(null);
  if (!deploys) return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(LoadingState, { rows: 3 });
  if (deploys.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(EmptyState, { message: `No deploys found for ${service ?? "service"}` });
  function confirmRollback() {
    if (!pendingRollback) return;
    onAction({
      type: "rollback",
      label: `Rollback to ${pendingRollback.version}`,
      payload: { deployId: pendingRollback.id, service: pendingRollback.service, version: pendingRollback.version },
      requiresConfirmation: false
    });
    setPendingRollback(null);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: `rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("h3", { className: "text-sm font-semibold text-gray-300 mb-4", children: [
      "Deploy History \u2014 ",
      service
    ] }),
    pendingRollback && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mb-4 rounded border border-red-700 bg-red-950 px-4 py-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs text-red-300 font-semibold mb-1", children: "\u26A0 Confirm rollback" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-xs text-red-400 mb-3", children: [
        "Roll back ",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "font-bold", children: service }),
        " from current to",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "font-bold", children: pendingRollback.version }),
        "? Running deploy will be stopped."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            onClick: confirmRollback,
            className: "px-3 py-1.5 bg-red-700 hover:bg-red-600 rounded text-xs font-medium transition-colors",
            children: "\u21A9 Confirm Rollback"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            onClick: () => setPendingRollback(null),
            className: "px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs font-medium transition-colors",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "space-y-2", children: deploys.map((d, i) => {
      const cfg = statusConfig2[d.status];
      const isPending = (pendingRollback == null ? void 0 : pendingRollback.id) === d.id;
      return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        "div",
        {
          className: `flex items-center gap-3 rounded px-3 py-2 border bg-gray-900 flex-wrap transition-colors ${isPending ? "border-red-700 bg-red-950" : "border-gray-800"}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: `w-2 h-2 rounded-full ${cfg.dot} shrink-0` }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-semibold text-gray-200 w-14 shrink-0", children: d.version }),
            i === 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "px-1.5 py-0.5 bg-blue-900 border border-blue-700 rounded text-xs text-blue-300 shrink-0", children: "LATEST" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: `text-xs ${cfg.text} w-20 shrink-0`, children: d.status }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs text-gray-500", children: elapsed2(d.deployedAt) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs text-gray-600", children: d.deployedBy }),
            d.commitSha && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs text-gray-700 bg-gray-800 px-1.5 rounded", children: d.commitSha }),
            d.changeCount != null && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "text-xs text-gray-700", children: [
              d.changeCount,
              " commits"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "ml-auto", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "button",
              {
                onClick: () => setPendingRollback(isPending ? null : d),
                className: `px-2 py-0.5 border rounded text-xs transition-colors whitespace-nowrap ${isPending ? "bg-gray-700 border-gray-600 text-gray-400" : "bg-red-900 hover:bg-red-800 border-red-700 text-red-300"}`,
                children: isPending ? "Cancel" : `&#8617; Rollback to ${d.version}`
              }
            ) })
          ]
        },
        d.id
      );
    }) })
  ] });
}

// src/components/AlertFeed.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var severityConfig = {
  critical: { dot: "bg-red-400", text: "text-red-400", border: "border-red-900", bg: "bg-red-950" },
  warning: { dot: "bg-yellow-400", text: "text-yellow-400", border: "border-yellow-900", bg: "bg-yellow-950" },
  info: { dot: "bg-blue-400", text: "text-blue-400", border: "border-blue-900", bg: "bg-blue-950" }
};
function elapsed3(iso) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1e3);
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  return `${Math.floor(secs / 3600)}h ago`;
}
function AlertFeed({ data, onAction, className }) {
  const { alerts, title } = data;
  if (!alerts) return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LoadingState, { rows: 4 });
  if (alerts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(EmptyState, { message: "No alerts" });
  const active = alerts.filter((a) => !a.resolved);
  const resolved = alerts.filter((a) => a.resolved);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: `rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "text-sm font-semibold text-gray-300", children: title ?? "Alert Feed" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex gap-3 text-xs", children: [
        active.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "text-red-400 font-semibold", children: [
          active.length,
          " firing"
        ] }),
        resolved.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "text-gray-600", children: [
          resolved.length,
          " resolved"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "space-y-2", children: alerts.map((a) => {
      const cfg = severityConfig[a.severity];
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
        "div",
        {
          className: `flex items-start gap-3 rounded px-3 py-2 border ${a.resolved ? "border-gray-800 bg-gray-900 opacity-50" : `${cfg.border} ${cfg.bg}`}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: `w-2 h-2 rounded-full ${cfg.dot} shrink-0 mt-1` }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: `text-xs font-bold ${cfg.text}`, children: a.severity.toUpperCase() }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-xs text-gray-400 bg-gray-800 px-1.5 rounded", children: a.service }),
                a.resolved && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-xs text-green-700 bg-gray-800 px-1.5 rounded", children: "\u2713 resolved" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-xs text-gray-300 mt-0.5", children: a.message })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-xs text-gray-600 shrink-0 mt-0.5", children: elapsed3(a.firedAt) })
          ]
        },
        a.id
      );
    }) }),
    active.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "mt-4 pt-3 border-t border-gray-800 flex gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          onClick: () => onAction({
            type: "create_incident",
            label: "Open Incident",
            payload: { alertIds: active.map((a) => a.id), services: Array.from(new Set(active.map((a) => a.service))) },
            requiresConfirmation: true
          }),
          className: "px-3 py-1.5 bg-red-700 hover:bg-red-600 rounded text-xs font-medium transition-colors",
          children: "+ Open Incident"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          onClick: () => onAction({
            type: "escalate",
            label: "Page On-Call",
            payload: { alertCount: active.length, services: Array.from(new Set(active.map((a) => a.service))) },
            requiresConfirmation: true
          }),
          className: "px-3 py-1.5 bg-yellow-700 hover:bg-yellow-600 rounded text-xs font-medium transition-colors",
          children: "\u26A1 Page On-Call"
        }
      )
    ] })
  ] });
}

// src/components/OnCallStatus.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function formatUntil(iso) {
  return new Date(iso).toLocaleString(void 0, { weekday: "short", hour: "2-digit", minute: "2-digit" });
}
function PersonRow({
  person,
  tier,
  onPage
}) {
  const tierColor = tier === "Primary" ? "bg-green-900 text-green-300 border-green-700" : "bg-gray-800 text-gray-400 border-gray-700";
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-3 rounded px-3 py-2.5 border border-gray-800 bg-gray-900", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "w-2 h-2 rounded-full bg-green-400 shrink-0" }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-xs font-semibold text-gray-200", children: person.name }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-xs text-gray-500", children: person.handle }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: `text-xs px-1.5 py-0.5 rounded border ${tierColor}`, children: tier })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "text-xs text-gray-600 mt-0.5", children: [
        person.schedule,
        " \xB7 until ",
        formatUntil(person.until)
      ] }),
      person.phone && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-xs text-gray-700 mt-0.5", children: person.phone })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "button",
      {
        onClick: onPage,
        className: "px-2 py-1 bg-orange-900 hover:bg-orange-800 border border-orange-700 rounded text-xs text-orange-300 transition-colors shrink-0",
        children: "\u{1F4DE} Page"
      }
    )
  ] });
}
function OnCallStatus({ data, onAction, className }) {
  const { team, primary, secondary, escalationPolicy } = data;
  if (!primary) return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(EmptyState, { message: "No on-call data" });
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: `rounded-lg border border-gray-800 bg-gray-950 p-5 font-mono${className ? ` ${className}` : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("h3", { className: "text-sm font-semibold text-gray-300", children: [
        "On-Call \u2014 ",
        team
      ] }),
      escalationPolicy && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "text-xs text-gray-700", children: escalationPolicy })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        PersonRow,
        {
          person: primary,
          tier: "Primary",
          onPage: () => onAction({
            type: "page_oncall",
            label: `Page ${primary.name}`,
            payload: { handle: primary.handle, tier: "primary", team },
            requiresConfirmation: true
          })
        }
      ),
      secondary && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        PersonRow,
        {
          person: secondary,
          tier: "Secondary",
          onPage: () => onAction({
            type: "page_oncall",
            label: `Page ${secondary.name}`,
            payload: { handle: secondary.handle, tier: "secondary", team },
            requiresConfirmation: true
          })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "button",
      {
        onClick: () => onAction({
          type: "escalate",
          label: "Escalate to On-Call",
          payload: { team, primaryHandle: primary.handle },
          requiresConfirmation: true
        }),
        className: "mt-4 w-full px-3 py-1.5 bg-yellow-700 hover:bg-yellow-600 rounded text-xs font-medium transition-colors",
        children: "\u26A1 Escalate to On-Call"
      }
    )
  ] });
}

// src/index.ts
var boardComponents = [
  {
    name: "IncidentDashboard",
    description: "Shows active incident: severity (P1/P2/P3), status (investigating/identified/resolved), elapsed time, affected services, and event timeline. Trigger words: incidente, alerta, falla, degradado. Pair with ServiceHealth and DeployHistory. Has Rollback, Escalate, and Resolve action buttons.",
    component: IncidentDashboard,
    category: "board",
    requiredData: ["id", "title", "severity", "startedAt", "affectedServices"]
  },
  {
    name: "ServiceHealth",
    description: "Real-time health grid for all services: latency p99 (ms), error rate (%), requests/sec, uptime %, and status (healthy/degraded/down). Degraded services sort to top. Use when user asks about system health or performance. Each degraded service has an Investigate button. Header has Page On-Call button.",
    component: ServiceHealth,
    category: "board",
    requiredData: ["services"]
  },
  {
    name: "SprintBoard",
    description: "Sprint task board: in-flight, blocked (with blockers), done, days remaining. Use when user asks about sprint status, blocked work, or team capacity \u2014 trigger words: sprint, blocked, bloqueado. Each blocked task has an Unblock button.",
    component: SprintBoard,
    category: "board",
    requiredData: ["sprintName", "tasks", "daysRemaining"]
  },
  {
    name: "MetricsChart",
    description: "Time-series line chart for a single engineering metric (latency ms, error rate %, RPS, memory MB) with optional threshold line. Use when user wants to see a trend, spike, or degradation over time. Shows Create Incident button when threshold exceeded.",
    component: MetricsChart,
    category: "board",
    requiredData: ["metric", "data", "unit"]
  },
  {
    name: "DeployHistory",
    description: "Recent deployment history for a service: version, deploy time, deployer, commit SHA, change count, and outcome (success/in_progress/rolled_back). Use when user asks what changed before an incident, wants to rollback, or asks about recent deploys \u2014 trigger words: deploy, deploy\xF3, rollback, qu\xE9 cambi\xF3. Each deploy row has an inline-confirmed Rollback button.",
    component: DeployHistory,
    category: "board",
    requiredData: ["service", "deploys"]
  },
  {
    name: "AlertFeed",
    description: "Real-time alert feed: shows firing and resolved alerts with severity (critical/warning/info), service name, message, and elapsed time. Use when user asks about active alerts, what is firing right now, or to see all ongoing issues \u2014 trigger words: alertas, qu\xE9 est\xE1 fallando, qu\xE9 est\xE1 disparado. Has Open Incident and Page On-Call action buttons when alerts are firing.",
    component: AlertFeed,
    category: "board",
    requiredData: ["alerts"]
  },
  {
    name: "OnCallStatus",
    description: "Shows who is currently on call: primary and secondary contact, schedule, shift end time, and phone. Use when user asks who is on call, needs to page someone, or before escalating an incident \u2014 trigger words: qui\xE9n est\xE1 de guardia, on-call, escalar, pagear. Has individual Page buttons and an Escalate button.",
    component: OnCallStatus,
    category: "board",
    requiredData: ["team", "primary"]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyState,
  LoadingState,
  boardComponents
});
