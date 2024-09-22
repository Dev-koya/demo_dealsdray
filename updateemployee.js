let employeeData = {
    name: "John Doe",
    email: "john.doe@example.com",
    mobileNo: "1234567890",
    designation: "Manager",
    gender: "Male",
    courses: ["MCA", "BCA"],
    avatar: "path_to_image.jpg" 
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const employeeId = parseInt(urlParams.get('id'), 10);

function populateForm() {
    if (!employeeData) {
        alert("Employee not found");
        return;
    }

    document.getElementById('name').value = employeeData.name;
    document.getElementById('email').value = employeeData.email;
    document.getElementById('mobileNo').value = employeeData.mobileNo;
    document.getElementById('designation').value = employeeData.designation;

    if (employeeData.gender === "Male") {
        document.getElementById('male').checked = true;
    } else if (employeeData.gender === "Female") {
        document.getElementById('female').checked = true;
    }

    if (employeeData.courses.includes("MCA")) {
        document.getElementById('mca').checked = true;
    }
    if (employeeData.courses.includes("BCA")) {
        document.getElementById('bca').checked = true;
    }
    if (employeeData.courses.includes("BSC")) {
        document.getElementById('bsc').checked = true;
    }

    if (employeeData.avatar) {
        const avatarDisplay = document.createElement('img');
        avatarDisplay.src = employeeData.avatar; 
        avatarDisplay.alt = "Current Avatar";
        avatarDisplay.style.width = '100px';
        document.body.appendChild(avatarDisplay);
    }
}

document.getElementById('updateEmployeeForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    let updatedEmployeeData = {
        id: employeeId,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobileNo: document.getElementById('mobileNo').value,
        designation: document.getElementById('designation').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        courses: []
    };

    if (document.getElementById('mca').checked) {
        updatedEmployeeData.courses.push("MCA");
    }
    if (document.getElementById('bca').checked) {
        updatedEmployeeData.courses.push("BCA");
    }
    if (document.getElementById('bsc').checked) {
        updatedEmployeeData.courses.push("BSC");
    }

    let avatarInput = document.getElementById('avatar');
    if (avatarInput.files.length > 0) {
        updatedEmployeeData.avatar = avatarInput.files[0].name; 
    } else {
        updatedEmployeeData.avatar = employeeData.avatar; 
    }

    let validationErrors = validateFormData(updatedEmployeeData);

    if (validationErrors.length > 0) {
        displayErrors(validationErrors);
    } else {
        console.log("Updated employee data:", updatedEmployeeData);
        alert("Employee updated successfully!");

    }
});

function validateFormData(data) {
    let errors = [];

    if (!data.name) {
        errors.push("Name is required.");
    }
    if (!data.email) {
        errors.push("Email is required.");
    }
    if (!data.mobileNo) {
        errors.push("Mobile Number is required.");
    }
    if (!data.designation) {
        errors.push("Designation is required.");
    }
    if (!data.gender) {
        errors.push("Gender is required.");
    }
    if (data.courses.length === 0) {
        errors.push("At least one course must be selected.");
    }

    return errors;
}


function displayErrors(errors) {
    document.getElementById('nameErrMsg').textContent = "";
    document.getElementById('emailErrMsg').textContent = "";
    document.getElementById('mobileNoErrMsg').textContent = "";
    document.getElementById('designationErrMsg').textContent = "";
    document.getElementById('genderErrMsg').textContent = "";
    document.getElementById('courseErrMsg').textContent = "";
    document.getElementById('fileErrMsg').textContent = "";

    errors.forEach(function (error) {
        if (error.includes("Name")) {
            document.getElementById('nameErrMsg').textContent = error;
        }
        if (error.includes("Email")) {
            document.getElementById('emailErrMsg').textContent = error;
        }
        if (error.includes("Mobile Number")) {
            document.getElementById('mobileNoErrMsg').textContent = error;
        }
        if (error.includes("Designation")) {
            document.getElementById('designationErrMsg').textContent = error;
        }
        if (error.includes("Gender")) {
            document.getElementById('genderErrMsg').textContent = error;
        }
        if (error.includes("course")) {
            document.getElementById('courseErrMsg').textContent = error;
        }
    });
}

populateForm();
