// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as path from 'path';
import * as fs from 'fs';
import * as cp from 'child_process';
import * as vscode from 'vscode';


let outputChannel: vscode.OutputChannel;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "apigeelint" is now active!');

	outputChannel = vscode.window.createOutputChannel('Apigeelint Output');


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('apigeelint.runApigeelint', async (uri: vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Running ApigeeLint ...',);


		let proxyPath: string = uri.fsPath;
		if (!proxyPath.endsWith('apiproxy')) {

			const isDirectory = (source: fs.PathLike) => fs.lstatSync(source).isDirectory();

			const getDirectories = (source: string) =>
				fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

			// outputChannel.appendLine(getDirectories(proxyPath)[0]);

			while (!(proxyPath = getDirectories(proxyPath)[0]).endsWith('apiproxy')) {
			}
		}
		outputChannel.appendLine('INFO: Running Apigeelint on ' + proxyPath);
		outputChannel.show(true);

		let formatter: string = vscode.workspace.getConfiguration('apigeelint')!.get('formatter')!;
		outputChannel.appendLine('INFO: Formatter: ' + formatter);

		let profile: string = vscode.workspace.getConfiguration('apigeelint')!.get('profile')!;
		outputChannel.appendLine('INFO: Profile: ' + profile);

		let externalPluginsDirectory = vscode.workspace.getConfiguration('apigeelint')!.get('externalPluginsDirectory')!;
		outputChannel.appendLine('INFO: External Plugins Directory: ' + externalPluginsDirectory);
		outputChannel.appendLine('');

		try {
			const commandLine = 'apigeelint -s . -f ' + formatter + ' --profile ' + profile + (externalPluginsDirectory ? ' -x ' + externalPluginsDirectory : '');

			const { stdout, stderr } = await exec(commandLine, { cwd: proxyPath });
			if (stderr && stderr.length > 0) {
				outputChannel.appendLine(stderr);
			}
			if (stdout && stdout.length > 0) {
				outputChannel.appendLine(stdout);
			}
		}
		catch (err: any) {
			if (err.stderr) {
				outputChannel.appendLine(err.stderr);
			}
			if (err.stdout) {

				outputChannel.appendLine(err.stdout);
			}
		}
	});

	context.subscriptions.push(disposable);
}

function exec(command: string, options: cp.ExecOptions): Promise<{ stdout: string; stderr: string }> {
	return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
		cp.exec(command, options, (error, stdout, stderr) => {
			if (error) {
				reject({ error, stdout, stderr });
			}
			resolve({ stdout, stderr });
		});
	});
}


// This method is called when your extension is deactivated
export function deactivate() { }