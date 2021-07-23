import {input, age, groupByMonths} from './index';
describe('employee bitydays', () => {
    it('should show employee`s birthday', () => {
        expect(`${input[0].name} ${input[0].birthday.format("D MMMM")}`).toBe('Джонатан Джостар 4 квітня')                        
    });
    it('should get employee`s age', () => {
        expect(age(input)).toBe(35)
    });
    it('should group employees by months', () => {
        expect(groupByMonths(input).get(3)).toEqual([input[0], input[3]])
    });

});
