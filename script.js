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

            const data = {
                name : name,
                email : email,
                feedback : feedback
            }

            const formData = `
            name: "${data.name}",
            email: "${data.email}",
            feedback: "${data.feedback}"
            `

            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function () {

                    // const displayData = JSON.stringify(response)
                    const submittedData = $("#submitted-data")
                    const successMsg = $('#scuess-msg');
                    successMsg.text('Form submitted successfully')
                    submittedData.text(formData)

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