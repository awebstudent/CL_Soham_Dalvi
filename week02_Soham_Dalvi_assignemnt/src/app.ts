
import express = require('express');
import { Request, Response } from 'express';
import { sID } from './service';
import {getPassed,getName,getAverageAge,sortGrade} from './logic';


const app = express();
app.use(express.json());
const port = 3000;


//----------------------THIS IS 4. -- function implementation in logic.ts----------------------------------
const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
    ];


app.get('/students', (req: Request, res: Response) => {
    res.send(students);
});
  
app.get('/students/pass', (req: Request, res: Response) => {
    const pass = getPassed(students);
    console.log(pass); 
    res.send(pass);
});

app.get('/students/names', (req: Request, res: Response) => {
    const names = getName(students);
    res.send(names);
    
});

app.get('/students/sort', (req: Request, res: Response) => {
    const sort = sortGrade(students);
    res.send(sort); 
});

app.get('/students/average', (req: Request, res: Response) => {
    const average = getAverageAge(students);
   res.json(average);
});





// --------------------------THIS IS 1 a. b. --- db_query in service.ts--------------------------
app.post('/process_orders', async (req: Request, res: Response) => {
    try {
        const items = req.body.items;
        const orderIDs: string[] = []; // incase of multiple items filtered out

        for (const item of items) {
            const divBy3 = item.OrderBlocks.some((i: any) => {
                if (Array.isArray(i.lineNo)) {       //since one of our lineNo. is array, we need to check beforehand as i encountered an error here.
                    return i.lineNo.some((lineNo: number) => lineNo % 3 === 0);
                } else {
                    return i.lineNo % 3 === 0;
                }
            });

            if (!divBy3) {
                orderIDs.push(item.orderID);
            }
        }

        
        for (const orderID of orderIDs) {
            await sID(orderID);
        }

        res.json({ message: 'Orders Filtering Sucess!' });
    } catch (error) {
        
        res.json({ error: 'Failed!!' });
    }
});


//----------------2_ArrayExercise---------------------
//sample input (raw JSON) : [1,2,3,4,5]


app.post('/arr', (req: Request, res: Response) => {
    if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
        return res.status(400).json({ msg: "Invalid input" });
    }

    const arr = req.body;

    arr.forEach((element, index) => {
        console.log(`Element at index ${index}: ${element}`);
    });

    const doubleArr = arr.map(element => element * 2);
    console.log(doubleArr);

    const filter = arr.filter(element => element > 3);
    console.log(filter);

    const sum = arr.reduce((acc, currentVal) => acc + currentVal, 0);
    console.log(sum);

    const bool1 = arr.some(element => element % 2 === 0);
    console.log('Does the array have an even number?', bool1);

    const bool2 = arr.every(element => element > 0);
    console.log('Are all elements greater than zero?', bool2);
    
    res.send("array methods executed.");
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});












// JSON PROVIDED for refrence

/*{
   "items": [
       {
           "orderID": "0000001211",
           "orderInvoiceNo": "1234567",
           "OrderBlocks": [
               {
                   "lineNo": [1, 4, 6, 8, 9, 1, 4],
                   "ProductCode": "#31451"
               },
               {
                   "lineNo": 2,
                   "ProductCode": "#64311"
               },
               {
                   "lineNo": 3,
                   "ProductCode": "#85959"
               }
           ]
       },
       {
           "orderID": "0000001212",
           "orderInvoiceNo": "1234568",
           "OrderBlocks": [
               {
                   "lineNo": 7,
                   "ProductCode": "#86869"
               },
               {
                   "lineNo": [6, 7, 4, 8, 4, 2],
                   "ProductCode": "#10384"
               },
               {
                   "lineNo": 12,
                   "ProductCode": "#00873"
               }
           ]
       },
       {
           "orderID": "0000001213",
           "orderInvoiceNo": "1234569",
           "OrderBlocks": [
               {
                   "lineNo": 76,
                   "ProductCode": "#22291"
               }
           ]
       }
   ]
}

*/


