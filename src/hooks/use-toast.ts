import * as React from "react"
import { ToastActionElement, type ToastProps } from "@/components/ui/toast"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0
function genId() {
  count++
  return count.toString()
}

function reducer(
  state: ToasterToast[],
  action: {
    type: keyof typeof actionTypes
    toast?: ToasterToast
    toastId?: string
  }
): ToasterToast[] {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.toast!].slice(0, TOAST_LIMIT)
    case "UPDATE_TOAST":
      return state.map((t) =>
        t.id === action.toast!.id ? { ...t, ...action.toast } : t
      )
    case "DISMISS_TOAST":
      return state.map((t) =>
        t.id === action.toastId ? { ...t, open: false } : t
      )
    case "REMOVE_TOAST":
      return state.filter((t) => t.id !== action.toastId)
    default:
      return state
  }
}

function useToast() {
  const [state, dispatch] = React.useReducer(reducer, [])

  function toast(toast: Omit<ToasterToast, "id">) {
    const id = genId()
    dispatch({
      type: "ADD_TOAST",
      toast: {
        ...toast,
        id,
       
      },
    })

    return {
      id,
      dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
      update: (props: ToasterToast) =>
        dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } }),
    }
  }

  return {
    toast,
    toasts: state,
  }
}

export { useToast }
export type { ToasterToast }
