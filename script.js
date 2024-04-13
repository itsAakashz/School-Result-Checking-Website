// Event listener for form submission
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let rollNo = document.getElementById('rollNo').value;
    searchStudent(rollNo);
});

// Function to search for a student by roll number
function searchStudent(rollNo) {
    fetch('students.json')
        .then(response => response.json())
        .then(data => {
            let student = data.find(student => student['ROLL NO'] == rollNo);
            if (student) {
                displayStudent(student);
            } else {
                alert(`Student with roll number ${rollNo} not found!`);
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
}

// Function to display student data in the report card
function displayStudent(student) {
    const reportCardContainer = document.getElementById('reportCardContainer');
    
    // Create the report card content
    const reportCard = document.createElement('div');
    reportCard.className = 'report-card';
    
    // School information
    const schoolInfo = document.createElement('div');
    schoolInfo.className = 'school-info';
    schoolInfo.innerHTML = `
        <h2>ABC School</h2>
        <p>123 Main Street, Anytown, State</p>
    `;
    reportCard.appendChild(schoolInfo);
    
    // Student information
    const studentInfo = document.createElement('div');
    studentInfo.className = 'student-info';
    studentInfo.innerHTML = `
        <h3>Student Information</h3>
        <p>Roll No: ${student['ROLL NO']}</p>
        <p>Name: ${student['NAME']}</p>
    `;
    reportCard.appendChild(studentInfo);
    
    // Results table
    const resultsTable = document.createElement('div');
    resultsTable.className = 'results-table';
    resultsTable.innerHTML = `
        <h3>Results</h3>
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Out of</th

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Math</td>
                    <td>${student['MATH']}</td>
                    <td>100</td>

                </tr>
                <tr>
                    <td>Science</td>
                    <td>${student['SCIENCE']}</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Social Science</td>
                    <td>${student['SOCIAL SCIENCE']}</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Hindi</td>
                    <td>${student['HINDI']}</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Sanskrit</td>
                    <td>${student['SANSKRIT']}</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>English</td>
                    <td>${student['ENGLISH']}</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Total Marks</td>
                    <td>${student['OBTAIN MARKS']}</td>
                    <td>${student['TOTAL MARKS']}</td>
                </tr>
            </tbody>
        </table>
        <p>Obtained Percentage: ${student['PERCENTAGE']}%</p>
        <p>Result Status: ${student['RESULT STATUS']}</p>
    `;
    reportCard.appendChild(resultsTable);
    
    // Append the report card to the container
    reportCardContainer.innerHTML = '';
    reportCardContainer.appendChild(reportCard);
    
    // Show the report card container
    reportCardContainer.style.display = 'block';
    
    // Enable the print button
    document.getElementById('printButton').disabled = false;
}

// Event listener for print button
document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});
