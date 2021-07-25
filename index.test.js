import {input, age, employeesGroupedByMonths, employeesSortedByDay, planningHorizon} from './index';
describe('employee bitydays', () => {
    it('should show employee`s birthday', () => {
        expect(`${input[3].name} ${input[3].birthday.format("D MMMM")}`).toBe('Джонатан Джостар 4 квітня')                        
    });
    it('should get employee`s age', () => {
        expect(age(input)).toBe(35)
    });
    it('should group employees by months', () => {
        expect(employeesGroupedByMonths(input).get(3)).toEqual([input[0], input[3]])
    });
    it('should show employees by current month', () => {
        expect(employeesGroupedByMonths(input).get(6)).toEqual([input[4]])
    });
    it('should sort employees by day of birth in curr month', () => {
        expect(employeesSortedByDay(employeesGroupedByMonths(input)).get(3)).toEqual([input[3], input[0]])
    });
    it('should return employees by planning horizon 2', () => {
        expect(planningHorizon(2, employeesSortedByDay(employeesGroupedByMonths(input)))).toEqual([[input[4]], [input[5]], [input[1]]])
    });

});
