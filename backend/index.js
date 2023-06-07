const express=require('express');
const app=express();
const cors=require('cors');
const bodyparser=require('body-parser');
const port=8000;

const sequelize=require('./utils/db');

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))

const routes= require('./routes/user');

app.use(routes);

sequelize.sync().then(()=>{
    app.listen(port,()=>{
        console.log(`server started http://localhost:${port}`);
    })
}).catch(err=>{
    console.log('error while connecting to database',err);
})