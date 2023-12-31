# Описание плагина

Плагин **Go To Included File** предоставляет функциональность быстрого перехода к включаемым файлам (инклудам) в HTML-документах в **Visual Studio Code**. Он упрощает навигацию и редактирование проектов, использующих включаемые файлы.

## Инструкции по настройке и работе с плагином

1. **Установка плагина**:
   - Откройте **Visual Studio Code**.
   - Нажмите на значок **Extensions** в боковой панели слева (или используйте сочетание клавиш **Ctrl+Shift+X**), чтобы открыть панель расширений.
   - Нажмите на кнопку дополнительных опций - __кнопка (...)__
   - Далее нажмите __Установка из VSIX__ и выберите файл с расширением .vsix из репозитория

2. **Настройка сочетания клавиш** (по умолчанию **Shift + Alt + PageUp**):
   - Откройте **командную палитру** в **Visual Studio Code** (обычно сочетание клавиш **Ctrl+Shift+P**).
   - Введите **Preferences: Open Keyboard Shortcuts (JSON)** и выберите соответствующую команду.
   - В открывшемся файле `keybindings.json` добавьте следующую настройку:
     ```json
     {
       "key": "shift+alt+pageUp",
       "command": "extension.goToIncludedFile",
       "when": "editorTextFocus"
     }
     ```
   - Сохраните файл `keybindings.json`.

3. **Использование плагина**:
   - Откройте **HTML-файл** с включаемыми файлами (инклудами).
   - Зафиксируйте курсор на инклуде и нажмите сочетание клавиш **Shift + Alt + PageUp**
   - Щелкните правой кнопкой мыши на инклуде или удерживайте клавишу **Ctrl** и щелкните левой кнопкой мыши на инклуде, чтобы перейти к включаемому файлу.
   - Если настройка сочетания клавиш была изменена, используйте соответствующее сочетание клавиш для активации перехода к включаемому файлу с помощью **Ctrl + ЛКМ**.

4. **Дополнительные возможности**:
   - **Настройка языкового ограничения**: Если вы хотите, чтобы плагин работал только для определенных языков, измените параметры `"when"` в настройке сочетания клавиш (`keybindings.json`) соответственно.

Примеры:

   - Для ограничения работы плагина только с файлами языка HTML:
     ```json
     {
        "key": "shift+alt+pageUp",
        "command": "extension.goToIncludedFile",
        "when": "editorTextFocus && editorLangId == 'html'"
     }
     ```

  - Для ограничения работы плагина только с файлами языка JavaScript:
     ```json
     {
        "key": "shift+alt+pageUp",
        "command": "extension.goToIncludedFile",
        "when": "editorTextFocus && editorLangId == 'javascript'"
     }
     ```
  - Для ограничения работы плагина только с файлами языка CSS:
     ```json
     {
        "key": "shift+alt+pageUp",
        "command": "extension.goToIncludedFile",
        "when": "editorTextFocus && editorLangId == 'css'"
     }
     ```

Плагин **Go To Included File** значительно упрощает работу с включаемыми файлами в проектах HTML, позволяя быстро переходить к нужным местам и редактировать код без необходимости вручную искать и открывать включаемые файлы.
