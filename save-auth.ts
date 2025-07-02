import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 카카오 로그인 페이지로 이동
  await page.goto('https://developers.kakao.com/tool/demo/message/default/send');

  // 이미 로그인되어 있다면 자동으로 로그인된 상태로 열림
  // 아니라면 다시 수동 로그인
  await page.pause(); // 브라우저에서 로그인 후 resume

  // 세션 저장
  await context.storageState({ path: 'auth.json' });

  await browser.close();
})();
