const express = require('express');
const router = express.Router()
const crud = require('../notes/notesCRUD')


router.get("/task", crud.readTaskNotes);
router.get("/:_id/getForEdit", crud.readEditTaskNotes);
router.get("/MyDay", crud.readMyDayNotes);
router.get("/Importent", crud.readImportentNotes);
router.get("/planned", crud.readPlannedNotes);
router.get("/Complete", crud.readCompletedTask);
router.get("/search/:value", crud.readSearchTask);
router.get("/mydayconplete", crud.readmydaycomplete);
router.get("/Recyclebin", crud.readRecyclebin);
router.post("/create", crud.createNotes);
router.put("/:_id/update", crud.updateNotes);
router.delete("/:_id/completed", crud.completedNotes);
router.delete("/:_id/CkeckoutNotes", crud.checkoutNotes);
router.delete("/:_id/restore", crud.restoreNotes);
router.delete("/:_id/delete", crud.deletenote);
router.delete("/:_id/parmanentdelete", crud.parmanentdeleteNotes);
router.delete("/parmanentdeleteall", crud.parmanentdeleteAllNotes);
router.delete("/parmanentdeleteallnote_user", crud.parmanentdeleteAllNotes_user);

module.exports = router;