export default function download (data, filename, type = 'svg') {
  let element = document.createElement('a');

  if (type === 'svg') {
    const blob = new Blob([data]);
    data = window.URL.createObjectURL(blob);
  }

  if (type !== 'svg') {
    filename = filename.replace('svg', type);
  }

  element.setAttribute('href', data);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}