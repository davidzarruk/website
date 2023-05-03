function customEncodeURIComponent(str) {
    return encodeURIComponent(str)
      .replace(/%2F/g, '/')
      .replace(/%3A/g, ':')
      .replace(/%3F/g, '?')
      .replace(/%3D/g, '=')
      .replace(/%26/g, '&');
  }
  
  document.getElementById('sendButton').addEventListener('click', async () => {
    const apiUrl = document.getElementById('apiUrl').value;
    const inputText = document.getElementById('inputText').value;
    const url = `${apiUrl}predict/?URL=${customEncodeURIComponent(inputText)}`;
  
    try {
      const response = await fetch(url, { method: 'GET' });
  
      if (response.ok) {
        const data = await response.json();
        const result = parseFloat(data.result).toFixed(4);
        document.getElementById('result').innerText = result;
      } else {
        console.error('Request failed with status', response.status);
        document.getElementById('result').innerText = 'Error';
      }
    } catch (error) {
      console.error('Request failed with error', error);
      document.getElementById('result').innerText = 'Error';
    }
  });
  