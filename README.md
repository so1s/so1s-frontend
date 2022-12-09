<div align="center">

<img src="https://raw.githubusercontent.com/so1s/.github/main/static/logo.png" alt="So1s Logo" width="50%" />

# So1s Frontend

React 기반 MLOps 관리 백오피스 프론트엔드

[프로젝트 소개 페이지로 돌아가기](https://github.com/so1s)

</div>

## 주요 기능

- Model 빌드 및 버전 관리, 상세 정보 확인 기능 지원
- Inference Server 배포 관리 및 상세 정보 확인 기능 지원
- Model, Inference Server 서버 헬스 체크 기능 지원
- Inference Server 생성을 위한 Container Resource Template 관리 기능 지원
- ABN Test 생성 및 Endpoint 확인 기능 지원
- Model, Inference Server, Node Yaml 확인 기능 지원
- Helm Chart로 배포된 Grafana, Kibana, Kiali등 다른 컴포넌트에 대한 리다이렉션 지원

## 사용 기술

- Typescript
- React 18
- Yarn 3.3.0 stable /w PnP
- Vite
- Jotai
- React Router v6
- Tailwind CSS
- Axios

## 사용 방법

.env.dev 파일을 프론트엔드 루트 디렉토리에 작성합니다.

```
# .env.dev

# Local 환경에서는 http://localhost:8080
VITE_API_URL=${BACKEND_ENDPOINT}
```

그 다음에 Yarn을 사용하셔서 실행하시면 됩니다.

```bash
yarn dev
```
