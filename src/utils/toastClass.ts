import { Id, toast } from "react-toastify";

class Toast {
    private loadMessage: string = 'Loading...';
    private id: Id

    constructor(loadingMessage: string) {
        this.loadMessage = loadingMessage;
        this.id = toast.loading(this.loadMessage, { autoClose: false })
    }

    sendSuccess(message: string, autoClose = 2000) {
        toast.update(this.id, { render: message, type: 'success', autoClose: autoClose, isLoading: false });
    }

    sendError(message: string, autoClose = 2000) {
        toast.update(this.id, { render: message, type: 'error', autoClose: autoClose, isLoading: false });
    }
}

export default Toast