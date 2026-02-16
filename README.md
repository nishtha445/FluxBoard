# FluxBoard – Offline-First Task Board

FluxBoard is a React 18 + TypeScript task board focused on
**state purity, performance at scale, and correctness under concurrency**.

---

## 🧠 Architecture Overview

- State is normalized (`tasks` + `order`)
- Reducer is 100% pure and immutable
- All orchestration logic lives in custom hooks
- Components are declarative and memoized

---

## 🔁 Undo / Redo Implementation

Undo/Redo is implemented using two stacks:

- `history` → past snapshots (max 15)
- `future` → redo stack

### Flow:
1. Any mutating action stores a snapshot in `history`
2. `UNDO`
   - Pops last snapshot from `history`
   - Pushes current state into `future`
3. `REDO`
   - Restores first snapshot from `future`
   - Pushes current state back into `history`

Snapshots only contain `{ tasks, order }`  
History itself is never nested inside snapshots.

---

## ⏱️ Stale Closure Prevention (Mandatory Test)

A global timer updates every 10 seconds.

### Key design decision:
- The timer **never reads state**
- It only dispatches a `TICK` action
- The reducer updates time safely with the latest state

This prevents stale closures entirely.

### How to test:
1. Leave the app idle for 30+ seconds
2. Add or update a task
3. All timers remain accurate without reset

---

## 🚀 Performance Strategy (5,000+ Tasks)

- Manual list virtualization (windowing)
- Task cards memoized with custom comparison
- Columns re-render independently
- Stable callbacks via `useCallback`
- No inline functions in JSX

Result: Constant 60fps even with large datasets.

---

## 🧩 Referential Equality Guarantees

- Tasks accessed by ID (O(1))
- Arrays recreated only when order changes
- `React.memo` prevents unrelated column re-renders

Updating a task in **Todo** does NOT re-render **Done**.

---

## 💾 Persistence Strategy

- State is persisted to `localStorage`
- Writes are debounced (800ms)
- Rapid Undo/Redo only saves final state
- Corrupted storage is detected and repaired automatically

---

## 🛠️ Development Safety

- Reducer state is deep-frozen in development
- Mutations throw immediately
- Strict TypeScript mode enabled

---

## 🧪 Tech Stack

- React 18
- TypeScript (strict)
- Native HTML5 Drag & Drop
- No external state libraries
