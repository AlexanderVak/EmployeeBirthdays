import moment from 'moment';
import 'moment/locale/uk.js';
moment.locale('uk')
export const input = [
    { name: 'Джорно Джованна', birthday: moment('2000-04-16') },
    { name: 'Джозеф Джостар', birthday: moment('1996-09-27') },
    { name: 'Куджо Джотаро', birthday: moment('2000-05-10') },
    { name: 'Джонатан Джостар', birthday: moment("1986-04-04")},
    { name: 'Бруно Бучаратті', birthday: moment('2000-07-22') },
    { name: 'Діо Брандо', birthday: moment('1986-08-12') },
]

export function age(input){
    let today = moment()
    let birthday = input[3].birthday
    let age = today.diff(birthday, 'years')
    return age
}

export function employeesGroupedByMonths(input){
    const employees = new Map()

    input.forEach(employee => {
        if (employees.has(employee.birthday.month())) {
            employees.get(employee.birthday.month()).push(employee)

        } else {
            employees.set(employee.birthday.month(),[employee])
        }
    });

    return employees
}
export function employeesSortedByDay(employees) {
    employees.forEach((employeesByMonth) => employeesByMonth.sort((a, b) => a.birthday - b.birthday))
    return employees
}
export function planningHorizon(horizon, employees) {
    let currentMonth = moment().month()
    switch (horizon) {
        case 0:
            return employees.get(currentMonth)
        case 1:
            return [employees.get(currentMonth), employees.get(currentMonth + 1)]
        case 2:
            return [employees.get(currentMonth), employees.get(currentMonth + 1), employees.get(currentMonth + 2)]    
        default:
            break;
    }
}
export function showListOfEmployeesBirthdays(employees){
    let currentDate = moment()
    var futureDate = moment()
    for (let i = 0; i < employees.length; i++) {
        for (let j = 0; j < employees[i].length; j++) {
            `${futureDate.format("MMMM YYY")}\n${}`
            
        }
        futureDate = moment(currentDate).add(1, 'M');
        
    }
    return `${moment().year().month().format("MMMM YYY")}`

}

console.log(showListOfEmployeesBirthdays(planningHorizon(2, employeesSortedByDay(employeesGroupedByMonths(input)))));