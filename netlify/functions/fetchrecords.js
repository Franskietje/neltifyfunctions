const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const token = event.headers.authorization; // Assume token is passed as a Bearer token in the header
  const database = process.env.FILEMAKER_DATABASE;
  const layout = 'Dossiers_form_detail'; // Specify your FileMaker Layout
  const url = `https://fms.alterexpo.be/fmi/data/v1/databases/${database}/layouts/${layout}/records`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
