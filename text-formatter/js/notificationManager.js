export class NotificationManager {
    constructor() {
      this.notification = document.getElementById('notification');
      this.timeout = null;
    }
  
    show(message, type = 'info') {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
  
      this.notification.textContent = message;
      this.notification.className = `notification ${type}`;
      this.notification.style.opacity = '1';
  
      this.timeout = setTimeout(() => {
        this.notification.style.opacity = '0';
      }, 2000);
    }
  }
  