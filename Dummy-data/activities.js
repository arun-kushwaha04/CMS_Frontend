const randomDate = new Date()
randomDate.setDate(new Date().getDate() + Math.floor((Math.random() * 4) - 2))
const tomorrow = new Date()
tomorrow.setDate(new Date().getDate() + 1)

export const all_activities = [
    {
        _id: '1',
        AssignmentID: {
            _id: '1',
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: 18,
        createdAt: new Date()
    },
    {
        _id: '2',
        AssignmentID: {
            _id: '2',
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: Math.floor((Math.random() * 20) - 2),
        createdAt: new Date()
    },
    {
        _id: '3',
        AssignmentID: {
            _id: '3',
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: Math.floor((Math.random() * 20) - 2),
        createdAt: new Date()
    },
    {
        _id: '4',
        AssignmentID: {
            _id: '4',
            title: 'Minor I Exam',
            dueDate: randomDate,
            totalMarks: 20,
        },
        marks: -1,
        createdAt: new Date()
    },
    {
        _id: '5',
        AssignmentID: {
            _id: '5',
            title: 'Minor I Exam',
            dueDate: tomorrow,
            totalMarks: 20,
        },
        marks: -1,
        createdAt: new Date()
    },
    {
        _id: '6',
        AssignmentID: {
            _id: '6',
            title: 'Minor I Exam',
            dueDate: tomorrow,
            totalMarks: 20,
        },
        marks: Math.floor((Math.random() * 20) - 2),
        createdAt: new Date()
    },
]