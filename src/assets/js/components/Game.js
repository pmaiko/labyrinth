import React from 'react';
import {TransitionGroup, CSSTransition } from 'react-transition-group';
import { useState, useEffect, useReducer} from 'react'
import {generateSquares, getRandomIntInclusive, takeNeighbors} from '../constants'
import {connectRedux} from "../store";

function Game(props) {
    const [state, setState] = useState({
        startSquareId: false,
        finishSquareId: false,
        squares: [],
        moves: [],
        start: false,
    });

    const size = props.state.level || 3;
    const squares = generateSquares(size);
    const numberOfMovements = props.state.countSteps || 10;
    const speed = props.state.speed || 1000;

    function startGame() {
        let startSquareId;
        let currentId;
        let moves = [];

        startSquareId = getRandomIntInclusive(0, squares.length);
        currentId = startSquareId;

        for (let i = 0; i < numberOfMovements; i++) {
            let neighbors = takeNeighbors(squares, currentId, size);
            moves.push({title: neighbors.moveTitle});
            currentId = neighbors.newPositionId;

            function isFinishEquallyStart() {
                if(currentId === startSquareId) {
                    neighbors = takeNeighbors(squares, currentId, size);
                    moves[i] = {title: neighbors.moveTitle};
                    currentId = neighbors.newPositionId;

                    if(currentId === startSquareId) {
                        isFinishEquallyStart()
                    }
                }
            }

            if (i === numberOfMovements - 1) {
                isFinishEquallyStart();
            }
        }

        setState({
            ...state,
            startSquareId: startSquareId,
            finishSquareId: currentId,
            squares: squares,
            moves: moves,
            start: true,
        });
    }

    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        let counter = 0;
        let interval;
        let timeout1;
        let timeout2;

        if (state.start === true) {
            if (state.moves.length > 0) {
                for (let i = 0; i < 2; i++) {
                    handler();
                }
                interval = setInterval(()=>{handler()}, speed);
            }
            function handler() {
                let newMoves = state.moves;
                newMoves[counter] = {...state.moves[counter], render: true, active: false};
                if (counter > 0) {
                    newMoves[counter - 1] = {...state.moves[counter - 1], active: true};
                }
                if (counter > 1) {
                    newMoves[counter - 2] = {...state.moves[counter - 2], active: false}
                }

                setState({
                    ...state,
                    moves: newMoves,
                });

                console.log(state);
                if (counter >= state.moves.length - 1) {
                    timeout1 = setTimeout(() => {
                        newMoves = state.moves;
                        newMoves[counter - 2] = {...newMoves[counter - 2], active: false};
                        newMoves[counter - 1] = {...newMoves[counter - 1], active: true};

                        setState({
                            ...state,
                            moves: newMoves,
                        });

                        timeout2 = setTimeout(() => {
                            newMoves = state.moves;
                            newMoves[counter - 1] = {...newMoves[counter - 1], active: false};
                            setState({
                                ...state,
                                moves: newMoves,
                            });
                        }, speed);
                    }, speed);

                    clearInterval(interval)
                }

                counter++;
            }
        }
        return () => {
            clearInterval(interval);
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        }
    }, [state.start]);

    let clickSquare = (e, key) => {
        if (state.finishSquareId === key) {
            let startSquareId = state.startSquareId;
            startSquareId = false;
            let squares = state.squares;
            squares[key] = {...squares[key], status: 'done'};
            setState({
                ...state,
                squares,
                startSquareId,
                start: false,
            });

            createNewGame()
        }
        else {
            let startSquareId = state.startSquareId;
            startSquareId = false;
            let squares = state.squares;
            squares[key] = {...squares[key], status: 'fail'};
            squares[state.finishSquareId] = {...squares[state.finishSquareId], status: 'done'};
            setState({
                ...state,
                startSquareId,
                squares,
                start: false,
            });
            createNewGame();
        }

        function createNewGame() {
            setTimeout(() => {
                setState({
                    startSquareId: false,
                    finishSquareId: false,
                    squares: [],
                    moves: [],
                    start: false,
                });
                startGame();
            }, 5000)
        }
    };

    let outMoves = (move) => {
        if (move === "Top") {
            return (
                <i className="material-icons">arrow_upward</i>
            )
        }
        else if (move === "Right") {
            return (
                <i className="material-icons">arrow_forward</i>
            )
        }
        else if (move === "Bottom") {
            return (
                <i className="material-icons">arrow_downward</i>
            )
        }
        else if (move === "Left") {
            return (
                <i className="material-icons">arrow_back</i>
            )
        }
        else {
        }
    };

    return (
        <div className="container" style={{maxWidth: "calc(2/3 * (100vh))"}}>
            <div className="squares">
                {
                    state.squares.map((square, key) => {
                        return (
                            <div className={`square${key === state.startSquareId ? ' start' : ''} ${square.status === 'done' ? 'done' : ''}`}
                                 style={{
                                     width: `${100/size}%`,
                                     paddingTop: `${100/size}%`
                                 }}
                                 onClick={(e) => clickSquare(e, key)}
                                 key={key}
                            >
                                <div className="square__block">

                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <CSSTransition timeout={1000}
                           in={state.start}
                           classNames="slideUp"
            >
                <div className="task-panel">
                    <div className="task-panel__row">
                        {state.moves && state.moves.map((move, key) => (

                            <div className={move.active === true ? 'move active' : 'move'}
                                 key={key}>
                                <div className="move__block">
                                    {move.render && outMoves(move.title)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default connectRedux(Game);
