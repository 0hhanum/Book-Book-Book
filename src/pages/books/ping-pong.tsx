import React, { useEffect, useState } from "react";
import Helmet from "../../components/Helmet";
import Ball from "../../components/Books/PingPong/Ball";
import Racket from "../../components/Books/PingPong/Racket";
import { animate, useMotionValue } from "framer-motion";
import styled from "styled-components";
import ScoreBoard from "../../components/Books/PingPong/ScoreBoard";

const Container = styled.div`
    position: relative;
    overflow-y: hidden;
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='1' height='1' viewport='0 0 100 100' style='fill:black;'></svg>")
            16 0,
        auto;
`;
const PingPong = () => {
    const score = useState(9);
    const distance = useMotionValue(0.1);
    const throwBall = () => {
        animate(distance, 1, {
            duration: 0.7,
            type: "tween",
            onComplete() {
                console.log(distance.isAnimating());
            },
        });
    };
    const hitBall = () => {
        if (distance.get() < 0.8 && distance.get() > 0.5) {
            animate(distance, 0, {
                duration: 0.4,
                type: "spring",
                onComplete() {
                    throwBall();
                },
            });
        }
    };
    useEffect(() => {
        throwBall();
    }, []);
    return (
        <Container>
            <Ball distance={distance} />
            <Racket hitBall={hitBall} ballDistance={distance} />
            <ScoreBoard score={score} />
        </Container>
    );
};

export default PingPong;
export const Head = () => <Helmet title="Ping Pong" />;
