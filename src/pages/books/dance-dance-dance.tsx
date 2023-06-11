import React, { Suspense, lazy, useEffect, useState } from "react";
import Helmet from "../../components/Helmet";
import ScrollIconComponent from "../../components/Common/ScrollIconComponent";
import ScrollAnimationComponent from "../../components/Common/Animations/ScrollAnimationComponent";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { IScrollAnimationComponent } from "../../components/Common/Animations/ScrollAnimationComponent";
import styled from "styled-components";
import SlashEffectComponent from "../../components/Common/Animations/SlashEffectComponent";
import ProgressController from "../../components/Common/ProgressDialogs/ProgressController";

const textObjects: IScrollAnimationComponent[] = [
  {
    texts: ["「친구의 정의로서, 한가지 부탁을 하겠어.」", "하고 그는 말했다."],
  },
  {
    texts: [
      "「맥주를 한 잔 더 마시고 싶네.",
      "하지만 지금은 일어서서 저기까지 나갈 기운이 없어.」",
    ],
  },
  {
    texts: [
      "「좋아.」",
      "하고 나는 말했다. 그리고 카운터로 가서, 또 맥주 두 잔을 샀다.",
      "카운터가 혼잡하여 사는데 시간이 걸렸다.",
    ],
  },
  {
    texts: [
      "유리잔을 양손에 들고, 안쪽의 테이블로 돌아왔을때",
      "그의 모습은 보이지 않았다.",
    ],
  },
  {
    texts: [
      "비맞은 모자도, 주차장의 마세라티도 사라져 버렸다.",
      "아이고 맙소사 하고 생각했다. 그리고 고개를 저었다.",
    ],
    children: <SlashEffectComponent />,
  },
  {
    texts: ["하지만 어쩔 도리가 없었다.", "그는 사라져 버린 것이다."],
    isVanishingEffect: true,
  },
];
const EmptyContainer = styled.div`
  height: 100vh;
`;
const MasiContainer = styled(motion.div)`
  position: fixed;
  top: ${(props) => `${props.theme.variables.headerHeight}px`};
  right: 0;
  left: 0;
  bottom: 0;
`;

const DanceDanceDance = () => {
  const MaseratiInOcean = lazy(
    () => import("../../components/Books/DanceDanceDance/MaseratiInOcean")
  );
  const { scrollYProgress } = useScroll();
  const [isShowScrollUI, setIsShowScrollUI] = useState(true);
  const [isMaseratiVisible, setIsMaseratiVisible] = useState(false);
  useEffect(() => {
    scrollYProgress.onChange((scroll) => {
      if (scroll < 0.1) {
        setIsShowScrollUI(true);
      } else {
        setIsShowScrollUI(false);
      }
    });
  }, []);
  const masiEffect = () => setIsMaseratiVisible(true);
  return (
    <>
      <EmptyContainer />
      {textObjects.map((textObject, i) => (
        <ScrollAnimationComponent
          key={i}
          {...textObject}
          vanishingCallback={
            textObject.isVanishingEffect ? masiEffect : undefined
          }
        >
          {textObject.children}
        </ScrollAnimationComponent>
      ))}
      <MasiContainer
        initial={{ opacity: 0, zIndex: 0 }}
        animate={{
          opacity: isMaseratiVisible ? 1 : 0,
          zIndex: isMaseratiVisible ? 1 : -1,
        }}
        transition={{ duration: 5 }}
      >
        <Suspense fallback={<ProgressController type={"dot"} />}>
          <MaseratiInOcean isMaseratiVisible={isMaseratiVisible} />
        </Suspense>
      </MasiContainer>
      <AnimatePresence>
        {isShowScrollUI && <ScrollIconComponent />}
      </AnimatePresence>
    </>
  );
};

export default DanceDanceDance;
export const Head = () => <Helmet title="Dance Dance Dance" />;
