self.addEventListener("push", function (event) {
  var data = { title: "ACE Academy", body: "You have something new." };
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {}
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    data: { url: data.url || "./" }
  }));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if ("focus" in list[i]) {
          return list[i].focus();
        }
      }
      return self.clients.openWindow(event.notification.data.url);
    })
  );
});