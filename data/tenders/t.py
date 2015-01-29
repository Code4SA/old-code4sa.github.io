import csv

output_headers = ["no", "tender_no", "Decision Reference", "description", "vendor", "award_date", "value", "department", "group", "vat", "type", "comment"]

data = {}
with open('tenders.csv') as fp:
    reader = csv.reader(fp)
    headers = reader.next()
    for row in reader:
        datum = dict(zip(headers, row))
        tender_no = datum['tender_no'].strip()
        data[tender_no] = datum

def is_vat(value):
    if 'excl' in value:
        return 'n'
    elif 'incl' in value:
        return 'y'
    else:
        return "n/a"

def get_type(value):
    if 'p/a' in value:
        return 'per annum'
    elif 'per annum' in value:
        return 'per annum'
    elif 'monthly' in value:
        return 'per month'
    else:
        return 'n/a'

def get_comment(value):
    if 'estimated' in value:
        return 'estimated'
    elif 'e-mailed' in value:
        return 'emailed'
    elif 'Income To City' in value:
        return 'income to city'
    elif 'stock acc.' in value:
        return 'stock acc'

    return ''
    
with open('/tmp/july.csv') as fp:
    reader = csv.reader(fp)
    headers = reader.next()
    for row in reader:
        datum = dict(zip(headers, row))

        tender_no = datum['Tender No'].strip()
        current_tender = data[tender_no]

        current_tender['vat'] = is_vat(datum['Value'])
        current_tender['type'] = get_type(datum['Value'])
        current_tender['comment'] = get_comment(datum['Value'])
    
with open('/tmp/reset.csv') as fp:
    reader = csv.reader(fp)
    headers = reader.next()
    for row in reader:
        datum = dict(zip(headers, row))

        tender_no = datum['Tender No'].strip()
        current_tender = data[tender_no]
        current_tender['vat'] = is_vat(datum['Value'])
        current_tender['type'] = get_type(datum['Value'])
        current_tender['comment'] = get_comment(datum['Value'])

with open('/tmp/output.csv', 'w') as fp:
    writer = csv.writer(fp)
    writer.writerow(output_headers)
    for row in data.values():
        try:
            int(row['value'])
        except ValueError:
            row['value'] = ''
        writer.writerow([row[h] for h in output_headers])
