
// create modal object
// title, text, button labels

const confirmModal = new suggestModal({
    titleText: "Are you sure you would like to send this message?",
    messageText: "You can alternatively choose to send this message instead",
    confirmText: "Accept",
    cancelText: "Reject",
});

console.log(confirmModal)

document
    .getElementById('openModal')
    .addEventListener('click', () => {
        console.log('Send button clicked');
        //open modal from here
        confirmModal.Open()
        // .then(value => console.log('User clicked confirm: ',value))
        // .catch(value => console.log('User clicked cancel: ', value))
        // In this case - we want:
        // clicking on the cancel button to result in the modal closing
        // clicking on the confirm button copies the suggested text into the message box
        ;
    });