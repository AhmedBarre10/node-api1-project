const express = require("express")
let users = require("./data/db.js")

const server = express()
server.use(express.json())

server.get('/',(req,res) => {
    res.json({message:"welcome"})
})



server.get('/api/users', (req,res) => {
    users.find()
    .then(response => {
        res.status(200).json(response)

    })
    .catch(err=>{
        res.status(500).json(err.message)
    })
})





server.get('/api/users/:id',(req,res)=>{
    users.findById(req.params.id)
    .then(user =>{
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message:'couldnt find that specific'})
        }
    })
    .catch(err =>{
        res.status(500).json({message:'the info couldnt be retrived'})
    })
})
server.post("/api/users", (req,res)=>{
    if(req.body.name && req.body.bio){
      const newUser ={
          id:req.body.id,
          name: req.body.name,
          bio: req.body.bio,
      }
      users.insert(newUser)
      res.status(201).json(newUser)
    }else if(!req.body.name || !req.body.bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }else {
      res.status(500).json( { errorMessage: "There was an error while saving the user to the database" })
    }
  })

server.delete("/api/users/:id",(req,res)=>{
  users.remove(req.params.id)
    .then(users=>{
      console.log(users);
      if(users){
        res.status(200).json({message: "User deleted"})
      }else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
      .catch(err=>{
        console.log(err);
        res.status(500).json({ errorMessage: "The user could not be removed" })
      })
    })

server.put("/api/users/:id",(req,res)=>{
  const user=req.body
  users.update(req.params.id,user)
  .then(users=>{
    console.log(users);
    if(req.body.name && req.body.bio){
      res.status(200).json({message: "User updated"})
    }else if(!req.body.name || !req.body.bio){
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }else{
      res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
})
    .catch(err=>{
      console.log(err);
      res.status(500).json({ errorMessage: "The user information could not be modified." })
    })
  })

server.listen(8080, () => {
	console.log(`server started at http://localhost:8080`)
})