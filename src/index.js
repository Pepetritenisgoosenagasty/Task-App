const express = require('express');
require("./db/mongoose.js");
const RouteUser = require("./routers/users.js");
const RouteTask = require("./routers/tasks.js");
const multer = require("multer");


const app = express();
const port = process.env.PORT || 3000;

const upload = multer({
    dest: 'uploads',
    limits: {
        fileSize: 1000000
      },
      fileFilter(req, file, cd) {
        // if (!file.originalname.endsWith(".pdf")) {
        //   return cd(new Error("Please upload pdf"))
        // }
    
        if (!file.originalname.match(/\.(doc|docx)$/)) {
          return cd(new Error("Please upload docs or docx"))
        }
    
        cd(undefined, true)
      }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
});


app.use(express.json());

app.use(RouteUser);    
app.use(RouteTask);    


app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
