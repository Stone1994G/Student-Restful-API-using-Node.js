const express = require('express')
const router = express.Router();
const Student = require('../models/student')

// Getting all
router.get('/', async (req, res) => {
  try{
    const students = await Student.find()
    res.json(students)
  }catch(err){
    res.status(500).json({ message: err.message})
  }
})
// Getting One
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student)
})
// Creating One
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    DOE: req.body.DOE,
    Year: req.body.Year,
    Major: req.body.Major,
    GPA: req.body.GPA
  })
  try{
    const newstudent = await student.save()
    //Code 201 means you successfully created a object
    res.status(201).json(newstudent)
  }catch(err){
    //user gave bad information
    res.status(400).json({ message: err.message })

  }
})
// Updating One
router.patch('/:id', getStudent, async (req, res) => {
  if(req.body.name != null){
    res.student.name = req.body.name
  }
  if(req.body.DOE != null){
    res.student.DOE = req.body.DOE
  }
  if(req.body.Year != null){
    res.student.Year = req.body.Year
  }
  if(req.body.Major != null){
    res.student.Major = req.body.Major
  }
  if(req.body.GPA != null){
    res.student.GPA = req.body.GPA
  }
  try{
    const updatedstudent = await res.student.save()
    res.json(updatedstudent)
  }catch(err){
    res.status(400).json({message: err.message})
  }
})
// Deleting One
router.delete('/:id', getStudent, async (req, res) => {
  try{
    await res.student.remove();
    res.json({ message: 'Deleted student'})
  }catch(err){
    res.status(500).json({ message: err.message})
  }
})
//Middleware implementation
async function getStudent(req, res, next){
  let student;
  try{
    student = await Student.findById(req.params.id)
    if(student == null){
      // 404 error means we couldn't find what we were looking for
      return res.status(404).json({ message: 'Cannont find student'})
    }
  } catch(err){
      return res.status(500).json({ message: err.message})
  }

  res.student = student;
  next();
}

module.exports = router; 

