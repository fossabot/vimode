// background-script.js

// --------------------

browser.runtime.onMessage.addListener(background_event);

function background_event(json) {
  switch (json.code) {
    case 'shiftKey_KeyH':
      tabUpdateFirst();
      break;
    case 'shiftKey_KeyL':
      tabUpdateLast();
      break;
    case 'shiftKey_KeyZ':
      tabCreateDeepL_JaEn(json.selection);
      break;
    case 'KeyD':
      tabRemove();
      break;
    case 'KeyH':
      tabUpdatePrevious();
      break;
    case 'KeyL':
      tabUpdateNext();
      break;
    case 'KeyO':
      tabCreate(json.selection);
      break;
    case 'KeyR':
      tabReload();
      break;
    case 'KeyU':
      tabRestore();
      break;
    case 'KeyZ':
      tabCreateDeepL_EnJa(json.selection);
      break;
    default:
      return;
  }
}

// --------------------

function tabUpdateFirst() {
  browser.tabs.query({
    currentWindow: true
  }).then((tabs) => {
    browser.tabs.update(tabs.map((i) => i.id)[0], {active: true});
  });
}

function tabUpdateLast() {
  browser.tabs.query({
    currentWindow: true
  }).then((tabs) => {
    const Tabs = tabs.map((i) => i.id);
    browser.tabs.update(Tabs[Tabs.length - 1], {active: true});
  });
}

function tabUpdateNext() {
  browser.tabs.query({
    currentWindow: true
  }).then((tabs) => {
    const Tabs = tabs.map((i) => i.id);
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then((currentTab) => {
      const currentTabIndex = Tabs.findIndex((element) => element == currentTab.map((i) => i.id)[0]);
      if (currentTabIndex === Tabs.length - 1) {
        browser.tabs.update(Tabs[0], {active: true});
        return;
      }
      browser.tabs.update(Tabs[currentTabIndex + 1], {active: true});
    });
  });
}

function tabUpdatePrevious() {
  browser.tabs.query({
    currentWindow: true
  }).then((tabs) => {
    const Tabs = tabs.map((i) => i.id);
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then((currentTab) => {
      const currentTabIndex = Tabs.findIndex((element) => element == currentTab.map((i) => i.id)[0]);
      if (currentTabIndex === 0) {
        browser.tabs.update(Tabs[Tabs.length - 1], {active: true});
        return;
      }
      browser.tabs.update(Tabs[currentTabIndex - 1], {active: true});
    });
  });
}

function tabReload() {
  browser.tabs.reload();
}

function tabCreate(query) {
  if (query === '') {
    browser.tabs.create({
      active: true,
      url: 'https://www.ecosia.org/'
    });
  } else {
    browser.tabs.create({
      active: true,
      url: 'https://www.ecosia.org/search?q=' + query
    });
  }
}

function tabCreateDeepL_EnJa(query) {
  if (query === '') {
    browser.tabs.create({
      active: true,
      url: 'https://www.deepl.com/translator'
    });
  } else {
    browser.tabs.create({
      active: true,
      url: 'https://www.deepl.com/translator#en/ja/' + query
    });
  }
}

function tabCreateDeepL_JaEn(query) {
  if (query === '') {
    browser.tabs.create({
      active: true,
      url: 'https://www.deepl.com/translator'
    });
  } else {
    browser.tabs.create({
      active: true,
      url: 'https://www.deepl.com/translator#ja/en/' + query
    });
  }
}

function tabRemove() {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then((tabs) => {
    browser.tabs.remove(tabs.map((i) => i.id));
  });
}

function tabRestore() {
  browser.sessions.restore(browser.sessions.getRecentlyClosed()[0]);
}

// --------------------
