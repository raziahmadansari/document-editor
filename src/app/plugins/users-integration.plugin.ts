import { Plugin } from 'ckeditor5';

export class UsersIntegration extends Plugin {
  static get requires() {
    return ['Users'];
  }

  static get pluginName() {
    return 'UsersIntegration';
  }

  init() {
    const usersPlugin = this.editor.plugins.get('Users');

    // Load the users data.
    // for (const user of appData.users) {
    //   usersPlugin.addUser(user);
    // }

    // Set the current user.
    // usersPlugin.defineMe(appData.userId);

    usersPlugin.addUser({ id: '111', name: 'Razi' });
    usersPlugin.defineMe('111');
  }
}
