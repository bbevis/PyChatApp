
// create modal object
// title, text, button labels

const confirmModal = new suggestModal({
    titleText: "Are you sure you would like to send this message?",
    messageText: "You can alternatively choose to send this message instead",
    confirmText: "Use suggested message",
    cancelText: "Keep original message",
});

console.log(confirmModal)

document
    .getElementById('Send')
    .addEventListener('click', () => {
        console.log('Ssend button triggered modal');
        //open modal from here
        // take further action
    });