const vscode = require("vscode");
const path = require("path");

class IncludeDefinitionProvider {
  provideDefinition(document, position) {
    const line = document.lineAt(position.line);
    const includePathMatch = line.text.match(/@@include\(['"]([^'"]+)['"](?:,\s*({[\s\S]*?}|\[[\s\S]*?]))?\)/);
    if (includePathMatch) {
      const includePath = includePathMatch[1];
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
      if (workspaceFolder) {
        const workspaceFolderPath = workspaceFolder.uri.fsPath;
        const filePath = path.join(workspaceFolderPath, "src", "html", includePath);

        // Возвращаем позицию начала строки инклуда
        const startPosition = new vscode.Position(position.line, includePathMatch.index);
        const location = new vscode.Location(vscode.Uri.file(filePath), new vscode.Range(startPosition, startPosition));
        return location;
      }
    }
    return null;
  }
}

function goToIncludedFile() {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    const document = activeEditor.document;
    const position = activeEditor.selection.active;

    // Проверка, что текущий файл является HTML-файлом
    if (document.languageId === "html" || document.languageId === "htm") {
      const line = document.lineAt(position.line);
      const includePathMatch = line.text.match(/@@include\(['"]([^'"]+)['"](?:,\s*({[\s\S]*?}|\[[\s\S]*?]))?\)/);
      if (includePathMatch) {
        const includePath = includePathMatch[1];
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        if (workspaceFolder) {
          const workspaceFolderPath = workspaceFolder.uri.fsPath;
          const filePath = path.join(workspaceFolderPath, "src", "html", includePath);

          // Открываем документ и прокручиваем до соответствующей строки с выделением всей строки
          vscode.workspace.openTextDocument(vscode.Uri.file(filePath)).then((doc) => {
            const lineNumber = doc.getText().indexOf(line.text);
            const range = new vscode.Range(lineNumber, 0, lineNumber, line.text.length);
            activeEditor.revealRange(range, vscode.TextEditorRevealType.Default);
            activeEditor.selection = new vscode.Selection(range.start, range.end);
          });
        }
      }
    }
  }
}

function activate(context) {
  const disposable = vscode.commands.registerCommand("extension.goToIncludedFile", goToIncludedFile);
  context.subscriptions.push(disposable);

  // Регистрация провайдера определений для HTML-файлов
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider({ scheme: "file", language: "html" }, new IncludeDefinitionProvider())
  );

  // Выполняем переход по контрл + лкм при открытии файла
  vscode.window.onDidChangeActiveTextEditor(() => {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && (activeEditor.document.languageId === "html" || activeEditor.document.languageId === "htm")) {
      goToIncludedFile();
    }
  });
}
exports.activate = activate;
