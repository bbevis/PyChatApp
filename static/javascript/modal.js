class suggestModal {
    constructor({
        titleText,
        messageText,
        confirmText,
        cancelText,
    }) {
        this.titleText = titleText;
        this.messageText = messageText;
        this.confirmText = confirmText;
        this.cancelText = cancelText;
    }

    createAndOpen(onConfirm, onCancel) {
        // console.log("createAndOpen")
        // // Grey background
        // this.modalBackground = document.createElement('div')
        // this.modalBackground.setAttribute("id", "modalBackground")
        // this.modalBackground.classList.add('modalBackground')

        // Top level
        this.modalElem = document.createElement('div');
        this.modalElem.setAttribute("id", "modal")
        this.modalElem.classList.add('modal');
        setTimeout(() => {
            this.modalElem.classList.add('open');
        }, 400);

        const modalContentElem = document.createElement('div');
        modalContentElem.classList.add('content');

        this.modalElem.appendChild(modalContentElem);

        // Title
        const titleTextElem = document.createElement('p');
        titleTextElem.classList.add('titleText');
        titleTextElem.textContent = this.titleText;

        modalContentElem.appendChild(titleTextElem);

        // Message
        const messageTextElem = document.createElement('p');
        messageTextElem.classList.add('messageText');
        messageTextElem.textContent = this.messageText;

        modalContentElem.appendChild(messageTextElem);

        // Buttons
        const cancelButtonTextElem = document.createElement('button');
        cancelButtonTextElem.classList.add('cancelButtonText');
        cancelButtonTextElem.textContent = this.cancelText;

        cancelButtonTextElem.addEventListener('click', () => {
            onCancel('Rejected');
            this.close();
        });

        modalContentElem.appendChild(cancelButtonTextElem);

        const confirmButtonTextElem = document.createElement('button');
        confirmButtonTextElem.classList.add('confirmButtonText');
        confirmButtonTextElem.textContent = this.confirmText;

        confirmButtonTextElem.addEventListener('click', () => {
            onConfirm('Accepted');
            this.close();
        });

        modalContentElem.appendChild(confirmButtonTextElem);

        document.body.appendChild(this.modalElem);
    }
    open() {
        return new Promise((resolve, reject) => {
            thiscreateAndOpen(resolve, reject)

        });
    }
    close() {
        this.modalElem.classList.remove('open');
        setTimeout(() => {
            document.body.removeChild(this.modalElem)
        }, 400);

    }
}