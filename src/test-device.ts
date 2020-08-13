import serialize from "form-serialize";
import HID from "node-hid";

declare const $: JQueryStatic;

window.addEventListener("DOMContentLoaded", () => {
  const params = new URL(window.location.href).searchParams;
  const devicePath = params.get("devicePath");
  console.log("devicePath", devicePath);

  checkLocalStorage();

  let device = null;

  try {
    device = new HID.HID(devicePath);
  } catch (error) {
    createToast("Something wrong happened, check the dev console", "error");
    return;
  }

  device.on("data", (data: Buffer) => {
    console.log(`device incoming data`, data);
    const deviceToHostDataElement = document.getElementById("deviceToHostData");
    const newValue =
      deviceToHostDataElement.innerHTML + data.toString("hex") + "<br>";
    deviceToHostDataElement.innerHTML = newValue;
  });

  device.on("error", (error) => {
    console.error("device error", error);
    createToast("Something wrong happened, check the dev console", "error");
  });

  document
    .getElementById("hostToDeviceForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const {
        hostToDeviceReportId,
        hostToDevicePayload,
      } = serialize(event.currentTarget, { hash: true });

      localStorage.setItem("hostToDeviceReportId", hostToDeviceReportId);
      localStorage.setItem("hostToDevicePayload", hostToDevicePayload);

      const payload = new Array(32).fill(0);
      payload[0] = parseInt(hostToDeviceReportId);
      payload[1] = parseInt(hostToDevicePayload);

      try {
        device.write(payload);
        createToast("Payload written successfully");
      } catch (error) {
        console.error("Could not write payload", error);
        createToast("Could not write payload, check the dev console", "error");
      }
    });
});

const createToast = (
  message: string = "",
  cssClass: string = "success",
  position: string = "bottom right"
) => {
  ($("body") as any).toast({
    class: cssClass,
    message,
    position,
  });
};

const checkLocalStorage = () => {
  const hostToDeviceReportId = localStorage.getItem("hostToDeviceReportId");
  if (hostToDeviceReportId) {
    (document.getElementById(
      "hostToDeviceReportId"
    ) as HTMLInputElement).value = hostToDeviceReportId;
  }

  const hostToDevicePayload = localStorage.getItem("hostToDevicePayload");
  if (hostToDevicePayload) {
    (document.getElementById(
      "hostToDevicePayload"
    ) as HTMLInputElement).value = hostToDevicePayload;
  }
};
