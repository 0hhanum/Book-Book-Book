import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface IScoreBoard {
    score: number;
}
const Container = styled.div`
    position: absolute;
    top: 50%;
    right: 50%;
    width: 800px;
    height: 300px;
    border-radius: 20px;
    border: 10px solid #cfc9c9;
    transform: translate(50%, -40%);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Score = styled(motion.span)`
    color: ${(props) => props.theme.fontColor};
    font-size: 200px;
    font-weight: bold;
`;
const Colon = styled(Score)`
    margin: 0 60px 50px 60px;
`;
const ScoreContainer = styled.div`
    width: 200px;
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const ScoreBoard = ({ score }: IScoreBoard) => {
    const scoreVariants = {
        prevInitial: {
            translateY: 0,
        },
        nextInitial: {
            translateY: 0,
        },
        prevAnimate: {
            translateY: -200,
            transition: {
                delay: 1,
            },
        },
        nextAnimate: {
            translateY: -200,
            transition: {
                delay: 1,
            },
        },
    };
    return (
        <Container>
            <ScoreContainer>
                <Score>9</Score>
            </ScoreContainer>
            <Colon>:</Colon>
            <ScoreContainer>
                <Score
                    variants={scoreVariants}
                    initial="prevInitial"
                    animate="prevAnimate"
                >
                    {score - 1}
                </Score>
                <Score
                    variants={scoreVariants}
                    initial="nextInitial"
                    animate="nextAnimate"
                >
                    {score}
                </Score>
            </ScoreContainer>
        </Container>
    );
};

export default ScoreBoard;
