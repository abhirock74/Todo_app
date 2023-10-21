const notes = require('../../Models/notes');
const moment = require('moment');


module.exports = {


  readTaskNotes: async (req, res) => {
    try {
      const note = await notes.find({ created_by: req.user._id, isDeleted: false, isCompleted: false })
      return res.status(200).json({ message: "Data fetched", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  readEditTaskNotes: async (req, res) => {
    try {
      const note = await notes.findById(req.params);
      return res.status(200).json({ message: "Data fetched", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  readMyDayNotes: async (req, res) => {
    try {
      const note = await notes.find({
        created_by: req.user._id,
        isDeleted: false,
        isCompleted: false,
        page: 'My Day'
      })
      return res.status(200).json({ message: "Data fetched", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  readImportentNotes: async (req, res) => {
    try {
      const note = await notes.find({
        created_by: req.user._id,
        isDeleted: false,
        isCompleted: false,
        page: 'Importent'
      })
      return res.status(200).json({ message: "Data fetched", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  readPlannedNotes: async (req, res) => {
    try {
      const note = await notes.find({
        created_by: req.user._id,
        isDeleted: false,
        isCompleted: false,
        page: 'Planned'
      })
      return res.status(200).json({ message: "Data fetched", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  readCompletedTask: async (req, res) => {
    try {
      const note = await notes.find({ created_by: req.user._id, isDeleted: false, isCompleted: true })
      return res.status(200).json({ message: "Data fetched", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  readSearchTask: async (req, res) => {
    try {
      const note = await notes.find({
        "$or":[
          {"tasks":{$regex:req.params.value}},
        ],
        created_by: req.user._id,
        isDeleted:false
      })
      return res.status(200).json({ message: "Data fetched", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  readmydaycomplete: async (req, res) => {
    try {
      const note = await notes.find({
        created_by: req.user._id,
        isDeleted: false,
        isCompleted: true,
        page: 'My Day'
      })
      return res.status(200).json({ message: "Data fetched", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },


  readRecyclebin: async (req, res) => {
    try {
      const note = await notes.find({ created_by: req.user._id, isDeleted: true })
      return res.status(200).json({ message: "Data fetched", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  createNotes: async (req, res) => {
    try {
      let { _id } = req.user
      let { tasks, page, icon } = req.body;
      if (!tasks) {
        return res.status(400).json({ message: 'Task is requred' });
      } else {
        let note = await notes.create({
          tasks,
          page,
          icon,
          created_by: _id,
          createdAt:moment().format('ddd, MMMM D'),
          modifiedAt:moment().format('ddd, MMMM D')
        });
        return res.status(200).json({ message: 'Task created', note });
      }
    } catch (error) {
      return res.status(500).json({ message: 'internal server error', error })
    }
  },

  updateNotes: async (req, res) => {
   
    try {
      const note = await notes.findByIdAndUpdate(req.params, req.body)
      return res.status(200).json({ message: "Task updated successfully ", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  completedNotes: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndUpdate(_id, { isCompleted: true })
      return res.status(200).json({ message: "Task Completed", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },



  checkoutNotes: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndUpdate(_id, { isCompleted: false })
      return res.status(200).json({ message: "Task uncompleted", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  parmanentdeleteNotes: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndDelete(_id)
      return res.status(200).json({ message: "Task Parmanently Deleted", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  parmanentdeleteAllNotes: async (req, res) => {
    try {
      const note = await notes.deleteMany({created_by: req.user._id, isDeleted: true })
      return res.status(200).json({ message: "All Task Parmanently Deleted", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  restoreNotes: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndUpdate(_id, { isDeleted: false })
      return res.status(200).json({ message: "Task Restored", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  deletenote: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndUpdate(_id, { isDeleted: true })
      return res.status(200).json({ message: "Task Trashed", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },

  parmanentdeleteAllNotes_user: async (req, res) => {
    try {
      const note = await notes.deleteMany({created_by: req.user._id})
      return res.status(200).json({ message: "All Task Parmanently Deleted", note })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  },



}