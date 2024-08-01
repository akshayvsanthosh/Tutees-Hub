import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allStudents: any[], searchKey: string): any[] {
    const result:any = []
    if (!allStudents || searchKey=="") {
     return allStudents 
    } else {
      allStudents.forEach((student:any)=>{
        if (student['studName'].toLowerCase().includes(searchKey.toLowerCase())) {
          result.push(student)
        }
      })
    }
    return result;
  }

}