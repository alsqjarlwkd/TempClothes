import { useMutation, useQuery } from "@apollo/client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import FeedsWriteUI from "./feedsWrite.presenter";
import { M_CREATE_FEED, M_UPDATE_FEED, M_UPLOAD_FEED_IMGS, Q_FETCH_FEED } from "./feedsWrite.queries";
import { regionCategory, selectMyRegion, tagCategory } from "../../common/store";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const FeedsWrite = (props) => {
  const router = useRouter();

  const [myTag, setMyTag] = useState<String[]>([]);
  const [myRegion, setMyRegion] = useState<String>("");
  const [editRegion, setEditRegion] = useState(props.fetchData?.fetchFeed.region.id);
  console.log(editRegion);

  const aaa = props.fetchData?.fetchFeed.region.id;
  console.log("페치 region", props.fetchData?.fetchFeed.region.id);
  // setEditRegion(props.fetchData?.fetchFeed.region.id);
  // console.log(editRegion);
  //console.log(regionSelected);
  // const [regionSelected, setRegionSelected] = useRecoilState<String>(selectMyRegion);

  // setEditRegion(props.fetchData?.fetchFeed.region.id);

  // useEffect(() => {
  //   setEditRegion(props.feedData?.fetchData.region.id);
  //   console.log("use", editRegion);
  // }, [editRegion]);

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  // useEffect(() => {
  //   if (props.fetchData?.fetchFeed.region.id) {
  //     setRegionSelected(props.fetchData?.fetchFeed.region.id);
  //   }
  // }, [regionSelected]);

  // console.log(tagSelected);

  const [createFeed] = useMutation(M_CREATE_FEED);
  const [updateFeed] = useMutation(M_UPDATE_FEED);

  const onClickRegion = (e) => {
    setMyRegion(e);
  };

  // 태그 선택하기
  const onClickTag = (e) => {
    if (myTag.includes(e)) {
      const newMyTag = myTag.filter((tagEl) => tagEl !== e);
      setMyTag(newMyTag);
      return;
    }
    setMyTag([...myTag, e]);
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | any>([]);
  const [showPhoto, setShowPhoto] = useState([]);
  const [uploadFeedImgs] = useMutation(M_UPLOAD_FEED_IMGS);

  const onClickImage = () => {
    fileRef.current?.click();
  };

  const onChangeImgUrls = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    let temp = [];
    try {
      const result = await uploadFeedImgs({
        variables: {
          imgs: file,
        },
      });
      setImageUrl((prev: string[]) => [...prev, ...result?.data?.uploadFeedImgs]);
      temp = [...result?.data?.uploadFeedImgs].reverse();
      setShowPhoto((prev) => [...prev, ...temp]);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onClickDelete = (deleteIndex: any) => {
    // setImageUrl(imageUrl.filter((photo) => photo !== deleteUrl));
    const deletedImg = imageUrl.splice(deleteIndex, 1);
    setImageUrl([...imageUrl]);
    setShowPhoto([]);
  };

  const onClickPhoto = (photo: any) => {
    setShowPhoto([photo]);
  };

  /////// 피드 등록 버튼
  const onClickSubmit = async (data) => {
    try {
      const feedResult = await createFeed({
        variables: {
          createFeedInput: {
            detail: data.detail,
            regionId: myRegion,
            feedTags: myTag,
            imgURLs: imageUrl,
            top: data.top,
            bottom: data.bottom,
            outer: data.outer,
            etc: data.etc,
          },
        },
      });
      console.log(feedResult);
    } catch (error) {
      alert(error.message);
    }
  };

  // 피드 수정 버튼
  const onClickUpdate = async (data) => {
    const currentImgFiles = JSON.stringify(imageUrl);
    const fetchImgFiles = JSON.stringify(props.fetchData.fetchFeed.feedImg.imgURL);
    const isChangedImgFiles = currentImgFiles !== fetchImgFiles;

    const updateFeedInput = {};
    if (data.detail) updateFeedInput.detail = data.detail;
    if (myRegion) updateFeedInput.regionId = myRegion;
    if (myTag) updateFeedInput.feedTags = myTag;
    if (data.outer) updateFeedInput.outer = data.outer;
    if (data.top) updateFeedInput.top = data.top;
    if (data.bottom) updateFeedInput.bottom = data.bottom;
    if (data.etc) updateFeedInput.etc = data.etc;
    if (isChangedImgFiles) updateFeedInput.imgURLs = imageUrl;
    try {
      const result = await updateFeed({
        variables: {
          updateFeedInput,
          feedId: String(router.query.feedId),
        },
      });
      alert("피드가 수정되었습니다");
      console.log(result);
      router.push(`/feeds/${router.query.feedId}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <FeedsWriteUI
      onClickImage={onClickImage}
      onChangeImgUrls={onChangeImgUrls}
      onClickDelete={onClickDelete}
      onClickPhoto={onClickPhoto}
      fileRef={fileRef}
      imageUrl={imageUrl}
      showPhoto={showPhoto}
      // 피드 등록 함수
      onClickRegion={onClickRegion}
      onClickTag={onClickTag}
      onClickSubmit={onClickSubmit}
      register={register}
      handleSubmit={handleSubmit}
      // 지역, 태그
      regionCategory={regionCategory}
      tagCategory={tagCategory}
      // 수정
      isEdit={props.isEdit}
      fetchData={props.fetchData}
      onClickUpdate={onClickUpdate}
      // 수정 태그
      editRegion={editRegion}
      aaa={aaa}
      // 해보는 중
      myRegion={myRegion}
      myTag={myTag}
    />
  );
};

export default FeedsWrite;
