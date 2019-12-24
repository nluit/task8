import { Component , OnInit} from '@angular/core';
import { Observable ,from} from 'rxjs'; 
import {   } from 'rxjs'
import {filter,map, mergeMap, take, toArray, reduce , tap , mergeAll , skip} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  

  public data = [
    { name: 'Bao', age: 31 }, 
    { name: 'Khoi', age: 25 }, 
    { name: 'Quy', age: 27 },
    { name: 'Khanh', age: 28 },
    { name: 'Thinh', age: 32 },
  ];
  public sort_age(a,b) {
    if (a.age < b.age)
      return -1;
    if (a.age > b.age)
      return 1;
    return 0;
  }  
  sort = from(this.data).pipe(toArray()).subscribe(item => {
      console.log('Cau 3');
      item.map(i => {
        item.sort(this.sort_age)
      })      
      console.log(item);
    })    

    addChildren = from(this.data).pipe(toArray()).subscribe(item => {
      console.log('Cau 4');
      item.map( (i) => {
        if(i.age>30) i.children = true;
      })      
      console.log(item);
    })    
    avgAge = from(this.data).pipe(toArray())
    .subscribe(arr => { var a= arr.reduce((sumAge, cur) => sumAge += cur.age, 0); console.log('Cau 5');
    console.log(a/arr.length)}) 

    random = from(this.data).pipe(toArray())
    .pipe(tap(item => { console.log("bai 6"); item[Math.floor(Math.random()*item.length)].age*=2 }))
    .subscribe(val => console.log(val));

    addName = from(this.data).pipe(toArray())
    .pipe(tap( item => { console.log("Bai 7"); item.unshift({ name: 'Nhat', age: 20 }) && item.push({ name: 'P', age: 20 })})
    ).subscribe(val => console.log(val));
    
    addObject = from(this.data)
    .pipe(toArray())
    .pipe( mergeAll(),mergeMap(item =>  from([{ name: '___', age: 0 }, item])),toArray()
    ).subscribe(val => {
      console.log("Bai 8")
      console.log('-------------------')
      val.map(a =>
        console.log(a))
        console.log('-------------------');
        console.log('Cau 9');
    })
    
    logObject = from(this.data).pipe(skip(2)).subscribe (val => { console.log(val)});


  title = 'Task8';
}
