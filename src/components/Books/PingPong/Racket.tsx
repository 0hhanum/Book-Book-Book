import React, { useEffect } from "react";
import styled from "styled-components";
import {
    useMotionValue,
    motion,
    useTransform,
    MotionValue,
} from "framer-motion";
import { throttle } from "../../utils";

interface IRacket {
    hitBall: () => void;
    ballDistance: MotionValue<number>;
}
const RUBBER_WIDTH = 1400;
const FACE_NUMBER = 35;
const EDGE_HEIGHT = 20;
const FACE_DEGREEE = 360 / FACE_NUMBER;
const FACE_WIDTH = RUBBER_WIDTH / FACE_NUMBER;
const FACE_SHIFT = RUBBER_WIDTH / Math.PI / 2;
const Container = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 750px;
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1500px;
`;
const Rubber = styled.div`
    width: 360px;
    height: 450px;
    border-radius: 48%;
    position: absolute;
`;
const FrontRubber = styled(Rubber)`
    background-color: red;
    transform: rotateX(90deg) translateZ(${EDGE_HEIGHT - 10}px);
`;
const BackRubber = styled(Rubber)`
    background-color: black;
    transform: rotateX(90deg) translateZ(${-EDGE_HEIGHT + 10}px);
`;
const RacketEdges = styled.div`
    transform-style: preserve-3d;
    transform: scaleX(0.83);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const RacketEdge = styled.div<{ $index: number }>`
    position: absolute;
    background-color: gray;
    height: ${EDGE_HEIGHT}px;
    width: ${FACE_WIDTH}px;
    transform: ${(props) =>
        `rotateY(${FACE_DEGREEE * props.$index}deg) translateZ(${
            FACE_SHIFT - 3
        }px)`};
`;
const Handles = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    transform: translateZ(280px);
`;
const Handle = styled.div`
    background-color: rgb(155, 100, 17);
    position: absolute;
    width: 60px;
    height: 150px;
    border-radius: 10px;
`;
const HandleFront = styled(Handle)`
    height: 20px;
    border-radius: 20px;
    transform: translateZ(75px);
`;

const HandleTop = styled(Handle)`
    transform: rotateX(90deg) translateZ(10px);
`;
const HandleBottom = styled(Handle)`
    transform: rotateX(90deg) translateZ(-10px);
`;
const HandleRight = styled(Handle)`
    width: 20px;
    transform: rotateX(90deg) rotateY(90deg) translateZ(30px);
`;
const HandleLeft = styled(Handle)`
    width: 20px;
    transform: rotateX(90deg) rotateY(90deg) translateZ(-30px);
`;
function Racket({ hitBall, ballDistance }: IRacket) {
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const cursorXRange = [0, 800];
    const cursorYRange = [0, 700];
    const rotateY = useTransform(cursorX, cursorYRange, [-50, 50]);
    const rotateZ = useTransform(cursorY, cursorXRange, [180, -30]);
    const translateX = useTransform(cursorX, cursorXRange, [-500, 500]);
    const translateY = useTransform(cursorY, cursorYRange, [-250, 250]);
    const onMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        cursorX.set(clientX);
        cursorY.set(clientY);
    };
    useEffect(() => {
        const throttledHitBall = throttle(hitBall, 300);
        cursorX.onChange(() => {
            if (
                (cursorX.getVelocity() > 0 && cursorX.getVelocity() < 500) ||
                (cursorX.getVelocity() < 0 && cursorX.getVelocity() > -500)
            )
                return;
            throttledHitBall();
        });
        return () => {
            cursorX.clearListeners();
        };
    }, []);
    return (
        <motion.div onMouseMove={onMouseMove}>
            <Container
                initial={{ scale: 0.5, rotateX: -80 }}
                style={{
                    rotateY,
                    rotateZ,
                    translateX,
                    translateY,
                }}
            >
                <FrontRubber></FrontRubber>
                <RacketEdges>
                    {Array.from({ length: FACE_NUMBER }).map((_, index) => (
                        <RacketEdge $index={index} key={index} />
                    ))}
                </RacketEdges>
                <BackRubber></BackRubber>
                <Handles>
                    <HandleFront />
                    <HandleTop />
                    <HandleBottom />
                    <HandleRight />
                    <HandleLeft />
                </Handles>
            </Container>
        </motion.div>
    );
}

export default Racket;
