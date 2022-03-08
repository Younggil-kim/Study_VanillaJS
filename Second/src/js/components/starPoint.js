// 호버 상태에 따른 이미지 맵핑 객체

const starImageSourceMap = {
  empty: "./src/image/icon_empty_star.png",
  half: "./src/image/icon_half_star.png",
  full: "./src/image/icon_star.png",
};

class StarPoint {
  constructor() {
    this.starContentElement = document.querySelector(".content-star");
    this.starBackgroundElement =
      this.starContentElement.querySelector(".star-background");
    this.starImages = this.starBackgroundElement.querySelectorAll("img");
    this.starPointResetButton =
      this.starContentElement.querySelector(".icon-remove-star");
    this.lockedStarPoint = false; // 별점이 고정되어 있는지 아닌지 상태를 알려주는 변수.
  }

  setUp() {
    this.bindEvents();
  }

  // 별점을 고정된 상태로 만들어 줌.
  lockStarPoint() {
    this.lockedStarPoint = true;
  }

  // 고정된 별점을 다시 풀어주는 함수
  unlockesStarPoint() {
    this.lockedStarPoint = false;
  }

  // 별점의 상태를 반환함.
  isLockedStarPoint() {
    return this.lockedStarPoint;
  }

  bindEvents() {
    // 마우스 무브 이벤트 처리

    this.starBackgroundElement.addEventListener("mousemove", (e) => {
      // 별점 상태가 트루면 마우스 리스터 중지
      // 클릭을통해 별점 고정시켰으면 별점은 움직이면 안됨
      if (this.isLockedStarPoint()) {
        return;
      }
      const { target, offsetX: currentUserPoint } = e; // offsetX : 타겟 요소에서의 마우스 포인터 X축위치
      const { point } = target.dataset;
      const starPointIndex = parseInt(point, 10) - 1;
      const [starimageClientRect] = target.getClientRects(); // 요소의 좌표와 크기에 대한 정보를 반환

      const starImageWidth = starimageClientRect.width;
      const isOverHalf = starImageWidth / 2 < currentUserPoint; //마우스 포인터의 위치가 절반 넘어서면 트루

      this.renderStarPointImages({
        drawableLimitIndex: starPointIndex,
        isOverHalf,
      });
    });

    // 마우스 클릭시 별점 잠금
    this.starBackgroundElement.addEventListener("click", () =>
      this.lockStarPoint()
    );

    // 리셋 버튼 이벤트 할당
    this.starPointResetButton.addEventListener("click", () => {
      this.unlockesStarPoint();
      this.resetStarPointImages();
    });

    // 마우스 아웃 당시 별점이 고정상태가 아니라면 별점 초기화
    this.starBackgroundElement.addEventListener("mouseout", () => {
      !this.isLockedStarPoint() && this.resetStarPointImages();
    });
  }
  renderStarPointImages(payload = {}) {
    // 초기 값 할당
    const { drawableLimitIndex = -1, isOverHalf = false } = payload;
    // NodeList입니다. Array아님
    this.starImages.forEach((star, idx) => {
      // drawableLimitIndex 호버안 별의 이미지 값
      // idx는 순환하는거
      // 현재 순환순서보다 마우스 호버된 별 인덱스가 크면 꽉찬별 아니면 빈별 채우기
      let imageSource =
        idx < drawableLimitIndex
          ? starImageSourceMap.full
          : starImageSourceMap.empty;

      if (drawableLimitIndex === idx) {
        imageSource = isOverHalf
          ? starImageSourceMap.full
          : starImageSourceMap.half;
      }
      // 현재 순환중인 이미지에 src값 연결
      star.src = imageSource;
    });
  }

  resetStarPointImages() {
    //   전달을 없애고 하면 초기화가됨
    this.renderStarPointImages();
  }
}

export default StarPoint;
