// Department and Course Structure
const departments = {
    'School of Engineering': {
        'B.Tech': {
            core: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Engineering Mechanics'],
            electives: ['Robotics', 'Artificial Intelligence', 'Data Science', 'Cloud Computing']
        }
    },
    'School of Pharmacy': {
        'B.Pharm': {
            core: ['Pharmaceutical Chemistry', 'Pharmacology', 'Pharmaceutics', 'Pharmacognosy'],
            electives: ['Clinical Pharmacy', 'Pharmaceutical Analysis', 'Drug Design', 'Biotechnology']
        }
    },
    'School of Business': {
        'BBA': {
            core: ['Business Management', 'Marketing', 'Finance', 'Economics'],
            electives: ['Digital Marketing', 'Entrepreneurship', 'International Business', 'Human Resources']
        }
    }
};

const users = {
    admin: [],
    faculty: [],
    student: []
};

const attendanceRecords = {};
const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

// Course and Subject Definitions
const courseSubjects = {
    btech: {
        core: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Engineering Mechanics', 'Digital Electronics'],
        electives: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Cloud Computing', 'Cybersecurity']
    },
    bpharm: {
        core: ['Pharmaceutical Chemistry', 'Pharmacology', 'Pharmacy Practice', 'Pharmaceutical Analysis', 'Pharmaceutical Technology'],
        electives: ['Clinical Pharmacy', 'Drug Design', 'Pharmaceutical Marketing', 'Pharmaceutical Biotechnology', 'Pharmaceutical Quality Assurance']
    },
    bba: {
        core: ['Business Management', 'Economics', 'Accounting', 'Marketing', 'Business Law', 'Organizational Behavior'],
        electives: ['Digital Marketing', 'Entrepreneurship', 'International Business', 'Financial Management', 'Human Resource Management']
    }
};

// Initialize with some sample data
function initializeSampleData() {
    // Sample admin
    users.admin.push({
        name: 'Admin User',
        password: 'admin123',
        id: 'ADM001',
        phone: '1234567890',
        email: 'admin@example.com'
    });

    // Sample faculty
    users.faculty.push({
        name: 'John Doe',
        password: 'faculty123',
        id: 'FAC001',
        phone: '9876543210',
        email: 'john@example.com',
        department: 'B.Tech',
        course: 'Computer Science',
        subjects: ['Data Structures & Algorithms', 'Operating Systems']
    });

    // Sample students
    users.student.push(
        {
            name: 'Alice Smith',
            password: 'student123',
            id: 'STU001',
            phone: '5555555555',
            email: 'alice@example.com',
            department: 'B.Tech',
            course: 'Computer Science',
            coreSubjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems'],
            electiveSubjects: ['Artificial Intelligence']
        },
        {
            name: 'Bob Johnson',
            password: 'student123',
            id: 'STU002',
            phone: '6666666666',
            email: 'bob@example.com',
            department: 'B.Pharm',
            course: 'Pharmacology',
            coreSubjects: ['Human Anatomy & Physiology', 'Pharmacotherapeutics', 'Toxicology'],
            electiveSubjects: ['Clinical Trials']
        }
    );
}

// Call initialization
initializeSampleData();

function showForm(role, action) {
    document.querySelectorAll('.form-container').forEach(form => form.classList.remove('active'));
    const targetForm = document.getElementById(`${role}-${action}`);
    targetForm.classList.add('active');
    
    // Scroll to form with smooth animation
    targetForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // If registration form, populate department and course dropdowns
    if (action === 'register' && (role === 'faculty' || role === 'student')) {
        populateDepartmentDropdown(role);
    }
}

function populateDepartmentDropdown(role) {
    const departmentSelect = document.getElementById(`${role}-department-register`);
    const courseSelect = document.getElementById(`${role}-course-register`);
    const coreSubjectsSelect = document.getElementById(`${role}-core-subjects-register`);
    const electiveSubjectsSelect = document.getElementById(`${role}-elective-subjects-register`);

    // Clear existing options
    departmentSelect.innerHTML = '<option value="">Select Department</option>';
    courseSelect.innerHTML = '<option value="">Select Course</option>';
    coreSubjectsSelect.innerHTML = '<option value="">Select Core Subjects</option>';
    electiveSubjectsSelect.innerHTML = '<option value="">Select Elective Subject</option>';

    // Add department options
    Object.keys(departments).forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        departmentSelect.appendChild(option);
    });

    // Add event listener for department selection
    departmentSelect.addEventListener('change', () => {
        const selectedDepartment = departmentSelect.value;
        courseSelect.innerHTML = '<option value="">Select Course</option>';
        coreSubjectsSelect.innerHTML = '<option value="">Select Core Subjects</option>';
        electiveSubjectsSelect.innerHTML = '<option value="">Select Elective Subject</option>';

        if (selectedDepartment && departments[selectedDepartment]) {
            // Populate course options based on department
            Object.keys(departments[selectedDepartment]).forEach(course => {
                const option = document.createElement('option');
                option.value = course;
                option.textContent = course;
                courseSelect.appendChild(option);
            });
        }
    });

    // Add event listener for course selection
    courseSelect.addEventListener('change', () => {
        const selectedDepartment = departmentSelect.value;
        const selectedCourse = courseSelect.value;
        coreSubjectsSelect.innerHTML = '<option value="">Select Core Subjects</option>';
        electiveSubjectsSelect.innerHTML = '<option value="">Select Elective Subject</option>';

        if (selectedDepartment && selectedCourse && departments[selectedDepartment][selectedCourse]) {
            const courseData = departments[selectedDepartment][selectedCourse];
            
            // Populate core subjects
            courseData.core.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                coreSubjectsSelect.appendChild(option);
            });

            // Populate elective subjects
            courseData.electives.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                electiveSubjectsSelect.appendChild(option);
            });

            // If it's student registration, auto-select all core subjects
            if (role === 'student') {
                Array.from(coreSubjectsSelect.options).forEach(option => {
                    if (option.value) option.selected = true;
                });
            }
        }
    });
}

// Form Validation Functions
function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
}

function validatePassword(password) {
    return password.length >= 5 && password.length <= 50;
}

function validateStudentId(id) {
    const currentYear = new Date().getFullYear();
    const idRegex = new RegExp(`^${currentYear}\\d{4}$`);
    return idRegex.test(id);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Generate next available student ID
function generateNextStudentId() {
    const currentYear = new Date().getFullYear();
    const existingIds = users.student
        .map(student => parseInt(student.id.slice(-4)))
        .filter(id => id >= 0);
    
    const nextSequence = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    return `${currentYear}${String(nextSequence).padStart(4, '0')}`;
}

// Update registerUser function
function registerUser(event, role) {
    event.preventDefault();
    
    const name = document.getElementById(`${role}-name-register`).value;
    const password = document.getElementById(`${role}-password-register`).value;
    const id = role === 'student' ? generateNextStudentId() : document.getElementById(`${role}-id-register`).value;
    const phone = document.getElementById(`${role}-phone-register`).value;
    const email = document.getElementById(`${role}-email-register`).value;
    const department = document.getElementById(`${role}-department-register`).value;
    const course = document.getElementById(`${role}-course-register`).value;
    
    // Validation
    if (!validateName(name)) {
        showNotification('Name should only contain alphabetic letters', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showNotification('Password must be between 5 and 50 characters', 'error');
        return;
    }
    
    if (role === 'student' && !validateStudentId(id)) {
        showNotification('Invalid student ID format', 'error');
        return;
    }
    
    if (!validatePhoneNumber(phone)) {
        showNotification('Phone number must be exactly 10 digits', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Invalid email format', 'error');
        return;
    }
    
    // Check for duplicate email
    if (users[role].some(user => user.email === email)) {
        showNotification('Email already registered', 'error');
        return;
    }
    
    // Get selected subjects
    let coreSubjects = [];
    let electiveSubject = '';
    
    if (role === 'student') {
        // For students, get all core subjects from the course
        coreSubjects = departments[department][course].core;
        electiveSubject = document.getElementById('student-elective-subjects-register').value;
    } else if (role === 'faculty') {
        // For faculty, get their selected subjects
        coreSubjects = Array.from(document.getElementById('faculty-core-subjects-register').selectedOptions)
            .map(option => option.value);
        electiveSubject = document.getElementById('faculty-elective-subjects-register').value;
    }
    
    const newUser = {
        name,
        password,
        id,
        phone,
        email,
        department,
        course,
        coreSubjects,
        electiveSubject
    };
    
    users[role].push(newUser);
    showNotification(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`, 'success');
    
    // Reset form
    event.target.reset();
    if (role === 'student') {
        document.getElementById('student-id-register').value = generateNextStudentId();
    }
}

// Initialize dropdowns when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populateDepartmentDropdown('student');
    populateDepartmentDropdown('faculty');
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 100);
}

function loginUser(event, role) {
    event.preventDefault();
    const name = document.getElementById(`${role}-name-login`).value;
    const password = document.getElementById(`${role}-password-login`).value;
    const user = users[role].find(user => user.name === name && user.password === password);

    if (user) {
        showNotification(`Welcome, ${name}!`, 'success');
        showPortal(role, user);
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
}

function showPortal(role, user) {
    document.querySelectorAll('.form-container').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.user-panels').forEach(panel => panel.style.display = 'none');
    
    if (role === 'admin') {
        document.getElementById('admin-portal').style.display = 'block';
        loadAdminData();
    } else if (role === 'faculty') {
        document.getElementById('faculty-portal').style.display = 'block';
        loadFacultyData(user);
    } else if (role === 'student') {
        document.getElementById('student-portal').style.display = 'block';
        loadStudentData(user);
    }
}

function loadAdminData() {
    const studentTable = document.getElementById('admin-student-table').querySelector('tbody');
    const facultyTable = document.getElementById('admin-faculty-table').querySelector('tbody');
    studentTable.innerHTML = '';
    facultyTable.innerHTML = '';

    users.student.forEach(student => {
        studentTable.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.phone}</td>
                <td>${student.email}</td>
                <td>
                    <button onclick="deleteUser('student', '${student.id}')" class="delete-btn">Delete</button>
                    <button onclick="editUser('student', '${student.id}')" class="edit-btn">Edit</button>
                </td>
            </tr>
        `;
    });

    users.faculty.forEach(faculty => {
        facultyTable.innerHTML += `
            <tr>
                <td>${faculty.name}</td>
                <td>${faculty.id}</td>
                <td>${faculty.phone}</td>
                <td>${faculty.email}</td>
                <td>
                    <button onclick="deleteUser('faculty', '${faculty.id}')" class="delete-btn">Delete</button>
                    <button onclick="editUser('faculty', '${faculty.id}')" class="edit-btn">Edit</button>
                </td>
            </tr>
        `;
    });
}

function loadFacultyData(faculty) {
    const tableBody = document.getElementById('faculty-attendance-table').querySelector('tbody');
    tableBody.innerHTML = '';
    
    // Filter students based on faculty's subjects
    const relevantStudents = users.student.filter(student => 
        student.coreSubjects.some(subject => faculty.coreSubjects.includes(subject)) ||
        student.electiveSubject === faculty.electiveSubject
    );
    
    if (relevantStudents.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No students found for your subjects</td></tr>';
        return;
    }
    
    // Add subject selection for faculty
    const subjectSelect = document.createElement('select');
    subjectSelect.id = 'faculty-subject-select';
    subjectSelect.className = 'form-control mb-3';
    
    const allSubjects = [...new Set([
        ...faculty.coreSubjects,
        faculty.electiveSubject
    ].filter(Boolean))];
    
    allSubjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
    
    tableBody.parentElement.insertBefore(subjectSelect, tableBody);
    
    // Add date selection
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'attendance-date';
    dateInput.className = 'form-control mb-3';
    dateInput.value = new Date().toISOString().split('T')[0];
    tableBody.parentElement.insertBefore(dateInput, tableBody);
    
    // Add bulk actions
    const bulkActions = document.createElement('div');
    bulkActions.className = 'bulk-actions mb-3';
    bulkActions.innerHTML = `
        <button onclick="markAllPresent()" class="btn btn-success">Mark All Present</button>
        <button onclick="markAllAbsent()" class="btn btn-danger">Mark All Absent</button>
    `;
    tableBody.parentElement.insertBefore(bulkActions, tableBody);
    
    // Populate table with filtered students
    relevantStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td><input type="checkbox" class="attendance-checkbox" data-student-id="${student.id}"></td>
        `;
        tableBody.appendChild(row);
    });
}

// Add bulk action functions
function markAllPresent() {
    document.querySelectorAll('.attendance-checkbox').forEach(checkbox => {
        checkbox.checked = true;
    });
}

function markAllAbsent() {
    document.querySelectorAll('.attendance-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
}

// Update saveAttendance function
function saveAttendance() {
    const subject = document.getElementById('faculty-subject-select').value;
    const date = document.getElementById('attendance-date').value;
    
    if (!subject || !date) {
        showNotification('Please select both subject and date', 'error');
        return;
    }
    
    const attendanceData = {
        subject,
        date,
        records: {}
    };
    
    document.querySelectorAll('.attendance-checkbox').forEach(checkbox => {
        const studentId = checkbox.dataset.studentId;
        attendanceData.records[studentId] = checkbox.checked;
    });
    
    // Save attendance data
    if (!attendanceRecords[date]) {
        attendanceRecords[date] = {};
    }
    attendanceRecords[date][subject] = attendanceData.records;
    
    showNotification('Attendance saved successfully!', 'success');
}

function loadStudentData(student) {
    // Update student dashboard
    const studentInfo = document.getElementById('student-info');
    studentInfo.innerHTML = `
        <div class="info-item">
            <span class="info-label">Name:</span>
            <span>${student.name}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Student ID:</span>
            <span>${student.id}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Email:</span>
            <span>${student.email}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Phone:</span>
            <span>${student.phone}</span>
        </div>
    `;

    const courseInfo = document.getElementById('course-info');
    courseInfo.innerHTML = `
        <div class="info-item">
            <span class="info-label">Department:</span>
            <span>${student.department}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Course:</span>
            <span>${student.course}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Core Subjects:</span>
            <span>${student.coreSubjects.join(', ')}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Elective Subjects:</span>
            <span>${student.electiveSubjects.join(', ')}</span>
        </div>
    `;

    // Load attendance data
    const tableBody = document.getElementById('student-attendance-table').querySelector('tbody');
    tableBody.innerHTML = '';

    // Add subject selection
    const subjectSelect = document.createElement('select');
    subjectSelect.id = 'student-subject-select';
    subjectSelect.innerHTML = `
        <option value="">Select Subject</option>
        ${[...student.coreSubjects, ...student.electiveSubjects].map(subject => 
            `<option value="${subject}">${subject}</option>`
        ).join('')}
    `;
    tableBody.parentElement.insertBefore(subjectSelect, tableBody);

    // Add date selection
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'student-attendance-date';
    dateInput.value = new Date().toISOString().split('T')[0];
    tableBody.parentElement.insertBefore(dateInput, tableBody);

    // Load attendance data when subject or date changes
    function updateAttendanceTable() {
        const subject = subjectSelect.value;
        const date = dateInput.value;
        
        if (!subject || !date) return;

        const record = attendanceRecords[student.id]?.[subject]?.[date];
        if (!record) {
            tableBody.innerHTML = '<tr><td colspan="4">No attendance record found</td></tr>';
            return;
        }

        tableBody.innerHTML = `
            <tr>
                <td>${subject}</td>
                <td>
                    <span class="attendance-status ${record.present ? 'attendance-present' : 'attendance-absent'}">
                        ${record.present ? 'Present' : 'Absent'}
                    </span>
                </td>
                <td>${formatDate(date)}</td>
                <td>${record.notes || '-'}</td>
            </tr>
        `;

        // Calculate attendance percentage
        const subjectRecords = attendanceRecords[student.id][subject];
        const totalDays = Object.keys(subjectRecords).length;
        const presentDays = Object.values(subjectRecords).filter(r => r.present).length;
        const attendancePercentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

        document.getElementById('attendance-percentage').innerHTML = `
            <div class="attendance-stats">
                <h3>Attendance Statistics</h3>
                <p>Total Classes: ${totalDays}</p>
                <p>Present: ${presentDays}</p>
                <p>Absent: ${totalDays - presentDays}</p>
                <p>Attendance Percentage: ${attendancePercentage.toFixed(1)}%</p>
            </div>
        `;
    }

    subjectSelect.addEventListener('change', updateAttendanceTable);
    dateInput.addEventListener('change', updateAttendanceTable);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function deleteUser(role, id) {
    if (confirm(`Are you sure you want to delete this ${role}?`)) {
        const index = users[role].findIndex(user => user.id === id);
        if (index !== -1) {
            users[role].splice(index, 1);
            showNotification(`${role.charAt(0).toUpperCase() + role.slice(1)} deleted successfully!`, 'success');
            if (role === 'student') {
                loadAdminData();
                loadFacultyData(users.faculty[0]);
            } else if (role === 'faculty') {
                loadAdminData();
            }
        }
    }
}

function editUser(role, id) {
    const user = users[role].find(user => user.id === id);
    if (!user) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Edit ${role.charAt(0).toUpperCase() + role.slice(1)}</h2>
            <form onsubmit="updateUser(event, '${role}', '${id}')">
                <input type="text" value="${user.name}" name="name" required>
                <input type="text" value="${user.id}" name="id" required>
                <input type="text" value="${user.phone}" name="phone" required>
                <input type="email" value="${user.email}" name="email" required>
                <button type="submit">Update</button>
                <button type="button" onclick="this.closest('.modal').remove()">Cancel</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function updateUser(event, role, id) {
    event.preventDefault();
    const form = event.target;
    const user = users[role].find(user => user.id === id);
    
    if (user) {
        user.name = form.name.value;
        user.id = form.id.value;
        user.phone = form.phone.value;
        user.email = form.email.value;
        
        showNotification(`${role.charAt(0).toUpperCase() + role.slice(1)} updated successfully!`, 'success');
        form.closest('.modal').remove();
        loadAdminData();
    }
}

function logout() {
    document.querySelectorAll('.form-container').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.user-panels').forEach(panel => panel.style.display = 'flex');
    document.getElementById('admin-portal').style.display = 'none';
    document.getElementById('faculty-portal').style.display = 'none';
    document.getElementById('student-portal').style.display = 'none';
    showNotification('Logged out successfully!', 'info');
} 