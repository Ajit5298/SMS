const express = require('express');
const Student = require('../models/Student');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Add Student
router.post('/', protect, async (req, res) => {
  const { name, class: studentClass } = req.body;

  try {
    const newStudent = new Student({
      name,
      class: studentClass,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get All Students
router.get('/', protect, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get a Specific Student
router.get('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Update Student
router.put('/:id', protect, async (req, res) => {
  const { name, class: studentClass } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    student.name = name || student.name;
    student.class = studentClass || student.class;

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Delete Student
router.delete('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    await student.remove();
    res.json({ msg: 'Student removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
