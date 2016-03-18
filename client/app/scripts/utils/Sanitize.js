  export default function sanitize(string) {
    const entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
    };
   return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }