// Event listener for form submission
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const rollNo = document.getElementById('rollNo').value;
    searchStudent(rollNo);
});

// Function to search for a student by roll number
function searchStudent(rollNo) {
    fetch('students.json')
        .then(response => response.json())
        .then(data => {
            const student = data.find(student => student['ROLL NO'] == rollNo);
            if (student) {
                displayReportCard(student);
            } else {
                alert(`Student with roll number ${rollNo} not found!`);
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
}

// Function to display student data in a report card format
function displayReportCard(student) {
    const reportCard = document.getElementById('reportCard');
    reportCard.innerHTML = ''; // Clear previous search results

    // Create header with student information
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('result-header');

    const studentInfo = `
        <div>
            <h3>Student Name:</h3>
            <p>${student.NAME}</p>
        </div>
        <div>
            <h3>Roll Number:</h3>
            <p>${student['ROLL NO']}</p>
        </div>
    `;
    headerDiv.innerHTML = studentInfo;

    reportCard.appendChild(headerDiv);

    // Create table for marks
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Out of</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Math</td>
                <td>${student.MATH}</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Science</td>
                <td>${student.SCIENCE}</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Social Science</td>
                <td>${student['SOCIAL SCIENCE']}</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Hindi</td>
                <td>${student.HINDI}</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Sanskrit</td>
                <td>${student.SANSKRIT}</td>
                <td>100</td>
            </tr>
            <tr>
                <td>English</td>
                <td>${student.ENGLISH}</td>
                <td>100</td>
            </tr>
            <tr>
                <td>Total Marks</td>
                <td>${student['OBTAIN MARKS']}</td>
                <td>600</td>
            </tr>
            <tr>
                <td>Percentage</td>
                <td>${student.PERCENTAGE.toFixed(2)}%</td>
                <td></td>
            </tr>
            <tr>
                <td>Result Status</td>
                <td>${student['RESULT STATUS']}</td>
                <td></td>
            </tr>
        </tbody>
    `;

    reportCard.appendChild(table);

    // Enable the print button and make the report card visible
    document.getElementById('printButton').disabled = false;
    reportCard.style.display = 'block';
}

// Event listener for print button
document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});
