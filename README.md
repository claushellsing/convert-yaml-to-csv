# convert-yaml-to-csv

`convert-yaml-to-csv` is a command-line tool that converts YAML files into CSV format. It flattens nested YAML structures into a simple CSV format, making it easy to work with YAML data in spreadsheet applications.

## Installation

You can install `convert-yaml-to-csv` globally using npm:

```bash
npm install -g convert-yaml-to-csv
```

## Usage

Once installed, you can use the tool from the command line to convert a YAML file to a CSV file.

The command syntax is:

```bash
convert-yaml-to-csv <path_to_yaml_file>
```

## Example

Give a file en.yaml with the following content

```yaml
greeting:
  welcomeMessage: "This is a general \"welcome\" message"
  user:
    welcome: "Welcome, user!"
    goodbye: "Goodbye, user!"
    profile:
      update: "Your profile has been updated"
      delete: "Your profile has been deleted"
  admin:
    welcome: "Welcome, admin!"
    goodbye: "Goodbye, admin!"
    settings:
      update: "Admin settings have been updated"
      reset: "Admin settings have been reset"
errors:
  client:
    notFound: "Client page not found"
    forbidden: "Client access denied"
    timeout: "Client request timed out"
  server:
    notFound: "Server page not found"
    forbidden: "Server access denied"
    internal: "Internal server error occurred"
```

```bash
convert-yaml-to-csv en.yaml
```

Will generate the following file named en.cvs witht the following content

```csv
key,en
greeting.welcome_message,"This is a general ""welcome"" message"
greeting.user.welcome,"Welcome, ""user""!"
greeting.user.goodbye,"Goodbye, user!"
greeting.user.profile.update,"Your profile has been updated"
greeting.user.profile.delete,"Your profile has been deleted"
greeting.admin.welcome,"Welcome, admin!"
greeting.admin.goodbye,"Goodbye, admin!"
greeting.admin.settings.update,"Admin settings have been updated"
greeting.admin.settings.reset,"Admin settings have been reset"
errors.client.not_found,"Client page not found"
errors.client.forbidden,"Client access denied"
errors.client.timeout,"Client request timed out"
errors.server.not_found,"Server page not found"
errors.server.forbidden,"Server access denied"
errors.server.internal,"Internal server error occurred"
```

