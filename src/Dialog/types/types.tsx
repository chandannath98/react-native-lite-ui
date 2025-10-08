export type DialogProps ={

    heading:string,
    message:string,
    cancelButtonVisible?:boolean,
    onAccept? :()=>void,
    onCancel? :()=>void,
    closeOnBackPress?:boolean
    confirmButtonText?:string
}