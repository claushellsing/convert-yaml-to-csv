const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

function flattenDict(obj, parentKey = '', sep = '.') {
    const items = [];
    for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}${sep}${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            items.push(...flattenDict(value, newKey, sep));
        } else {
            items.push([newKey, value]);
        }
    }
    return items;
}

function yamlToCsv(yamlFile) {
    // Load the YAML file
    const yamlData = yaml.load(fs.readFileSync(yamlFile, 'utf8'));

    // Flatten the nested YAML structure
    const flattenedYaml = flattenDict(yamlData);

    // Extract the base name of the YAML file without extension
    const fileNameWithoutExt = path.basename(yamlFile, '.yaml');

    // Prepare CSV output with the file name as the header for the second column
    let csvOutput = `key,${fileNameWithoutExt}\n`;

    flattenedYaml.forEach(([key, value]) => {
        // Escape double quotes by doubling them in CSV format
        value = value.replace(/"/g, '""');
        csvOutput += `${key},"${value}"\n`;
    });

    // Write CSV output to file
    const csvFile = yamlFile.replace('.yaml', '.csv');
    fs.writeFileSync(csvFile, csvOutput, 'utf8');

    console.log(`YAML has been successfully converted to CSV and saved to ${csvFile}`);
}

if (require.main === module) {
    if (process.argv.length < 3) {
        console.error('Usage: node yaml_to_csv.js <path_to_yaml_file>');
        process.exit(1);
    }

    const yamlFilePath = process.argv[2];

    if (!fs.existsSync(yamlFilePath)) {
        console.error(`Error: File '${yamlFilePath}' not found.`);
        process.exit(1);
    }

    yamlToCsv(yamlFilePath);
}