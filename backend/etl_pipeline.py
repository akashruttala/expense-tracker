import pandas as pd
from datetime import datetime

def process_file_data(filepath, extension):
    """
    Extract, Transform, Load (ETL) Helper
    Extract: Read data from file.
    Transform: Clean, validate, and standardize data.
    """
    try:
        # Extract
        if extension in ['.csv']:
            df = pd.read_csv(filepath)
        elif extension in ['.xls', '.xlsx']:
            df = pd.read_excel(filepath)
        else:
            return None, "Unsupported file format."
            
        # Transform
        # 1. Clean data: Remove empty rows
        df.dropna(how='all', inplace=True)
        
        # Ensure required columns exist
        required_cols = ['title', 'amount', 'date', 'type']
        columns = [str(c).lower().strip() for c in df.columns]
        df.columns = columns
        
        for col in required_cols:
            if col not in columns:
                return None, f"Missing required column: {col}"
                
        # 2. Standardize formats & Types
        cleaned_data = []
        seen_records = set()
        
        for index, row in df.iterrows():
            # Check and standardize title
            if pd.isna(row['title']):
                continue
            title = str(row['title']).strip()
            if not title or title.lower() == 'nan' or title.lower() == 'null':
                continue
            title = title.title()
                
            # Check and validate amount
            if pd.isna(row['amount']):
                continue
            try:
                amount = int(float(row['amount']))
                if amount <= 0:
                    continue # Reject negative or zero values
            except (ValueError, TypeError):
                continue # Skip rows with invalid amounts
                
            # Check and standardize date
            if pd.isna(row['date']):
                continue
            try:
                date_val = row['date']
                if isinstance(date_val, str):
                    date_val = date_val.strip()
                    # Strictly validate YYYY-MM-DD format
                    date_obj = datetime.strptime(date_val, '%Y-%m-%d').date()
                else:
                    date_obj = date_val.date()
                date_str = date_obj.strftime('%Y-%m-%d')
            except Exception:
                continue # Skip rows with invalid dates
                
            # Check and standardize type
            if pd.isna(row['type']):
                exp_type = "other"
            else:
                exp_type = str(row['type']).strip()
                if not exp_type or exp_type.lower() == 'nan' or exp_type.lower() == 'null':
                    exp_type = "other"
                else:
                    exp_type = exp_type.lower()
                
            # Check for duplicates
            record_key = (title, amount, date_str)
            if record_key in seen_records:
                continue
            seen_records.add(record_key)
                
            cleaned_data.append((title, amount, date_str, exp_type))
            
        return cleaned_data, "Success"
        
    except Exception as e:
        return None, f"Error processing file: {str(e)}"
