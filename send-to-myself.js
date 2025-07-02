import fetch from 'node-fetch';

const CLIENT_ID = 'REST_API_KEY'; // 카카오 개발자 사이트에서 발급받은 REST API 키
const REDIRECT_URI = 'https://localhost:3000/oauth';
const AUTH_CODE = '일회용 인증 코드'; // 카카오 로그인 후 발급받은 인증 코드

const getAccessToken = async () => {
  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: AUTH_CODE,
    }),
  });

  const json = await res.json();
  console.log('[Access Token Response]');
  console.log(json);

  return json.access_token;
};

const sendMessageToMe = async (accessToken) => {
  const res = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      template_object: JSON.stringify({
        object_type: 'text',
        text: '🟡 Playwright 없이 카카오 메시지 보내기 테스트입니다!',
        link: {
          web_url: 'https://developers.kakao.com',
          mobile_web_url: 'https://developers.kakao.com',
        },
        button_title: '자세히 보기',
      }),
    }),
  });

  const result = await res.json();
  console.log('[Message Send Result]');
  console.log(result);
};

(async () => {
  const token = await getAccessToken();
  if (token) {
    await sendMessageToMe(token);
  }
})();
