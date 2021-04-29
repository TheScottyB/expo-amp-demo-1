export async function postToServer(path: string, body = {}) {
  let responseData = null;
  try {
    const response = await fetch(
      // process.env.REACT_APP_URL_BASE +
      path,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) return Promise.reject(response);
    else {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
  return responseData;
}

export async function getFromServer(path: string, query?: any) {
  let responseData = null;
  // The query param is a filter object used by mongo.  we
  // pass it as a string so lets first url-encode it then
  // serialize it...
  // Object.keys(query).forEach((key) => {
  //   // searchParams.append(key, query[key]); // const finalUrl = query ? path + `q=${JSON.stringify()}` queryString : path;
  //   query[key] = encodeURIComponent(query[key]);
  // });
  try {
    const response = await fetch(
      encodeURI(path + `?q=${JSON.stringify(query)}`)
    );
    if (!response.ok) return Promise.reject(response);
    else {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
  return responseData;
}
