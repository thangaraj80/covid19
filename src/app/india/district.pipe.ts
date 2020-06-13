import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'districtFilter'
})
export class DistrictPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val) => {
            let rVal = (val.district.toLowerCase().includes(args));
            return rVal;
        })

    }

}