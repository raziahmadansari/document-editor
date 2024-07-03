import { ButtonView, Plugin } from 'ckeditor5';

/**
 * The `DocumentOutlineToggler` plugin adds an icon to the left side of the editor.
 *
 * It allows to toggle document outline visibility.
 */
export class DocumentOutlineToggler extends Plugin {
  public declare toggleButton: ButtonView;

  static get pluginName() {
    return 'DocumentOutlineToggler';
  }

  init() {
    this.toggleButton = new ButtonView(this.editor.locale);

    const DOCUMENT_OUTLINE_ICON =
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 9.5a.5.5 0 0 0 .5-.5v-.5A.5.5 0 0 0 5 8H3.5a.5.5 0 0 0-.5.5V9a.5.5 0 0 0 .5.5H5Z"/><path d="M5.5 12a.5.5 0 0 1-.5.5H3.5A.5.5 0 0 1 3 12v-.5a.5.5 0 0 1 .5-.5H5a.5.5 0 0 1 .5.5v.5Z"/><path d="M5 6.5a.5.5 0 0 0 .5-.5v-.5A.5.5 0 0 0 5 5H3.5a.5.5 0 0 0-.5.5V6a.5.5 0 0 0 .5.5H5Z"/><path clip-rule="evenodd" d="M2 19a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2Zm6-1.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H8v15Zm-1.5-15H2a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h4.5v-15Z"/></svg>';
    const COLLAPSE_OUTLINE_ICON =
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.463 5.187a.888.888 0 1 1 1.254 1.255L9.16 10l3.557 3.557a.888.888 0 1 1-1.254 1.255L7.26 10.61a.888.888 0 0 1 .16-1.382l4.043-4.042z"/></svg>';

    const documentOutlineContainer = this.editor.config.get(
      'documentOutline.container'
    )!;
    const sidebarContainer = documentOutlineContainer.parentElement!;

    this.toggleButton.set({
      label: 'Toggle document outline',
      tooltip: 'Hide document outline',
      tooltipPosition: 'se',
      icon: COLLAPSE_OUTLINE_ICON,
    });

    this.toggleButton.on('execute', () => {
      // Toggle a CSS class on the document outline container to manage the visibility of the outline.
      documentOutlineContainer.classList.toggle('ck-hidden');

      // Change the look of the button to reflect the state of the document outline feature.
      if (documentOutlineContainer.classList.contains('ck-hidden')) {
        this.toggleButton.icon = DOCUMENT_OUTLINE_ICON;
        this.toggleButton.tooltip = 'Show document outline';
      } else {
        this.toggleButton.icon = COLLAPSE_OUTLINE_ICON;
        this.toggleButton.tooltip = 'Hide document outline';
      }

      // Keep the focus in the editor whenever the button is clicked.
      this.editor.editing.view.focus();
    });

    this.toggleButton.render();

    sidebarContainer.insertBefore(
      this.toggleButton.element!,
      documentOutlineContainer
    );
  }

  override destroy() {
    this.toggleButton.element!.remove();

    return super.destroy();
  }
}
