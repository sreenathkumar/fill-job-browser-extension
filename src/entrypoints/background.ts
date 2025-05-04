export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  //function to get the auth user
  async function getAuth() {
    try {
      const res = await fetch(`${import.meta.env.WXT_API_URL}/api/user`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        credentials: 'include'
      });

      const result = await res.json();

      if (result.status === 'success') {
        await storage.setItem('local:auth', result?.data)
        return result.data
      } else {
        await storage.clear('local');
      }
      return null
    } catch (error: any) {
      console.log('Error in fetch user background.js: ', error?.message);
      await storage.clear('local');
      return null
    }
  }

  browser.runtime.onStartup.addListener(() => {
    getAuth()
  })

  browser.runtime.onInstalled.addListener(() => {
    // on installed extesion
    getAuth()
  });

  //refetch if failed first time
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === 'REFETCH_AUTH') {

      console.log('refetch triggered');
      (async () => {
        try {
          const auth = await getAuth();
          sendResponse({ auth });
        } catch (error) {
          console.error('Failed to fetch auth:', error);
          sendResponse({ auth: null });
        }
      })()

      return true
    }

    return false
  })
});
