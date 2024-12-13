import { TextFormatter } from './textFormatter.js';
import { NotificationManager } from './notificationManager.js';
import { ClipboardManager } from './clipboardManager.js';

class PopupManager {
    constructor() {
      this.formatter = new TextFormatter();
      this.notification = new NotificationManager();
      this.clipboard = new ClipboardManager();
      
      this.inputText = document.getElementById('inputText');
      this.outputText = document.getElementById('outputText');
      this.copyButton = document.getElementById('copyButton');
      this.clearButton = document.getElementById('clearButton');
      
      this.initializeEventListeners();
    }
  
    initializeEventListeners() {
      // Format buttons
      document.querySelectorAll('.format-btn').forEach(button => {
        button.addEventListener('click', (e) => this.handleFormat(e));
      });
  
      // Copy button
      this.copyButton.addEventListener('click', () => this.handleCopy());
  
      // Clear button
      this.clearButton.addEventListener('click', () => this.handleClear());
  
      // Auto-save input
      this.inputText.addEventListener('input', () => this.saveToStorage());
      
      // Load saved input
      this.loadFromStorage();
    }
  
    handleFormat(e) {
      const format = e.target.dataset.format;
      const input = this.inputText.value;
      
      if (!input.trim()) {
        this.notification.show('Please enter some text first!', 'warning');
        return;
      }
  
      const formatted = this.formatter.format(input, format);
      this.outputText.textContent = formatted;
    }
  
    async handleCopy() {
      const text = this.outputText.textContent;
      
      if (!text) {
        this.notification.show('No text to copy!', 'warning');
        return;
      }
  
      try {
        await this.clipboard.copy(text);
        this.notification.show('Copied', 'success');
      } catch (error) {
        this.notification.show('Failed to copy text', 'error');
      }
    }
  
    handleClear() {
      if (!this.outputText.textContent) {
        this.notification.show('Empty!', 'info');
        return;
      }
      
      this.outputText.textContent = '';
      this.notification.show('Output cleared!', 'success');
    }
  
    saveToStorage() {
      chrome.storage.local.set({
        'savedInput': this.inputText.value
      });
    }
  
    loadFromStorage() {
      chrome.storage.local.get(['savedInput'], (result) => {
        if (result.savedInput) {
          this.inputText.value = result.savedInput;
        }
      });
    }
  }
  
  // Initialize popup
  document.addEventListener('DOMContentLoaded', () => {
    new PopupManager();
  });