export default function download (data, filename) {
  let element = document.createElement('a');

  const blob = new Blob([data]);

  element.setAttribute('href', window.URL.createObjectURL(blob));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}