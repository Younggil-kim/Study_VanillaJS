class Favorite {
    // 클래스는 반드시 생성자 필요.
    constructor(){
        this.favoriteElement = document.querySelector(".content-favorite");

    }
    setUp(){
        this.bindEvents();
    }
    bindEvents(){
        // 이벤트 리스너 처리하는 함수
        this.favoriteElement.addEventListener('click', (e) => {
            // 이벤트가 발생하는 요소에 즉 버튼에 달아야 하는데
            // 지금 보면 부모요소인 content-favorite에 이벤트리스터 달았음
            // 이거 왜그러냐면 이거 부모에 리스너 걸어서 자식들 처리하게 하는
            //  이벤트 위임이라고 함. 
            const cPath = e.composedPath();
            console.log(cPath)
            // 버블링 경로

            // composedPath는 리스너에 이벤트 경로를 배열값으로 반환함
            // 이벤트 전파되는 경로를 말함
            const element = cPath.find(element => element.tagName === "BUTTON")
            if(!element){
                // 예외처리
                return;
            }
            // 이 요소 클릭하면 on 다시 클릭하면 제거
            element.classList.toggle('on')
        })
    }
}

export default Favorite;