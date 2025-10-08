export type AlertProps ={

    heading:string,
    message:string,
    type: "success"|"error"|"warning"|"info",
    cancelButtonVisible?:boolean,
    onAccept? :()=>void,
    onCancel? :()=>void,
    closeOnBackPress?:boolean
    confirmButtonText?:string
}