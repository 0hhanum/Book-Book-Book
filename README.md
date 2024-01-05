# 책책책, 책을 읽읍시다 !

## 개요

비주얼 중심의 서평 개인 프로젝트

[보러가기 -> https://courageous-hamster-cbe0a4.netlify.app/](https://courageous-hamster-cbe0a4.netlify.app/)

## 기술 스택

- TypeScript
- Gatsby
- Recoil
- styled components
- Framer Motion
- React Three Fiber (Three.js)
- WebRTC (PeerJS)
- Media Stream API

## 상세 내용

### 서버리스 서비스 구축

- Netlify 호스팅 및 Github 연동 자동배포 환경 구축
- CMS(Contentful)을 통한 컨텐츠 관리
- AWS Lambda를 래핑해 FaaS로 제공하는 Netlify Functions를 통해 메일 서비스 Mailgun 이용
- 서버리스 환경에서의 WebRTC 커넥션을 위해 PeerJS의 오픈 서버 PeerServer 이용

<img width="467" alt="image" src="https://github.com/0hhanum/Book-Book-Book/assets/79507291/752806a3-96b0-4469-a429-01c8e0569be8">


### 비주얼 시각화

- 정적 페이지 생성 프레임워크 Gatsby를 통해 책 별로 독립된 시각화 페이지 제공
  - 3D 모델, 게이미피케이션 등 서평 별 다양한 기법 활용
- React Three Fiber(Three.js)를 이용한 Visualization

### 이용자 커뮤니케이션

- 이메일 서비스를 연동해 익명 메일 기능 제공
- WebRTC를 통한 개발자(0hhanum)과의 실시간 Video Chat 구현
  - Video Chat 요청 시 개발자에게 알람 전송

## 개발 일지

[1. 아이디어 구체화 (23/02/12)](https://velog.io/@0hhanum/%EC%B1%85%EC%B1%85%EC%B1%85-%EC%B1%85%EC%9D%84-%EC%9D%BD%EC%9D%8D%EC%8B%9C%EB%8B%A4-1.-%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4-%EA%B5%AC%EC%B2%B4%ED%99%94)

[2. 프로젝트 세팅 (23/02/18)](https://velog.io/@0hhanum/%EC%B1%85%EC%B1%85%EC%B1%85-%EC%B1%85%EC%9D%84-%EC%9D%BD%EC%9D%8D%EC%8B%9C%EB%8B%A4-2.-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%A0%95)

[3. 컨텐츠 관리 (23/04/22)](https://velog.io/@0hhanum/%EC%B1%85%EC%B1%85%EC%B1%85-%EC%B1%85%EC%9D%84-%EC%9D%BD%EC%9D%8D%EC%8B%9C%EB%8B%A4-3.-%EC%BB%A8%ED%85%90%EC%B8%A0-%EA%B4%80%EB%A6%AC)

[4. 메일 서비스 Mailgun 연동 (23/05/20)](https://velog.io/@0hhanum/bookBookBook4)

[5. 이슈들 (23/07/29)](https://velog.io/@0hhanum/%EC%B1%85%EC%B1%85%EC%B1%85-%EC%B1%85%EC%9D%84-%EC%9D%BD%EC%9D%8D%EC%8B%9C%EB%8B%A4-5.-%EC%9D%B4%EC%8A%88%EB%93%A4)

## 제작

[0hhanum](https://github.com/0hhanum) - <rntls123@naver.com>
