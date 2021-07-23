import moment from 'moment';
import 'moment/locale/uk';
moment.locale('uk')
export const input = [
    { name: 'Джонатан Джостар', birthday: moment("1986-04-04")},
    { name: 'Джозеф Джостар', birthday: moment('1996-09-27') },
    { name: 'Куджо Джотаро', birthday: moment('2000-05-10') },
    { name: 'Джорно Джованна', birthday: moment('2000-04-16') },
    { name: 'Діо Брандо', birthday: moment('1986-08-12') },
]

export function age(input){
    let today = moment()
    let birthday = input[0].birthday
    let age = today.diff(birthday, 'years')
    return age
}

export function groupByMonths(input){
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

console.log(input[0].birthday);