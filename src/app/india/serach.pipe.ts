import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'stringFilter'
})
export class SearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val) => {
            let rVal = (val.state.toLowerCase().includes(args));
            return rVal;
        })

    }

}