const vscode = require('vscode');

function isFunctionOrObject(lineText) {
  // Modify this function to define your custom logic for identifying functions or objects
  // For example, you can check if the line contains parentheses or curly braces
  return lineText.includes('(') || lineText.includes('{');
}

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.wrapInLog', function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }

    const selections = editor.selections;
    const languageId = editor.document.languageId;

    // Mapping of log statement prefixes and suffixes based on language
    const logStatements = {
      javascript: { prefix: 'console.log(', suffix: ');' },
      python: { prefix: 'print(', suffix: ')' },
      java: { prefix: 'System.out.println(', suffix: ');' },
      csharp: { prefix: 'Console.WriteLine(', suffix: ');' },
      ruby: { prefix: 'puts ', suffix: '' },
      php: { prefix: 'echo ', suffix: ';' },
      go: { prefix: 'fmt.Println(', suffix: ')' },
      swift: { prefix: 'print(', suffix: ')' },
      kotlin: { prefix: 'println(', suffix: ')' },
      c: { prefix: 'printf("', suffix: '\\n");' },
      cpp: { prefix: 'printf("', suffix: '\\n");' },
      rust: { prefix: 'println!("', suffix: '");' },
      typescript: { prefix: 'console.log(', suffix: ');' },
      lua: { prefix: 'print(', suffix: ')' },
      powershell: { prefix: 'Write-Host ', suffix: '' },
      perl: { prefix: 'print "', suffix: '";' },
      // Add more languages as needed
    };

    const logStatement = logStatements[languageId];

    if (!logStatement) {
      vscode.window.showErrorMessage('Language not supported for logging.');
      return;
    }

    const logStatementsText = selections.map(selection => {
      const selectedLines = [];
      let minIndent = Number.MAX_SAFE_INTEGER;
      for (let line = selection.start.line; line <= selection.end.line; line++) {
        const lineText = editor.document.lineAt(line).text;
        const indent = lineText.match(/^\s*/)[0].length;
        minIndent = Math.min(minIndent, indent);
        selectedLines.push(lineText.trim());
      }
      const indentation = ' '.repeat(minIndent);
      return selectedLines.map(line => {
        const shouldWrapInQuotes = !isFunctionOrObject(line);
        const lineContent = shouldWrapInQuotes ? `"${line}"` : line;
        return `${indentation}${logStatement.prefix}${lineContent}${logStatement.suffix}`;
      }).join('\n');
    });

    // Edit the document to insert the log statements
    editor.edit(editBuilder => {
      selections.forEach((selection, index) => {
        const lineStart = selection.start.line;
        const lineEnd = selection.end.line;
        const lineStartPosition = new vscode.Position(lineStart, 0);
        const lineEndPosition = editor.document.lineAt(lineEnd).range.end;
        const range = new vscode.Range(lineStartPosition, lineEndPosition);
        editBuilder.replace(range, logStatementsText[index]);
      });
    });
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
