const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event DONE
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.deferredPrompt = event;

  butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element DONE
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);

  // if (window.deferredPrompt !== null) {
  //   window.deferredPrompt.prompt();
  //   const { answer } = await window.deferredPrompt.userChoice;
  //   if (outcome === 'accepted') {
  //     window.deferredPrompt = null;
  //     butInstall.classList.toggle('hidden', true);
  //   }
  //   console.log(`${answer}`);
  // }
});

// TODO: Add an handler for the `appinstalled` event DONE
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
