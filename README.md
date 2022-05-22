# Humanscape 2-B조

## 1. 배포 Url

https://humanscape-2team-b.netlify.app/ <br /> <br />

## 2. 실행 방법

1. https://humanscape-2team-b.netlify.app/ 에 접속한다.
2. 검색하고 싶은 질병명을 검색한다.
3. 키보드를 이용해 위아래로 탐색을 하며 질병을 찾는다. <br /> <br />

## 3. 폴더 구조

```
├─assets
├─components
│  ├─Input
│  ├─Modal
│  └─Search
├─hooks
├─recoil
├─routes
├─services
├─styles
│  ├─base
│  ├─constants
│  └─mixins
├─types
└─utils
```

<br />
<br />

## 4. 기능

- 검색어를 입력할 때 debounce 기능을 통해 불필요한 api 호출 최소화
- 인풋 포커싱이 되어 있을 때, 키보드 방향키 (upArrow, downArrow)로 추천 검색어 이동 가능
  - isComposing 속성을 이용하여 MacOS에서의 한글 키보드 버그 해결
  - 검색된 결과들을 방향 키로 한 바퀴 돌고 난 후 처음에 검색한 검색어로 돌아오게 함
  - 위/아래 방향 키로 이동 시 커서를 뒤쪽으로 고정
- react-query를 이용한 로컬 캐싱 구현, pc와 모바일 모달 창의 데이터 연동
- 받아온 데이터를 문자의 순서대로 정렬
- 모바일 버전에서 모달을 사용한 경우, pc버전에서는 사라지고 다시 화면을 줄일 경우 나타나도록 설정
- input value를 체크하여 자음이나 모음만 검색한 경우와 같이 조건에 맞지 않으면 api를 호출할 수 없게 설정
- 입력한 인풋의 값과 같은 검색 아이템의 문자 볼드 처리 <br /> <br />

## 5. 구현 방법과 이유

#### 5-1. 검색어를 입력할 때 debounce 기능을 통해 불필요한 api 호출 최소화

- 검색 조건의 input의 상태 값을 recoil로 구현하여 인풋 값을 전역으로 관리할 수 있게 했습니다.
- input의 setTimeout을 이용하여 입력이 끝난 후 500ms 동안의 딜레이를 줘서 입력이 끝난 후 api 호출을 할 수 있게 했습니다.

- 구현 이유 : api 호출을 최소화

#### 5-2. 인풋 포커싱이 되어 있을 때, 키보드 위/아래 방향키 (upArrow, downArrow)로 추천 검색어 이동 가능

- 활성화되는 item의 index를 전역으로 관리할 수 있도록 recoil을 사용했습니다.
- 키보드 위/아래 뱡향키가 눌릴 때 index 숫자가 증/감 되도록 하였습니다.
- state 와 일치하는 item 들은 클래스명(isActive)을 주어서 활성화를 표현했습니다.

#### 5-3. react-query를 이용한 로컬 캐싱 구현, pc와 모바일 모달창의 데이터 연동

- react-query의 옵션들을 활용해, cache-time을 10분으로 주었습니다.
- 10분 이내에 재검색된 데이터들은 캐싱이 적용되어 api 콜을 다시 보내지 않도록 했습니다.
- 캐싱 된 데이터를 이용해, pc와 모바일 모달에서 동일한 데이터를 띄울 수 있게 했습니다.

- 구현 이유: 불필요한 api 호출의 최소화

#### 5-4. 받아온 데이터를 문자의 순서대로 정렬

- sort 메소드를 이용하여 데이터 값들을 관련도 순으로 정렬하였습니다.
- ex) 간질, 자간, 독성 간질환

#### 5-5. input value를 체크하여 자음이나 모음만 검색한 경우와 같이 조건에 맞지 않으면 api를 호출할 수 없게 설정

- checkWord 함수의 정규표현식을 통해 초성과 중성이 결합되지 않은 불안전한 한글이 왔을 때 API 호출을 할 수 없게 했습니다.

- 구현 이유 : 불필요한 api 호출의 최소화

#### 5-6. 입력한 인풋의 값과 같은 검색 아이템의 문자 볼드처리

- replace 메소드를 이용해서 인풋 값과 같은 문자를 mark처리해서, 스트링 형태의 html을 리턴하였습니다. <br /> <br />

## 6. 구현하면서 어려웠던 점

- api 호출: react-query에 있는 enabled 옵션을 활용해서 api 호출을 최소화 하고 싶었는데, 빈값일 때도 api가 호출이 되서 어려움을 겪었습니다. input value를 trim한 값이 빈값이 아닌 경우, 그리고 정규식으로 체크한 값이 true일 경우를 enabled 옵션에 넣어주어 해결할 수 있었습니다. <br />

- 문자열 bold 처리(HTML 파싱) : dangerouslySetInnerHTML을 사용해 스트링 형태의 html을 렌더링하려 했지만 코드에서 스트링 형태의 html이 들어가면 cross-site-scripting 공격에 노출될 수 있어 linter가 경고를 보냅니다.따라서 렌더링 하는 곳에서 스트링 형태의 html을 html-react-parser를 통해 파싱해준 후 렌더링 했습니다. <br />

- 방향키 커서를 뒤쪽으로 보내기 : ArrowUp 방향 키를 누를 때마다 커서가 검색어 앞쪽으로 이동해서 고민이었는데 ArrowUp 방향 키를 누를 때 e.preventDefault();를 주었더니 커서를 뒤쪽으로 보낼 수 있었습니다. <br />

- 방향키 구분 : 아직 key property를 지원하지 않는 브라우저를 위해서 e.key 와 e.keyCode 모두 작동하도록 조건문을 작성했습니다. <br />

- 검색된 결과들을 방향 키로 한 바퀴 돌고 난 후 처음에 검색한 검색어로 돌아오게 하기 : 검색어는 state에 저장해 두고 검색 input에 ref를 주어 inputRef.current.value 값이 다시 -1로 돌아왔을 때 저장해둔 state를 넣어 줍니다. inputRef.current와 data의 값이 undefined일 경우가 있어서 조건문을 깔끔하게 쓰는것이 어려웠습니다. <br />

- 아이템 활성화에 따른 스크롤의 변화 : 추천 검색어를 밑으로 내릴수록 스크롤이 이동하는 모습을 원했는데, 스크롤을 내릴 때마다 추천 검색어의 상단에 붙어 있어서 원하는 모습으로의 구현에 어려움을 겪었습니다. 하지만 scrollIntoView 옵션에 element 요소의 상단, 하단 중 어떤 것을 기준으로 할 것인지 설정할 수 있는 alignToTop 값을 false로 주어 해결할 수 있었습니다. <br /> <br />

## 7. 기술 스택

- typescript
- react
- recoil
- react-query
- scss <br /> <br />

## 8. Dependencies

- classname : 조건부 클래스네임 지정
- html-react-parser : 검색어와 일치하는 내용 볼드(mark tag) 처리
- react-hot-toast : 에러 발생 시 toast 메세지 관리
- react-query : api 호출 상태를 관리, 데이터 캐싱
- recoil : 전역 상태 관리
- axios: api 호출 관련 라이브러리 <br /> <br />

## 9. Usage Example

<img src="https://user-images.githubusercontent.com/68591616/169681827-a86dc30d-0b36-4ad8-b451-c8d02d39576e.gif" alt="web">
<p>WEB 실행화면</p>
<img src="https://user-images.githubusercontent.com/68591616/169681839-0022ac91-aaff-4586-bb77-26def400e8ba.gif" alt="mobile">
<p>MOBILE 실행화면</p>
<img src="https://user-images.githubusercontent.com/68591616/169681846-dbed7e0d-a083-48e1-8abc-c77232cad0d2.gif" alt="api call">
<p>API CALL</p>
