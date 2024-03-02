class suggestModal {
    constructor(
        titleText,
        messageText,
        confirmText,
        cancelText,
    ) {
        this.titleText = titleText;
        this.messageText = messageText;
        this.confirmText = confirmText;
        this.cancelText = cancelText;
    }

    createAndOpen() {
        this.modalElem = document.createElement('div');
        this.modalElem.classList.add('modal');
        setTimeout(() => {
            this.modalElem.classList.add('open');
        }, 400);

        const modalContentElem = dcument.createElement('div');
        modalContentElem.classList.add('content');

        this.modalElem.appendChild(modalContentElem);

        // Title
        const titleTextElem = document.createElement('p');
        tltleTextElem.classList.add('titleText');
        titleTextElem.textContent = this.titleText;

        modalContentElem.appendChild(titleTextElem);

        // Message
        const messageTextElem = document.createElement('p');
        tltleTextElem.classList.add('titleText');
        titleTextElem.textContent = this.titleText;

        modalContentElem.appendChild(messageTextElem);

        document.body.appendchild(this.modalElem);
    }
}