import moment from 'moment';
import 'moment/locale/uk.js';
import csv from 'csv-parser'
import fs from 'fs'; //file system module allows to work with the file system on computer
moment.locale('uk')

const employeesRawData = []

fs.createReadStream('employees.csv')
    .pipe(csv())
        .on('data', row => {
            console.log(row.Birthday);
            const employee = {
                name: row.Name,
                birthday: moment(row.Birthday)
            }
            employeesRawData.push(employee)
        })
        .on('end', () => {
            console.log(employeesGroupedByMonths(employeesRawData))
            // console.log(showListOfEmployeesBirthdays(planningHorizon(2, employeesSortedByDay(employeesGroupedByMonths(employeesRawData)))));
        })
// export const input = [
//     { name: 'Джорно Джованна', birthday: moment('2000-04-16') },
//     { name: 'Джозеф Джостар', birthday: moment('1996-09-27') },
//     { name: 'Куджо Джотаро', birthday: moment('2000-05-10') },
//     { name: 'Джонатан Джостар', birthday: moment("1986-04-04")},
//     { name: 'Бруно Бучаратті', birthday: moment('2000-07-22') },
//     { name: 'Діо Брандо', birthday: moment('1986-08-12') },
// ]

export function age(employee){
    let today = moment()
    let birthday = employee.birthday
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
function pluralize(age, one, few, many) {
    let num = 0
    if(age >= 20)
        num = age % 10
        
    switch (true) {
        case num === 0:
            return `${age} ${few}`
        case num >= 2 && num <= 4:
            return `${age} ${many}`
        case num >= 5 && num <= 19:
            return `${age} ${few}`
        default:
            return `${age} ${one}`
    }
}
export function showListOfEmployeesBirthdays(employees){
    let currentDate = moment()
    let futureDate = moment()
    let innerText = ''
    let result = ''
    for (let i = 0; i < employees.length; i++) {
        for (let j = 0; j < employees[i].length; j++) {
            innerText += `(${employees[i][j].birthday.format("D")}) -  ${employees[i][j].name} (${pluralize(age(employees[i][j]), 'рік', 'років', 'роки')})\n`            
        }
        result += `${futureDate.format("MMMM YYYY")}\n` + innerText
        innerText = ''
        futureDate = moment(currentDate).add(1, 'M');
        currentDate = futureDate
    }
    return result

}

