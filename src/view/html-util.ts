export function escapeSpecialChars(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function htmlToElemnt(html: string) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.firstElementChild;
}

export function element(
  strings: TemplateStringsArray,
  ...values: Array<string>
) {
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
  return htmlToElemnt(htmlString);
}

export function render(
  bodyElement: Element | null,
  containerElement: HTMLDivElement | null
) {
  if (!bodyElement) throw new Error("bodyElementはnullです。");
  if (!containerElement) throw new Error("containerElementはnullです。");
  containerElement.innerHTML = "";
  containerElement.appendChild(bodyElement);
}
