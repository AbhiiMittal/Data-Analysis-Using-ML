const { exec } = require('child_process');

async function validateDataset(datasetPath) {
  return new Promise((resolve, reject) => {
    const scriptPath = 'H:/Data Analysis/src/PreprocessAndValidation/validate.py';
    exec(`python "${scriptPath}" ${datasetPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing validate.py: ${error.message}`);
        return;
      }

      console.log(`Validation script output:\n${stdout}`);

      if (stdout.includes("Dataset validation successful.")) {
        resolve();
      } else {
        reject("Dataset validation failed.");
      }
    });
  });
}

async function preprocessDataset(datasetPath) {
  return new Promise((resolve, reject) => {
    const scriptPath = 'H:/Data Analysis/src/PreprocessAndValidation/preprocess.py';
    exec(`python "${scriptPath}" ${datasetPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing preprocess.py: ${error.message}`);
        return;
      }

      console.log(`Preprocessing script output:\n${stdout}`);

      if (stdout.includes("Preprocessing successful.")) {
        resolve();
      } else {
        reject("Preprocessing failed.");
      }
    });
  });
}

module.exports = {
  validateDataset: async function (datasetPath) {
    try {
      await validateDataset(datasetPath);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to validate dataset: ${error.message}`);
    }
  },
  preprocessDataset: async function (datasetPath) {
    try {
      await preprocessDataset(datasetPath);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to preprocess dataset: ${error.message}`);
    }
  },
};
