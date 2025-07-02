// tests/sendToMyself.spec.ts
import { test, expect } from '@playwright/test';

test('카카오톡 나에게 메시지 보내기 (데모)', async ({ page }) => {
  // 카카오 메시지 데모 페이지 접근 (공식 툴)
  await page.goto('https://developers.kakao.com/tool/demo/message/default/send');

  // '내 애플리케이션' 연동이 안돼 있으면 안 뜰 수도 있음
  // 버튼 클릭을 통해 "나에게 보내기" 실행
  const sendBtn = page.getByRole('button', { name: '카카오톡으로 메시지 보내기' });
  await expect(sendBtn).toBeVisible();
  await sendBtn.click();

  // 전송 후 팝업 or 결과 메시지를 확인해야 함 (구조에 따라 다름)
  // Playwright는 팝업을 자동 추적하지 않기 때문에 약간의 로직 조정 필요
  // 테스트 목적이면 클릭 동작까지로 충분할 수도 있음
});
