// sketch-module-web-view/lp-utils
// Created by Leonard Pauli, jun 2018
/* global NSEvent */
import BrowserWindow from '.'

const showCursorPopupBrowserWindow = ({
  reuseId,
  url,
  onLoadFinish,
  onNativeLog,
  didClose,
  size = { x: 320, y: 180 },
  positionCursorOffset,
} = {}) => {
  if (!positionCursorOffset)
    positionCursorOffset = { x: size.x / 2, y: size.y / 2 }

  const browserWindow = new BrowserWindow({
    identifier: reuseId || undefined,
    width: size.x,
    height: size.y,
    show: false, // await content load
    minimizable: false,
    frame: false,
    alwaysOnTop: true,
    // acceptsFirstMouse: true,
    // titleBarStyle: 'hiddenInset', // or 'hidden'
  })

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })
  if (didClose) browserWindow.didClose = didClose

  const mousePos = {
    x: NSEvent.mouseLocation().x * 1,
    y: NSEvent.mouseLocation().y * 1,
  }
  // const screenH =
  //   NSScreen.screens()
  //     .firstObject()
  //     .visibleFrame().size.height * 1
  browserWindow.setPosition(
    -1 * positionCursorOffset.x + mousePos.x,
    +1 * positionCursorOffset.y + mousePos.y, // + screenH,
    false
  )

  const { webContents } = browserWindow
  if (onLoadFinish) webContents.on('did-finish-load', onLoadFinish)
  if (onNativeLog) webContents.on('nativeLog', onNativeLog)

  if (url) browserWindow.loadURL(url)

  return browserWindow
}

// eslint-disable-next-line import/prefer-default-export
export { showCursorPopupBrowserWindow }
