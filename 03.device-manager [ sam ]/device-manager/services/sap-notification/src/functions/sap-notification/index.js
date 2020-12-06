module.exports.handler = async (event) => {
  console.info(`Received event: ${JSON.stringify(event)}`)
  
  /* TODO:
    - get SAP configuration from SSM ( url, credentials)
    - prepare payload
    - send payload to SAP servers using axios 
  */
}
