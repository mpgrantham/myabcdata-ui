import React, { useEffect, useState } from 'react';

import ReactWordcloud from 'react-wordcloud';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ANTECEDENT = 'antecedent';
const BEHAVIOR = 'behavior';
const CONSEQUENCE = 'consequence';

const ABCWordCloud = (props) => {

    const incidents = props.incidents;

    const [abcs, setAbcs] = useState([ANTECEDENT, BEHAVIOR, CONSEQUENCE]);
    const [words, setWords] = useState([]);

    useEffect(() => {

        let wordCount = [];
      
        incidents.forEach(incident => {
            let allWords = [];

            if ( abcs.includes(ANTECEDENT) ) {
                allWords = allWords.concat(incident.antecedents);
            }
            if ( abcs.includes(BEHAVIOR) ) {
                allWords = allWords.concat(incident.behaviors);
            }
            if ( abcs.includes(CONSEQUENCE) ) {
                allWords = allWords.concat(incident.consequences);
            }

            allWords.forEach(a => {
                let word = wordCount.find(w => { return w.text === a.typeValue});
                if ( word ) {
                    word.value++;
                }
                else {
                    wordCount.push({text: a.typeValue, value: 1});
                }
            });

            setWords(wordCount);
        });

      
    }, [incidents, abcs]);

    const handleChange = (event, newAbcs) => {
        setAbcs(newAbcs);
    }


    return (
        <div>
            <ToggleButtonGroup
                value={abcs}
                onChange={handleChange}
                aria-label="text formatting"
                size="small"
                color="primary"
            >
                <ToggleButton value={ANTECEDENT} aria-label="bold">
                    Antecendents
                </ToggleButton>
                <ToggleButton value={BEHAVIOR} aria-label="italic">
                    Behaviors
                </ToggleButton>
                <ToggleButton value={CONSEQUENCE} aria-label="underlined">
                    Consequences
                </ToggleButton>
            </ToggleButtonGroup>

            <ReactWordcloud words={words} />
        </div>
    );

}

export default ABCWordCloud;