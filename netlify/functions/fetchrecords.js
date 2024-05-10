const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const token = event.headers.Authorization;// Assume token is passed as a Bearer token in the header
  const database = process.env.FILEMAKER_DATABASE;
  const layout = 'Dossiers_form_detail'; // Specify your FileMaker Layout
  const url = `https://fms.alterexpo.be/fmi/data/v1/databases/${database}/layouts/${layout}/_find`;



  const query = {
    query: [
      {
        "_k1_dossier_ID": 4097,
      }
    ],
    
    limit: 10
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    });

    const data = await response.json();
    console.log(data);
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
