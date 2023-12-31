import { useEffect, useState } from 'react'
import Board from './Board'
import GameOver from './GameOver';
import GameState from './GameState';

const playerX = 'x'; 
const playerO = 'o'; 

const winningCombinations = [
  //rows
  {combo: [0, 1, 2], strikeClass: "strike-row-1"},
  {combo: [3, 4, 5], strikeClass: "strike-row-2"},
  {combo: [6, 7, 8], strikeClass: "strike-row-3"},
  //columns
  {combo: [0, 3, 6], strikeClass: "strike-column-1"},
  {combo: [1, 4, 7], strikeClass: "strike-column-2"},
  {combo: [2, 5, 8], strikeClass: "strike-column-3"},
  //diagonal
  {combo: [0, 4, 8], strikeClass: "strike-diagonal-1"},
  {combo: [2, 4, 6], strikeClass: "strike-diagonal-2"}
 ]

const checkWinner = (tiles, setStrikeClass, setGameState) => {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];
    if(
      tileValue1 !== null && 
      tileValue1 === tileValue2 && 
      tileValue1 === tileValue3
      ) {
        setStrikeClass(strikeClass);
        tileValue1 === playerX ? setGameState(GameState.playerXWins) : setGameState(GameState.playerOWins);
        return;
      }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if(areAllTilesFilledIn){
    setGameState(GameState.draw);
  }
  
  }


const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(playerX);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    if(gameState !== GameState.inProgress) return;

    if(tiles[index] !== null) return;

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    playerTurn === playerX ? setPlayerTurn(playerO) : setPlayerTurn(playerX);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  },[tiles])

  return (
    <div>
      <h1>TicTacToe</h1>  
      <Board 
        playerTurn={playerTurn} 
        tiles={tiles} 
        onClick={handleTileClick} 
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState}/>
    </div>
  )
}

export default TicTacToe