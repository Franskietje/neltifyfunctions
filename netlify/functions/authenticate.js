const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const username = process.env.FILEMAKER_USERNAME;
  const password = process.env.FILEMAKER_PASSWORD;
  const database = process.env.FILEMAKER_DATABASE;
  const url = `https://fms.alterexpo.be/fmi/data/v1/databases/${database}/sessions`;

  const auth = Buffer.from(username + ':' + password).toString('base64');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
        // Returning the token so it can be used in subsequent requests
        return {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: data.response.token })
          };
          
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
