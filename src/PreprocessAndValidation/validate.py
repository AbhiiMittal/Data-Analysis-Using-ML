import sys
import pandas as pd

def validate_dataset(dataset_path):
    try:
        df = pd.read_csv(dataset_path)
        if len(df) < 10:
            raise ValueError("Dataset should have at least 10 rows.")
        
        return "Dataset validation successful."
    
    except FileNotFoundError:
        return "Dataset file not found."
    
    except pd.errors.ParserError:
        return "Error parsing the dataset file."
    
    except Exception as e:
        return f"An error occurred during dataset validation: {str(e)}"
