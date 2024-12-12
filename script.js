$(document).ready(function () {
    $("#validateForm").click(function (event) {
        event.preventDefault();

        let isValid = true

        const name = $("#uname").val().trim();
        const email = $('#uemail').val().trim();
        const feedback = $('#feedback').val().trim();

        const errName = $('#error-uname');
        const errEmail = $('#error-uemail');
        const errFeedback = $('#error-feedback');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        errName.text('')
        errEmail.text('')
        errFeedback.text('')

        if (name === '') {
            errName.text('Enter your name');
            isValid = false
        } else if (name.length < 3) {
            errName.text('Name must have minimum 3 characters');
            isValid = false
        }
        if (email === '') {
            errEmail.text('Enter your email')
            isValid = false
        } else if (!emailPattern.test(email)) {
            errEmail.text('Enter a valid email')
            isValid = false
        }
        if (feedback === '') {
            errFeedback.text('Enter your feedback')
            isValid = false
        } else if (feedback.length < 10) {
            errFeedback.text('Feedback contain at least 10 characters')
            isValid = false
        }
        if (isValid) {

            const formData = {
                name: name,
                email: email,
                feedback: feedback
            }

            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                type: "POST",
                contentType: "application/json", 
                data: JSON.stringify(formData),
                success: function (response) {
                    const successMsg = $('#scuess-msg');
                    successMsg.text('Form submitted successfully')
                },
                error: function () {
                    alert("Error sending data")
                }
            })

            $('#uname').val('');
            $('#uemail').val('');
            $('#feedback').val('');
        }
    })
})