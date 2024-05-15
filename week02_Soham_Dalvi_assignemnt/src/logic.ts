// logic.ts

//tried using interface
interface Student {
    name: string;
    age: number;
    grade: number;
}


export function getPassed(students: Student[]): Student[] {
    let result = students.filter(student => student.grade >= 50); 
    return result;
}


export function getName(students: Student[]): string[] {
    let names = students.map(student => student.name);
    return names;
}


export function sortGrade(students: Student[]): Student[] {
    let grades = students.sort((a, b) => a.grade - b.grade); 
    return grades;
}

export function getAverageAge(students: Student[]): number {
    const totalAge = students.reduce((sum, student) => sum + student.age, 0); //accumilator + current value (accumilator i.e sum = 0)
    return totalAge / students.length;
}
