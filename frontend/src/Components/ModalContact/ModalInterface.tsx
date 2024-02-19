import { ContactInterface } from "../Contact/Interface"

export enum ACTION {
    ADD = "add",
    PUT = "update",
}

export interface ModalInterface {
    id?: string
    contactData?: ContactInterface
    open: boolean
    action: ACTION
    handleOpen: () => void
    handleClose: () => void
}