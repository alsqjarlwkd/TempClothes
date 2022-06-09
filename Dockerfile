FROM node:14
WORKDIR /tempclothes/
COPY ./package.json /tempclothes/
# 먼저 package.json 파일을 복사하고 docker 안에 tempclothes 폴더 안에 넣는다.

COPY ./yarn.lock /tempclothes/
# yark.lock 파일을 복사하고 tempclothes 안에 넣어라
RUN yarn install

COPY . /tempclothes/
# 모든 파일을 tempclothes 안에 넣는다
CMD yarn dev

#[dockerfile만 가지고 실행할때 명령어]
#1.docker build .
#2.docker images 를 쳐서 images id를 확인
#3.docker run <복사한 이미지 ID>
# 하지만! docker 안에서 로컬 3000을 띄워주기 때문에 로컬에서는 접근할 방법이 없다! 그래서 docker-compose 가 필요하다!





