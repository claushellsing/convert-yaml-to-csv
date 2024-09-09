#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parse } = require('yaml');

const convertYamlToCsv = (yamlFilePath) => {
  const fileName = path.basename(yamlFilePath, '.yaml');
  const csvFilePath = path.join(path.dirname(yamlFilePath), `${fileName}.csv`);

  try {
    // Read the YAML file
    const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
    
    // Parse YAML to JSON
    const data = parse(yamlContent);

    // Convert JSON to CSV
    const csvLines = [];
    const buildCsvLines = (obj, prefix = '') => {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        const newPrefix = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
          buildCsvLines(value, newPrefix);
        } else {
          csvLines.push(`${newPrefix},${value}`);
        }
      });
    };

    buildCsvLines(data);

    // Add header
    const csvHeader = `key,${fileName}`;
    const csvContent = [csvHeader, ...csvLines].join('\n');

    // Write to CSV file
    fs.writeFileSync(csvFilePath, csvContent, 'utf8');
    console.log(`CSV file has been created: ${csvFilePath}`);
  } catch (e) {
    console.error(`Error processing file: ${e.message}`);
  }
};

// Check for command-line arguments
if (process.argv.length !== 3) {
  console.error('Usage: convert-yaml-to-csv <path_to_yaml_file>');
  process.exit(1);
}

// Get the YAML file path from command-line arguments
const yamlFilePath = process.argv[2];
convertYamlToCsv(yamlFilePath);
