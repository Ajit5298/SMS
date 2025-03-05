const express = require('express');
const Grade = require('../models/Grade');
const Student = require('../models/Student');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Add Grade
router.post('/', protect, async (req, res) => {
  const { studentId, subject, marks } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(400).json({ msg: 'Student not found' });

    const newGrade = new Grade({
      studentId,
      subject,
      marks,
    });

    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get Grades by Student
router.get('/:studentId', protect, async (req, res) => {
  try {
    const grades = await Grade.find({ studentId: req.params.studentId });
    res.json(grades);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get All Grades
router.get('/', protect, async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Update Grade
router.put('/:id', protect, async (req, res) => {
  const { subject, marks } = req.body;

  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ msg: 'Grade not found' });

    grade.subject = subject || grade.subject;
    grade.marks = marks || grade.marks;

    await grade.save();
    res.json(grade);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Delete Grade
router.delete('/:id', protect, async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ msg: 'Grade not found' });

    await grade.remove();
    res.json({ msg: 'Grade removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
