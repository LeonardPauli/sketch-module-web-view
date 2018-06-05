> FORK: of [skpm/sketch-module-web-view](https://github.com/skpm/sketch-module-web-view)  
> DIFF: personal changes, eg.:
> - using `@leonardpauli/cocoascript-class with support-older-jsc` (until PR is merged)
> - added `didClose` handler (__temporary__ dev flow fix, prevents crash on reload)
> - added `showCursorPopupBrowserWindow` shorthand (should be separate module, meh)
> USAGE: npm i @leonardpauli/sketch-module-web-view@1.1.7-lp, then:

```js
import {showCursorPopupBrowserWindow} from '@leonardpauli/sketch-module-web-view/lib/lp-utils'
export default function (context) {
  coscript.setShouldKeepAround(true); const val = 1; UI.message(val+' start')
  showCursorPopupBrowserWindow({
  	// eg. localhost to webpack dev server during dev, but dist index for prod
    url: require('../resources/webview.html'),
    onLoadFinish: ()=> { console.log('UI loaded!') },
    onNativeLog: s=> { UI.message(s); webContents.executeJavaScript(`fn(${val})`) },
    // allow session tear down & force tear down start
    didClose: ()=> { coscript.setShouldKeepAround(false); throw(null) },
    // size: {x, y}, positionCursorOffset: {x, y}, reuseId: 'some',
  })
}
```

---

# sketch-module-web-view

A Sketch module for creating a complex UI with a webview. The API is mimicking the [BrowserWindow](https://electronjs.org/docs/api/browser-window) API of Electron.

## Installation

To use this module in your Sketch plugin you need a bundler utility like [skpm](https://github.com/skpm/skpm) and add it as a dependency:

```bash
npm install -S sketch-module-web-view
```

## Usage

```js
import BrowserWindow from 'sketch-module-web-view'

export default function() {
  const options = {
    identifier: 'unique.id',
  }

  const browserWindow = new BrowserWindow(options)

  browserWindow.loadURL('./my-screen.html')
}
```

## Documentation

* [Communicating between the Plugin and the WebView](/docs/communication-plugin-webview.md)
* [Inspecting the WebView](/docs/inspecting-the-webview.md)
* [Frameless-window](/docs/frameless-window.md)

## API References

* [Browser window](/docs/browser-window.md)
* [Web Contents](/docs/web-contents.md)

## License

MIT
