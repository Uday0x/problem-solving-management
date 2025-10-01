// let arr = [1,2,3,4,5]

// const newArr=arr.map((e)=>e*e)
// console.log(newArr);

// const arr1 =["ram","shyam","mohan"];
// const arr2=arr1.map((e)=>e.toUpperCase())
// console.log(arr2);

// const ar3=[10,20,30]
// const arr4=ar3.map((e)=>e+5)
// console.log(arr4);

// let obj =[
//   {name:"Aman", age:20},
//   {name:"Raj", age:25},
//   {name:"Sneha", age:22}
// ]
// const obj1=obj.map((e)=>e.age)
// console.log(obj1);

// let obj2=[2,4,6,8]
// const obj3=obj2.map((e)=>e*e*e)
// // console.log(obj3);


// const obj3 = [1,2,3,4,5]
// const obj4 = obj3.map((e,i)=>(e))
// console.log(obj4)


//full parameter sof map method 

const obj5 = [1,2,3,4,5]
const obj6 = obj5.map((Element,index,Array)=>(index+Array))
console.log(obj6)

console.log(obj6.type)