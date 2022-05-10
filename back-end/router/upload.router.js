const express = require('express');
const uploadRouter = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// container
// const {GET, POST} = require('../controller/admin.controller');
function getMaxId() {
    let max = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        max += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return `[${max}]`;
}

const imageUploader = multer({ dest: 'images/' });
uploadRouter.post('/upload', imageUploader.single('file'), (req, res) => {
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, '-');
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // const newFullPath = `${fullPathInServ}-${orgName}`;
    const link_img = `${getMaxId()}-${orgName}`;
    const newFullPathUbuntu = 'images/' + link_img; // Ubuntu
    // const newFullPathWin = `images\\`+link_img; // Win 10
    fs.renameSync(fullPathInServ, newFullPathUbuntu);
    res.send({
        status: true,
        message: 'file uploaded',
        fileNameInServer: link_img,
    });
});
uploadRouter.get('/:name', (req, res) => {
    const fileName = req.params.name;
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        });
    }
    res.sendFile(path.resolve(`./images/${fileName}`));
});

module.exports = uploadRouter;
