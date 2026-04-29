import { app } from 'electron';
import { NSApplication, NSApplicationDelegate } from 'node-mac-app-delegate';

class AppDelegate extends NSApplicationDelegate {
  applicationSupportsSecureRestorableState() {
    return true;
  }
}

app.on('ready', () => {
  const nsApp = NSApplication.sharedApplication();
  nsApp.delegate = new AppDelegate();
});
