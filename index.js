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

          // Предложение перейти в файл при нажатии на Ctrl + Левый клик
          vscode.window.showInformationMessage("Перейти в файл?", "Да").then((selection) => {
            if (selection === "Да") {
              // Выполнение команды открытия файла
              vscode.commands.executeCommand("vscode.open", vscode.Uri.file(filePath));
            }
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
}
exports.activate = activate;
