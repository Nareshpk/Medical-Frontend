import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'searchFilter'
})

@Injectable()
export class SearchFilter implements PipeTransform{
    transform(items: any[], searchStr:string, Property:string='mcode,supplierCode'):any[] {
      if(!searchStr){
        searchStr = "";
      }else{
        searchStr = searchStr.toLocaleLowerCase();
      }
      return items.filter(item=>{
        return ((item[Property]).toLocaleLowerCase().indexOf(searchStr) !== -1)
      });
    }
}