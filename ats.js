// Assignment Tracker System JavaScript

// State Management
let currentGrade = null;
let currentClass = null;
let assignments = {};

// Initialize assignments data structure
function initializeAssignments() {
    const grades = [8, 9, 10, 11, 12];
    const classes = ['english', 'mathematics', 'science', 'history', 'language', 'elective'];
    
    grades.forEach(grade => {
        assignments[grade] = {};
        classes.forEach(cls => {
            assignments[grade][cls] = generateSampleAssignments(grade, cls);
        });
    });
}

// Generate sample assignments for demonstration
function generateSampleAssignments(grade, className) {
    const sampleAssignments = {
        english: [
            {
                id: `${grade}-${className}-1`,
                title: 'Essay: Literary Analysis',
                description: 'Write a 5-paragraph essay analyzing the themes in the assigned novel.',
                dueDate: getRandomFutureDate(),
                completed: false
            },
            {
                id: `${grade}-${className}-2`,
                title: 'Vocabulary Quiz Chapter 5',
                description: 'Study vocabulary words from pages 120-135.',
                dueDate: getRandomFutureDate(),
                completed: false
            },
            {
                id: `${grade}-${className}-3`,
                title: 'Poetry Recitation',
                description: 'Memorize and recite a poem of at least 20 lines.',
                dueDate: getRandomPastDate(),
                completed: true
            }
        ],
        mathematics: [
            {
                id: `${grade}-${className}-1`,
                title: 'Problem Set 4.1-4.3',
                description: 'Complete all odd-numbered problems from sections 4.1 through 4.3.',
                dueDate: getRandomFutureDate(),
                completed: false
            },
            {
                id: `${grade}-${className}-2`,
                title: 'Chapter 4 Test',
                description: 'Study all material from Chapter 4 for the upcoming test.',
                dueDate: getRandomFutureDate(),
                completed: false
            }
        ],
        science: [
            {
                id: `${grade}-${className}-1`,
                title: 'Lab Report: Chemical Reactions',
                description: 'Complete the lab report including data analysis and conclusion.',
                dueDate: getRandomFutureDate(),
                completed: false
            },
            {
                id: `${grade}-${className}-2`,
                title: 'Science Fair Project Proposal',
                description: 'Submit a 2-page proposal outlining your science fair project.',
                dueDate: getRandomFutureDate(),
                completed: false
            }
        ],
        history: [
            {
                id: `${grade}-${className}-1`,
                title: 'Research Paper: World War II',
                description: 'Write a 10-page research paper on a specific aspect of WWII.',
                dueDate: getRandomFutureDate(),
                completed: false
            },
            {
                id: `${grade}-${className}-2`,
                title: 'Chapter 8 Reading Questions',
                description: 'Answer all review questions at the end of Chapter 8.',
                dueDate: getRandomPastDate(),
                completed: true
            }
        ],
        language: [
            {
                id: `${grade}-${className}-1`,
                title: 'Oral Presentation',
                description: 'Prepare a 5-minute presentation in the target language.',
                dueDate: getRandomFutureDate(),
                completed: false
            },
            {
                id: `${grade}-${className}-2`,
                title: 'Workbook Exercises Unit 3',
                description: 'Complete all exercises in Unit 3 of the workbook.',
                dueDate: getRandomFutureDate(),
                completed: false
            }
        ],
        elective: [
            {
                id: `${grade}-${className}-1`,
                title: 'Creative Project',
                description: 'Complete your chosen creative project according to the rubric.',
                dueDate: getRandomFutureDate(),
                completed: false
            },
            {
                id: `${grade}-${className}-2`,
                title: 'Reflection Journal Entry',
                description: 'Write a 2-page reflection on this week\'s activities.',
                dueDate: getRandomPastDate(),
                completed: true
            }
        ]
    };
    
    return sampleAssignments[className] || [];
}

// Utility functions for dates
function getRandomFutureDate() {
    const days = Math.floor(Math.random() * 14) + 1;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

function getRandomPastDate() {
    const days = Math.floor(Math.random() * 7) + 1;
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
}

// DOM Elements
const gradeSelection = document.querySelector('.grade-selection');
const classSelection = document.querySelector('.class-selection');
const assignmentsDisplay = document.querySelector('.assignments-display');
const assignmentsList = document.querySelector('.assignments-list');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeAssignments();
    
    // Grade button clicks
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentGrade = btn.dataset.grade;
            showClassSelection();
        });
    });
    
    // Class button clicks
    document.querySelectorAll('.class-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentClass = btn.dataset.class;
            showAssignments();
        });
    });
    
    // Back button clicks
    document.querySelector('.back-btn').addEventListener('click', showGradeSelection);
    document.querySelector('.back-to-classes').addEventListener('click', showClassSelection);
    
    // Filter button clicks
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAssignments(btn.dataset.filter);
        });
    });
});

// Navigation functions
function showGradeSelection() {
    gradeSelection.style.display = 'block';
    classSelection.style.display = 'none';
    assignmentsDisplay.style.display = 'none';
}

function showClassSelection() {
    gradeSelection.style.display = 'none';
    classSelection.style.display = 'block';
    assignmentsDisplay.style.display = 'none';
}

function showAssignments() {
    gradeSelection.style.display = 'none';
    classSelection.style.display = 'none';
    assignmentsDisplay.style.display = 'block';
    
    // Update header
    document.getElementById('selected-grade').textContent = `Grade ${currentGrade}`;
    document.getElementById('selected-class').textContent = 
        currentClass.charAt(0).toUpperCase() + currentClass.slice(1);
    
    // Display assignments
    displayAssignments();
}

// Display assignments
function displayAssignments(filter = 'all') {
    const classAssignments = assignments[currentGrade][currentClass];
    assignmentsList.innerHTML = '';
    
    if (!classAssignments || classAssignments.length === 0) {
        assignmentsList.innerHTML = `
            <div class="empty-state">
                <h3>No Assignments</h3>
                <p>There are no assignments for this class yet.</p>
            </div>
        `;
        return;
    }
    
    const filteredAssignments = classAssignments.filter(assignment => {
        if (filter === 'all') return true;
        if (filter === 'completed') return assignment.completed;
        if (filter === 'pending') return !assignment.completed;
        return true;
    });
    
    if (filteredAssignments.length === 0) {
        assignmentsList.innerHTML = `
            <div class="empty-state">
                <h3>No ${filter} assignments</h3>
                <p>There are no ${filter} assignments for this class.</p>
            </div>
        `;
        return;
    }
    
    filteredAssignments.forEach(assignment => {
        const assignmentEl = createAssignmentElement(assignment);
        assignmentsList.appendChild(assignmentEl);
    });
}

// Create assignment element
function createAssignmentElement(assignment) {
    const div = document.createElement('div');
    div.className = `assignment-item ${assignment.completed ? 'completed' : ''}`;
    div.dataset.id = assignment.id;
    
    const dueDate = new Date(assignment.dueDate);
    const isOverdue = !assignment.completed && dueDate < new Date();
    
    div.innerHTML = `
        <h4 class="assignment-title">${assignment.title}</h4>
        <p class="assignment-description">${assignment.description}</p>
        <div class="assignment-meta">
            <span class="due-date ${assignment.completed ? 'completed' : ''}">
                📅 Due: ${formatDate(dueDate)} ${isOverdue ? '(Overdue)' : ''}
            </span>
            <div class="assignment-status">
                <label>
                    <input type="checkbox" class="status-checkbox" 
                           ${assignment.completed ? 'checked' : ''}>
                    ${assignment.completed ? 'Completed' : 'Mark as complete'}
                </label>
            </div>
        </div>
    `;
    
    // Add checkbox event listener
    const checkbox = div.querySelector('.status-checkbox');
    checkbox.addEventListener('change', (e) => {
        toggleAssignmentStatus(assignment.id, e.target.checked);
    });
    
    return div;
}

// Toggle assignment completion status
function toggleAssignmentStatus(assignmentId, completed) {
    const assignment = assignments[currentGrade][currentClass].find(a => a.id === assignmentId);
    if (assignment) {
        assignment.completed = completed;
        // Re-display with current filter
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        displayAssignments(activeFilter);
    }
}

// Filter assignments
function filterAssignments(filter) {
    displayAssignments(filter);
}