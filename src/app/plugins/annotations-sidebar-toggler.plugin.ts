import { ButtonView, Plugin } from 'ckeditor5';
import { AnnotationsUIs } from 'ckeditor5-premium-features';

/**
 * The `AnnotationsSidebarToggler` plugin adds an icon to the right side of the editor.
 *
 * It allows to toggle the right annotations bar visibility.
 */
export class AnnotationsSidebarToggler extends Plugin {
  public declare toggleButton: ButtonView;

  static get requires() {
    return ['AnnotationsUIs'];
  }

  static get pluginName() {
    return 'AnnotationsSidebarToggler';
  }

  init() {
    this.toggleButton = new ButtonView(this.editor.locale);

    const NON_COLLAPSE_ANNOTATION_ICON =
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)"><path d="M11.463 5.187a.888.888 0 1 1 1.254 1.255L9.16 10l3.557 3.557a.888.888 0 1 1-1.254 1.255L7.26 10.61a.888.888 0 0 1 .16-1.382l4.043-4.042z"></path></svg>';
    const COLLAPSE_ANNOTATION_ICON =
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" transform="matrix(1,0,0,1,0,0)"><path d="M11.463 5.187a.888.888 0 1 1 1.254 1.255L9.16 10l3.557 3.557a.888.888 0 1 1-1.254 1.255L7.26 10.61a.888.888 0 0 1 .16-1.382l4.043-4.042z"/></svg>';

    const annotationsUIsPlugin = this.editor.plugins.get(
      'AnnotationsUIs'
    ) as AnnotationsUIs;
    const annotationsContainer = this.editor.config.get(
      'sidebar.container'
    )! as HTMLElement;
    const sidebarContainer = annotationsContainer.parentElement! as HTMLElement;

    this.toggleButton.set({
      label: 'Toggle annotations sidebar',
      tooltip: 'Hide annotations sidebar',
      tooltipPosition: 'se',
      icon: COLLAPSE_ANNOTATION_ICON,
    });

    this.toggleButton.on('execute', () => {
      // Toggle a CSS class on the annotations sidebar container to manage the visibility of the sidebar.
      annotationsContainer.classList.toggle('ck-hidden');

      // Change the look of the button to reflect the state of the annotations container.
      if (annotationsContainer.classList.contains('ck-hidden')) {
        this.toggleButton.icon = NON_COLLAPSE_ANNOTATION_ICON;
        this.toggleButton.tooltip = 'Show annotations sidebar';
        annotationsUIsPlugin.switchTo('inline');
      } else {
        this.toggleButton.icon = COLLAPSE_ANNOTATION_ICON;
        this.toggleButton.tooltip = 'Hide annotations sidebar';
        annotationsUIsPlugin.switchTo('wideSidebar');
      }

      // Keep the focus in the editor whenever the button is clicked.
      this.editor.editing.view.focus();
    });

    this.toggleButton.render();

    sidebarContainer.insertBefore(
      this.toggleButton.element!,
      annotationsContainer
    );
  }

  override destroy() {
    this.toggleButton.element!.remove();

    return super.destroy();
  }
}
