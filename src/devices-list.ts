import esm from "esm";
require = esm(module);

import { remote } from "electron";
import { html, render } from "lit-html";
import HID from "node-hid";
import path from "path";

const { BrowserWindow } = remote;
const currentWindow = remote.getCurrentWindow();

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("showDevicesBtn").addEventListener("click", () => {
    const devices = HID.devices();
    console.log("devices", devices);
    render(
      devicesListTemplate(devices),
      document.getElementById("devicesList")
    );
  });
});

const devicesListTemplate = (devices: HID.Device[]) => html`
  <table class="ui celled table unstackable">
    <thead>
      <tr>
        <th>vendorId</th>
        <th>productId</th>
        <th>manufacturer</th>
        <th>product</th>
        <th>usage</th>
        <th>usagePage</th>
        <th>test</th>
      </tr>
    </thead>
    <tbody>
      ${devices.map(
        (device) => html` <tr>
          <td data-label="vendorId">${device.vendorId}</td>
          <td data-label="productId">${device.productId}</td>
          <td data-label="manufacturer">${device.manufacturer}</td>
          <td data-label="product">${device.product}</td>
          <td data-label="usage">${device.usage}</td>
          <td data-label="usagePage">${device.usagePage}</td>
          <td data-label="test">
            <button
              class="ui button"
              @click=${() => {
                testDeviceHandler(device.path);
              }}
            >
              Test Device
            </button>
          </td>
        </tr>`
      )}
    </tbody>
  </table>
`;

const testDeviceHandler = (devicePath: string) => {
  console.log("testDeviceHandler", devicePath);
  const deviceWindow = new BrowserWindow({
    parent: currentWindow,
    webPreferences: {
      preload: path.join(__dirname, "test-device.js"),
    },
  });

  deviceWindow.loadURL(
    "file://" +
      path.join(__dirname, "../views", "test-device.html") +
      `?devicePath=${encodeURIComponent(devicePath)}`
  );
};
