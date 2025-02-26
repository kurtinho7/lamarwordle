import React, { useContext } from 'react';
import { AppContext } from '../App';

function SongFeatures({ attemptValue }) {
  const { board, correctSong } = useContext(AppContext);
  const guessedFeatures = board[attemptValue][4]; // guessed features (array)
  const correctFeatures = correctSong.features;   // correct features (array)

  // Helper: normalize array elements to lower case
  const normalizeArray = (arr) =>
    Array.isArray(arr) ? arr.map(item => item.toLowerCase()) : [];

  const normalizedGuessed = normalizeArray(guessedFeatures);
  const normalizedCorrect = normalizeArray(correctFeatures);

  console.log(normalizedGuessed);
  console.log(normalizedCorrect);

  const isCorrect = () => {

    if (normalizedGuessed.length === 0 && normalizedCorrect.length === 0){
        return true;
    } else 
        return normalizedGuessed.length === normalizedCorrect.length &&
        normalizedGuessed.every((feature, i) => feature === normalizedCorrect[i]);
    }


  // Check for exact match (order matters; if order doesn't matter, sort them first)
  const correct = isCorrect();

  // "Almost" if at least one feature is correct
  const almost = normalizedGuessed.some(feature =>
    normalizedCorrect.includes(feature)
  );

  // If there's no guess, treat it as an error
    const cellState = correct ? "correct" : almost ? "almost" : "error";

    const hasNoFeatures = () => {
        if (normalizedGuessed.length === 0){
            return "No Features";
        } else {
            return;
        }
    }

 

  return (
    <div className="songfeatures" id={cellState}>
      {Array.isArray(guessedFeatures) ? guessedFeatures.join(', ') : ''}
      {hasNoFeatures()}
    </div>
  );
}

export default SongFeatures;
