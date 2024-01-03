import sys
import pandas as pd

def preprocess_dataset(dataset_path):
    try:
        df = pd.read_csv(dataset_path)
        
        df = df.apply(lambda x: x.str.lower() if x.dtype == "object" else x)
        
        df.to_csv(dataset_path, index=False)
        return "Preprocessing successful."
    
    except FileNotFoundError:
        return "Dataset file not found."
    
    except pd.errors.ParserError:
        return "Error parsing the dataset file."
    
    except Exception as e:
        return f"An error occurred during dataset preprocessing: {str(e)}"