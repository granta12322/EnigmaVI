import React, {useState} from "react";
import './keyBoard.css'
interface KeyBoardProps {
  characterRows: Array<Array<string>>
  handleKeyPress: Function 
    
  
}

interface KeyBoardRowProps {
  characters: Array<string>
  handleKeyPress: Function
}

export function KeyBoard(props: KeyBoardProps) {

    return (
      <div className='keyBoard' >
      { 
        props.characterRows.map((row,i) => {
          return <KeyBoardRow key={i} characters={row} handleKeyPress ={(character: string) =>props.handleKeyPress(character)}/>
  })
      }
    </div>);
  }
  

  function KeyBoardRow(props: KeyBoardRowProps) {
    //console.log("Chars:" + props.characters)
    return (
      <div  className='keyBoardRow'>
        <> {props.characters.map((character) =>  {
        return(
        <p className = "keyBoardKey" 
           key = {character} 
           onClick ={() => {
            props.handleKeyPress(character)}}
           >
          {character}
          </p>
        )
        }
        
        )
      }
      </>
      </div>
      );
    }
