# apigeelint

Apigeelint for VS Code

## Features

Runs Apigeelint (https://www.npmjs.com/package/apigeelint) on an API Proxy bundle.

To use, right-click on the apiproxy folder in the bundle and select 'Run Apigeelint'

![Screenshot](https://raw.githubusercontent.com/andythehood/apigeelint4vscode/main/images/apigeelint4vscode.png)

## Requirements

This extension requires apigeelint to be installed. This can be installed using the command:

npm install --location=global apigeelint

See https://www.npmjs.com/package/apigeelint for additional details.

## Extension Settings

This extension contributes the following settings:

- `apigeelint.formatter`: The report formatter to use (default: visualstudio.js)
- `apigeelint.profile`: The Apigee proxy profile type: ApigeeX or ApigeeEdge (default: apigeex)
- `apigeelint.externalPluginsDirectory`: Full path to an external plugins directory (default: none)
- `apigeelint.excludedTests`: Comma separated list of tests to exclude, e.g. ST001 (default: none)

## Known Issues

No known issues.

## Release Notes

Releases

### 0.0.2

Fix for spaces in path of apiproxy

### 0.0.1

Initial release of Apigeelint for VS Code
