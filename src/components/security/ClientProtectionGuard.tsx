'use client';

import { useEffect } from 'react';

export const ClientProtectionGuard: React.FC = () => {
  useEffect(() => {
    // 1. Disable Right Click (Context Menu) except on editable inputs
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Allow right-click on input and textarea for copy/paste convenience
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      e.preventDefault();
      return false;
    };

    // 2. Disable DevTools & View Source Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // F12 key
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U or Cmd+U (View Page Source)
      if (isCmdOrCtrl && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I, Cmd+Alt+I, Cmd+Option+I (Inspect Element / DevTools)
      if (
        (isCmdOrCtrl && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.keyCode === 73)) ||
        (isMac && e.metaKey && e.altKey && (e.key === 'i' || e.key === 'I' || e.keyCode === 73))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+J, Cmd+Alt+J (Console)
      if (
        (isCmdOrCtrl && e.shiftKey && (e.key === 'j' || e.key === 'J' || e.keyCode === 74)) ||
        (isMac && e.metaKey && e.altKey && (e.key === 'j' || e.key === 'J' || e.keyCode === 74))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+C, Cmd+Shift+C (Inspect Element Selector)
      if (
        (isCmdOrCtrl && e.shiftKey && (e.key === 'c' || e.key === 'C' || e.keyCode === 67)) ||
        (isMac && e.metaKey && e.altKey && (e.key === 'c' || e.key === 'C' || e.keyCode === 67))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page HTML)
      if (isCmdOrCtrl && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Disable Dragging of Images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // 4. Console Intellectual Property Banner
    if (typeof console !== 'undefined') {
      try {
        console.clear();
        console.log(
          '%c🕊️ Sireesha Puduru | The Art of Loving Academy\n%cAll intellectual property, Louise Hay curriculum, and website content are legally protected. Unauthorized copying, source inspection, or asset redistribution is strictly prohibited.',
          'font-size: 16px; font-weight: bold; color: #d4af37; font-family: serif; padding: 6px 0;',
          'font-size: 12px; color: #888888; font-family: sans-serif; line-height: 1.4;'
        );
      } catch {
        // Ignore console restrictions
      }
    }

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return null;
};
