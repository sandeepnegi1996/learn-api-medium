const express=require('express');
const db=require('./db/db');
const app=express();

app.get('/api/v1/todos',(req,res)=>{
	console.log("inside the get request");
	res.status(200).send({
		success:'true',
		message:'todos retreived successfully',
		todos:db
	})
});

app.get('/',(req,res)=>{
	res.status(200).send({
		message:"this is success endpoint beginner"
	})
})

const PORT=5000;

app.listen(PORT,()=>{
	console.log(`listening on port number ${PORT}`);
});