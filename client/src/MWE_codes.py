from tabula import read_pdf
import pandas as pd
import json

df = read_pdf('MWEMapping.pdf', pages='all')

data = list(df[0]['Unnamed: 1'][-pd.isna(df[0]['Unnamed: 1'])][2:]) + \
        list(df[1]['Unnamed: 1'][-pd.isna(df[1]['Unnamed: 1'])][2:])

with open('MWEMappings.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)