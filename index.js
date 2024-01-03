const express = require('express');
const app = express();
const Port = 5500;

const { validateDataset, preprocessDataset } = require('./src/PreprocessAndValidation/Execute');

require('./src/helpers/DbConnection');

const fileUploadRouter = require('./src/router/fileUpload');

app.use(express.static('public'));
app.use('/upload', express.static('upload'));

// Routes
app.use('/', express.static('public'));
app.use('/', fileUploadRouter.router);

app.post('/upload', fileUploadRouter.upload.single('file'), (req, res, next) => {
    if (req.file) {
        validateDataset(req.file.path)
            .then(() => {
                preprocessDataset(req.file.path)
                    .then(() => {
                        res.send('File uploaded, validated, and preprocessed successfully!');
                    })
                    .catch((preprocessError) => {
                        console.error(`Error preprocessing dataset: ${preprocessError}`);
                        res.status(500).send('Error occurred during dataset preprocessing.');
                    });
            })
            .catch((validationError) => {
                console.error(`Error validating dataset: ${validationError}`);
                res.status(400).send('Invalid dataset.');
            });
    } else {
        res.status(400).send('No file uploaded');
    }
});

app.listen(Port, () => {
    console.log('Server is running on port 5500');
});