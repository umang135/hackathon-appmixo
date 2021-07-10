const express = require("express");

const BackupCtrl = require("../controllers/backups-ctrl");

const router = express.Router();

// router.post("/backup", BackupCtrl.createBackup);
// router.put("/backup/:id", BackupCtrl.updateBackup);
// router.delete("/backup/:id", BackupCtrl.deleteBackup);
// router.get("/backup/:id", BackupCtrl.getBackupById);
// router.get("/backups", BackupCtrl.getBackups);

router.get("/get_db_info", BackupCtrl.getDbInfo);
router.get("/get_db_restore", BackupCtrl.restoreDbInfo);
module.exports = router;
