// 공통 HTTP 유틸리티: fetch 래퍼

const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

function buildRequestInit(method, body, headers) {
  const init = { method, headers: { ...DEFAULT_HEADERS, ...(headers || {}) } };
  if (body !== undefined && body !== null) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  return init;
}

async function request(url, { method = 'GET', headers, body, timeoutMs = 15000 } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...buildRequestInit(method, body, headers), signal: controller.signal });
    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();
    if (!response.ok) {
      const message = (data && data.message) || `HTTP ${response.status} ${response.statusText}`;
      const error = new Error(message);
      error.status = response.status;
      error.payload = data;
      throw error;
    }
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

export function get(url, options) {
  return request(url, { ...(options || {}), method: 'GET' });
}

export function post(url, body, options) {
  return request(url, { ...(options || {}), method: 'POST', body });
}

export function put(url, body, options) {
  return request(url, { ...(options || {}), method: 'PUT', body });
}

export function del(url, options) {
  return request(url, { ...(options || {}), method: 'DELETE' });
}

export default {
  request,
  get,
  post,
  put,
  del,
};


