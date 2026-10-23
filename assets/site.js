(function () {
  var PHONE = '01042684023';
  var PHONE_LABEL = '010-4268-4023';
  var BODY = [
    '[코니처 문자 상담]',
    '1. 브랜드/가구명 : ',
    '2. 출발 지역 → 도착 지역 : ',
    '3. 이전 거리(같은 집 안 이동이면 방간이동) : ',
    '4. 엘리베이터 사용 가능 여부(층수) : ',
    '5. 희망 날짜 : ',
    '',
    '※ 가구 사진을 함께 보내주세요.'
  ].join('\n');

  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  var smsHref = 'sms:' + PHONE + '?&body=' + encodeURIComponent(BODY);

  var modal = document.createElement('div');
  modal.className = 'sms-modal';
  modal.innerHTML =
    '<div class="box" role="dialog" aria-modal="true" aria-label="문자 상담 번호">' +
    '<p class="small">휴대폰 문자로 사진과 함께 보내주세요</p>' +
    '<p class="num">' + PHONE_LABEL + '</p>' +
    '<button type="button" class="btn-sms copy">번호 복사</button>' +
    '<p class="small" style="margin-top:12px">상담 07~18시 · 수도권 출장</p>' +
    '<button type="button" class="close">닫기</button></div>';
  document.body.appendChild(modal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.classList.contains('close')) modal.classList.remove('open');
  });
  modal.querySelector('.copy').addEventListener('click', function () {
    var btn = this;
    var done = function () { btn.textContent = '복사했어요'; };
    if (navigator.clipboard) navigator.clipboard.writeText(PHONE_LABEL).then(done, done);
    else done();
  });

  document.querySelectorAll('[data-sms]').forEach(function (el) {
    el.setAttribute('href', smsHref);
    el.addEventListener('click', function (e) {
      if (isMobile) return;
      e.preventDefault();
      modal.classList.add('open');
    });
  });
})();
