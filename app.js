const express=require('express');
const db=require('./db/db');
const app=express();


//========================For the post Request=============
//we will be using the middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//========================== this is the post request ===
app.post('/api/v1/todos',(req,res)=>{
	console.log("inside the post request");

	req.body.title;
	req.body.description;

	if (!req.body.title) {
		return res.status(400).send({
			success:'false',
			description:'title required'
		})
	}
	else if (!req.body.description) {
		return res.status(400).send({
			success:'false',
			description:'description required'
		})
	}

	 else {

	 	const todo={
	 		id:db.length+1,
	 		title:req.body.title,
	 		description:req.body.description
	 	}

	 	db.push(todo);
	 	return res.status(201).send({
	 		success:'true',
	 		description:'message added in the todo',
	 		todo
	 	})

	 }
})

//=====================================================================
//==========creating a request to get the single record================


app.get('/api/v1/todos/:id',(req,res)=>{

	const id = parseInt(req.params.id);

	db.map((todo)=>{
		if (todo.id==id) {
			return res.status(200).send({
				success:'true',
				description:'todo retreived successfully from db',
				todo
			})
		}
	});

	res.status(404).send({
		success:'false',
		description:'this todo does not exist'
	});
});



app.get('/api/v1/todos',(req,res)=>{
	console.log("inside the get request");
	res.status(200).send({
		success:'true',
		message:'todos retreived successfully',
		todos:db
	})
});

//========================================================================
//app delete
app.delete('/api/v1/todos/:id',(req,res)=>{
	const id= parseInt(req.params.id);
	db.map((todo,index)=>{
		if (todo.id==id) {
			db.slice(index,1);
			return res.status(200).send({
				success:'true',
				message:'todo deleted successfully'
			});
		}
	});

	return res.status(400).send({
		success:'false',
		message:'todo not deleted'
	});

});


//========================================================================
app.get('/',(req,res)=>{
	res.status(200).send({
		message:"this is success endpoint beginner"
	})
})

const PORT=5000;

app.listen(PORT,()=>{
	console.log(`listening on port number ${PORT}`);
});