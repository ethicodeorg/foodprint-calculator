import csv
import json
import argparse

parser = argparse.ArgumentParser(description='Parse translations from csv to json')
parser.add_argument('input', help='the csv file name')
parser.add_argument('output', help='the json file name')

args = parser.parse_args()

print('Translator script working...')

translations = {}
with open(args.input, newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    for row in spamreader:
        translations[row[0]] = row[2]

with open(args.output, 'w') as outfile:
    json.dump(translations, outfile, ensure_ascii=False)

print('All done.')