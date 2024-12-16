# 📝 memo 앱 프로젝트
세탁특공대 프론트엔드 코딩 과제입니다.

## 🚀 실행 방법

### 1. 프로젝트 클론
먼저 레포지토리를 로컬로 클론합니다
```
git clone <레포지토리 URL>
cd <프로젝트 폴더>
```

### 2. 필요한 의존성 설치
프로젝트에서 사용하는 패키지를 설치합니다
```
npm install 또는 yarn install
```

### 3. Expo CLI 설치 (필요한 경우)
Expo CLI가 설치되어 있지 않다면, 다음 명령어로 설치합니다
```
npm install -g expo-cli
```

### 4. Expo 서버 실행
다음 명령어를 실행하여 프로젝트를 시작합니다
```
expo start
```
명령 실행 후, 터미널에 QR 코드가 표시됩니다.

### 5. 앱 실행
1. Expo Go 앱 설치
    스마트폰에서 Expo Go를 다운로드하고 설치합니다.
    - iOS: App Store
    - Android: Google Play
2. QR 코드 스캔
    터미널에 표시된 QR 코드를 Expo Go 앱으로 스캔하여 프로젝트를 실행합니다.

### 6. 기타
- 웹 브라우저로 실행
    브라우저에서 실행하려면, Expo 서버 실행 후 나타나는 터미널 메뉴에서 `w` 를 누릅니다.
- 에뮬레이터로 실행
    로컬에 Android/iOS 에뮬레이터가 설정되어 있다면, 터미널 메뉴에서 `a`(Android) 또는 `i`(iOS)를 눌러 실행할 수 있습니다.

## 🗂️ 실행 환경
    - 사용한 nodejs 버전 : v20.X
    - android 버전 : 14

## 📲 구현한 내용

### 1. Memo 목록 페이지
- Header: 메모 목록의 개수가 표시됩니다.
- 목록 영역: 메모 목록이 표시되며, 한 화면에 다 표시되지 않으면 스크롤 가능합니다.
- 스크롤 동작: 메모가 추가되면 마지막 메모가 "추가" 버튼 바로 위에 오도록 스크롤됩니다.
- 삭제 기능: 메모 오른쪽의 "X" 버튼 클릭 시 해당 메모가 삭제되고, Header의 개수가 갱신됩니다.
- 메모 클릭: 메모 내용 외의 영역을 클릭하면 해당 메모의 상세 페이지로 이동합니다.
- 메모 표시: 제목, 날짜(YYYY-MM-DD), 내용 일부를 표시하고, 제목과 내용이 길면 말줄임표로 처리됩니다.
- 추가 버튼: 클릭 시 메모 개수가 1 증가하고, 새로운 메모(제목없음, 내용없음)가 목록에 추가되며, 추가된 메모가 목록 하단에 표시되도록 스크롤됩니다.

### 2. Memo 상세 및 수정 페이지
- 삭제: 
    - "삭제" 버튼을 클릭하면 해당 memo가 삭제되고, "메모리스트" 페이지로 이동합니다.
- 편집: 
    - "편집" 버튼을 클릭하면 제목과 내용이 수정 가능한 상태로 바뀝니다.
    - 이때 "편집" 버튼은 "수정", "삭제" 버튼은 "취소" 버튼으로 변경됩니다.
    - "Memo 수정" 페이지로 화면이 전환됩니다.
- 수정:
    - "수정" 버튼을 클릭하면 변경된 제목, 내용이 Memo 상세 페이지에 반영됩니다.
    - 수정된 날짜로 업데이트됩니다.
- 취소:
    - "취소" 버튼을 클릭하면 변경된 모든 내용이 취소되고, 원래의 데이터를 유지한 채 Memo 상세 페이지로 돌아갑니다.

## 🤔 고민되었던 부분 및 개선하고 싶은 사항
- 고민되었던 부분
    - 사용자 흐름: 앱의 사용자 흐름을 어떻게 설계할지에 대한 고민하며 특히 앱의 기능을 직관적으로 제공하기 위한 방법을 다룰 수 있습니다.
    - 기능 우선순위: 기능 개발 시 어떤 기능을 우선적으로 구현할지에 대한 고민하였습니다.
    - 앱 실행: 처음 expo 실행시 `something went wrong packager is not running (ip 주소)` 발생하면서 여러가지 시도 끝에 `\node_modules\@expo\cli\src\start\server\metro\dev-server\createMetroMiddleware.ts` 파일 내 코드 중 metroConfig.projectRoot 를 new URL( )로 감싸주면 해결하였습니다.
- 개선하고 싶은 사항
    - 삭제와 취소 버튼의 색상을 회색(grey) 대신 빨간색(red)으로 변경하면, 해당 기능의 역할을 사용자들이 더 쉽게 인식할 수 있을 것입니다.


## 🙇‍♀️ 기타 사항 
- 리액트 네이티브로 첫 프로젝트를 진행하면서, 크로스 플랫폼 개발이 가져오는 효율성에 대해 큰 장점을 느꼈습니다. 처음에는 네이티브와의 통합 과정에서 어려움이 있었습니다. 하지만, React의 기본 개념을 활용할 수 있어 빠르게 적응할 수 있었고, 다양한 라이브러리를 사용하면서 개발 속도를 크게 향상시킬 수 있었습니다. 또한, 디버깅을 통해 리액트 네이티브의 고유한 특성에 대해 배우고, 최적화 방법에 대한 경험을 쌓을 수 있었습니다. 앞으로는 네이티브 모듈 연동을 더 잘 활용하고, UI/UX 최적화에 집중하여 더 나은 성능을 낼 수 있도록 노력할 예정입니다.