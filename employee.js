$(document).ready(function () {
    let existingEmails = ["test@example.com", "admin@company.com"];

    function clearErrorOnInputChange(inputSelector, errorSelector) {
        $(inputSelector).on('input change', function () {
            $(errorSelector).text("");
        });
    }
    clearErrorOnInputChange("#name", "#nameErrMsg");
    clearErrorOnInputChange("#email", "#emailErrMsg");
    clearErrorOnInputChange("#mobileNo", "#mobileNoErrMsg");
    clearErrorOnInputChange("#designation", "#designationErrMsg");
    clearErrorOnInputChange("input[name='gender']", "#genderErrMsg");
    clearErrorOnInputChange("input[type=checkbox]", "#courseErrMsg");
    clearErrorOnInputChange("#avatar", "#fileErrMsg");
    $("#employeeForm").on('submit', function (event) {
        event.preventDefault(); 
        let valid = true;
        $(".text-danger").text(""); 
        let name = $("#name").val();
        if (name === "") {
            $("#nameErrMsg").text("Please enter a name.");
            valid = false;
        }
        let email = $("#email").val();
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email === "") {
            $("#emailErrMsg").text("Please enter an email.");
            valid = false;
        } else if (!emailPattern.test(email)) {
            $("#emailErrMsg").text("Please enter a valid email.");
            valid = false;
        } else if (existingEmails.includes(email)) {
            $("#emailErrMsg").text("This email is already registered.");
            valid = false;
        }

        let mobileNo = $("#mobileNo").val();
        let mobilePattern = /^\d{10}$/;
        if (mobileNo === "") {
            $("#mobileNoErrMsg").text("Please enter a mobile number.");
            valid = false;
        } else if (!mobilePattern.test(mobileNo)) {
            $("#mobileNoErrMsg").text("Please enter a valid mobile number (10 digits).");
            valid = false;
        }
        let designation = $("#designation").val();
        if (designation === "") {
            $("#designationErrMsg").text("Please select a designation.");
            valid = false;
        }
        let gender = $("input[name='gender']:checked").val();
        if (!gender) {
            $("#genderErrMsg").text("Please select a gender.");
            valid = false;
        }
        let courseChecked = $("input[type=checkbox]:checked").length;
        if (courseChecked === 0) {
            $("#courseErrMsg").text("Please select at least one course.");
            valid = false;
        }
        let fileInput = $("#avatar")[0];
        let file = fileInput.files[0];
        if (file) {
            let fileType = file.type;
            if (fileType !== "image/jpeg" && fileType !== "image/png") {
                $("#fileErrMsg").text("Only JPG and PNG files are allowed.");
                valid = false;
            }
        } else {
            $("#fileErrMsg").text("Please upload a file.");
            valid = false;
        }
if (valid) {
    let newEmployee = {
        id: new Date().getTime(),
        name: name,
        email: email,
        mobile: mobileNo,
        designation: designation,
        gender: gender,
        course: $("input[type=checkbox]:checked").map(function() {
            return this.value;
        }).get(),
        image: fileInput.value ? file.name : 'default.jpg'
    };
    let employees = JSON.parse(localStorage.getItem('employees')) || {};
    employees[newEmployee.id] = newEmployee;
    localStorage.setItem('employees', JSON.stringify(employees));

    alert("Form submitted successfully!");
    $("#employeeForm")[0].reset();
    $(".text-danger").text("");
    window.location.href = 'employeelist.html';
} else {
    alert("Please correct the errors in the form before submitting.");
}

    });
});
