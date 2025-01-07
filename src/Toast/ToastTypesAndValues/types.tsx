import ToastDuration from "./ToastDuration.tsx"

export type ToastProps ={
    type: "info" | "success" | "warning" | "error" 
    heading: string,
    message: string,
    duration?: ToastDuration | number,
    onDismiss?: () => void,
    position?:"bottom"|"top"

  }