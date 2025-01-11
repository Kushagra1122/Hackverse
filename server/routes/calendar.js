const express = require('express');
const router = express.Router();
const Class = require('../models/class'); // Import your Class model

router.get('/classes/dates', async (req, res) => {
    try {
      // Fetch the 'date' field from the Class model, assuming it's in the 'YYYY-MM-DD' format
      const classDates = await Class.find({}, 'date');
      
      // Since the date is already in the desired format, you can directly map it
      const formattedDates = classDates.map(cls => cls.date); // The date is already a string, so no need for further formatting
      
      res.status(200).json(formattedDates);
    } catch (err) {
      console.error('Error fetching class dates:', err);
      res.status(500).json({ error: 'Failed to fetch class dates' });
    }
  });
  
  

// Fetch all classes on a specific date
// Fetch all classes on a specific date
router.get('/classes', async (req, res) => {
    const { date } = req.query; // Expecting date in 'YYYY-MM-DD' format
    try {
      // Format the date to remove the time portion
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0); // Set the time to 00:00:00
  
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999); // Set the time to 23:59:59
  
      // Find all classes within the given date range
      const classes = await Class.find({
        date: { $gte: startOfDay, $lte: endOfDay },
      });
  
      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch classes' });
    }
  });
  


module.exports = router;
