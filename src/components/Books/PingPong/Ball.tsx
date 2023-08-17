import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import styled from "styled-components";

interface IBall {
    distance: MotionValue<number>;
}
const BallComponent = styled(motion.div)`
    width: 80px;
    height: 80px;
    border: 0.1px solid #cfc9c9;
    border-radius: 50%;
    background: radial-gradient(circle at 20px 25px, #ffffff, #aeadad);
    position: absolute;
`;
const Ball = ({ distance }: IBall) => {
    const translateX = useTransform(distance, [0.1, 1], [200, 1250]);
    const translateY = useTransform(distance, [0.1, 1], [50, 850]);
    return (
        <BallComponent style={{ scale: distance, translateX, translateY }} />
    );
};

export default Ball;
